import React, { useContext, useEffect, useState } from 'react';
import Chat from 'Components/Chat/Chat/Chat';
import SideBar from 'Components/Sidebar/Sidebar';
import { MyContext } from 'Context';
import ActiveFriends from 'Components/Chat/ActiveFriends/ActiveFriends';
import Friends from 'Components/Chat/Friends/Friends';
import WelcomePage from 'Components/Chat/WelcomePage/WelcomePage';
import * as io from 'socket.io-client';
import LoadingPage from 'Components/Chat/LoadingPage/LoadingPage';
import {
  getFriendsRequest,
  getProfilePictureByUsernameRequest,
} from 'Api/friends';
import { getRecentlyMessagedRequest } from 'Api/messages';
import {
  ChatPageWrapper,
  Home,
  NavBar,
  SideBarWrapper,
  StyledLogo,
} from './ChatPage-css';
import { UserContextNotNull } from 'Types/types';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'Redux/types';
import { SocketPrivateChatMessage } from 'Components/Types/models';
import { getUserByUsernameRequest } from 'Api/user';
import { RecipientUserInfo } from 'Types/models';
import { setRecentlyMessagedAction } from 'Redux/actions';
import Profile from 'Components/Chat/Profile/Profile';
import { API_URL } from 'Config/globalVariables';

let socket;
export default function ChatPage() {
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<any>();
  const [pollingInterval, setPollingInterval] = useState<boolean>(false);
  const [recipientData, setRecipientData] = useState<RecipientUserInfo>();
  const [loadingRecipientData, setLoadingRecipientData] = useState<boolean>(
    true
  );
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const friend = useSelector((state: ReduxStore) => state.friend);
  const recentlyMessaged = useSelector(
    (state: ReduxStore) => state.recentlyMessaged
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io.connect(API_URL);
    socket.emit('join', { name: user.username });
    return () => socket.emit('end');
  }, []);

  useEffect(() => {
    socket.on('message', (message: SocketPrivateChatMessage) => {
      pushIfNotExist(message.sentBy);
    });
  }, [recentlyMessaged]);

  useEffect(() => {
    getRecentlyMessagedRequest(user.username).then((res: any) => {
      dispatch(setRecentlyMessagedAction(res.data));
    });
  }, []);

  useEffect(() => {
    getFriendsRequest(user.userId).then((res: any) => {
      setFriendsList(res.data);
    });
  }, [pollingInterval]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setPollingInterval((current) => !current);
      setFetchNew((current: any) => !current);
    }, 20000);
    return () => clearInterval(myInterval);
  }, []);
  const fetchUser = () => {
    return getUserByUsernameRequest(friend).then((res: any) => {
      setRecipientData(res.data);
      setLoadingRecipientData(false);
    });
  };

  // This function pushes to our RecentlyMessaged list, if it doesn't exist and keeps order.
  async function pushIfNotExist(username: string) {
    if (username !== user.username) {
      let index = -1;
      let newRecentlyMessaged = recentlyMessaged;

      for (let i = 0; i < newRecentlyMessaged.length; i++) {
        if (newRecentlyMessaged[i].username === username) {
          index = i;
        }
      }
      let profilePicture;
      if (index !== -1) {
        profilePicture = newRecentlyMessaged[index].profilePicture;
        newRecentlyMessaged.splice(index, 1);
      } else {
        const data = await getProfilePictureByUsernameRequest(username);
        profilePicture = data.data;
      }

      newRecentlyMessaged = [
        { username, profilePicture: profilePicture.data },
        ...newRecentlyMessaged,
      ];
      dispatch(setRecentlyMessagedAction(newRecentlyMessaged));
    }
  }

  if (friendsList === undefined) {
    return <LoadingPage propStyles={{ width: '100vw' }} />;
  }
  if (profileOpen) {
    return <Profile setProfileOpen={setProfileOpen} />;
  }

  return (
    <ChatPageWrapper>
      <SideBarWrapper>
        <NavBar>
          <Home>
            <StyledLogo />
          </Home>
        </NavBar>
        <SideBar
          userInfo={user}
          friendsIsOpen={friendsIsOpen}
          setFriendsIsOpen={setFriendsIsOpen}
          socket={socket}
          friendsList={friendsList}
          setProfileOpen={setProfileOpen}
        />
      </SideBarWrapper>
      {!friendsIsOpen ? (
        !friend ? (
          <WelcomePage />
        ) : (
          <Chat
            userInfo={user}
            pollingInterval={pollingInterval}
            socket={socket}
            fetchUser={fetchUser}
            loadingMessages={loadingMessages}
            setLoadingMessages={setLoadingMessages}
            pushIfNotExist={pushIfNotExist}
            LoadingPage={LoadingPage}
            recipientData={recipientData}
            loadingRecipientData={loadingRecipientData}
            setLoadingRecipientData={setLoadingRecipientData}
          />
        )
      ) : friendsList ? (
        <Friends
          userInfo={user}
          friendsList={friendsList}
          setFriendsIsOpen={setFriendsIsOpen}
        />
      ) : (
        <LoadingPage />
      )}

      <ActiveFriends friendsList={friendsList} />
    </ChatPageWrapper>
  );
}
