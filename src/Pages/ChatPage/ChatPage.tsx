import React, { useContext, useEffect, useState } from "react";
import Chat from "../../Components/Chat/Chat";
import SideBar from "../../Components/Sidebar/Sidebar";
import { MyContext } from "Context";
import ActiveFriends from "../../Components/Chat/ActiveFriends/ActiveFriends";
import Friends from "../../Components/Chat/Friends/Friends";
import WelcomePage from "../../Components/Chat/WelcomePage/WelcomePage";
import io from "socket.io-client";
import LoadingPage from "../../Components/Chat/LoadingPage/LoadingPage";
import { getFriendsRequest } from "Api/friends";
import { getRecentlyMessagedRequest } from "Api/messages";
import {
  ChatPageWrapper,
  Home,
  NavBar,
  SideBarWrapper,
  StyledLogo,
} from "./ChatPage-css";
import { UserContextNotNull } from "Types/types";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "Redux/types";
import { AxiosResponse } from "axios";
import { SocketPrivateChatMessage } from "Components/Types/models";
import { getUserByUsernameRequest } from "Api/user";
import { RecipientUserInfo } from "Types/models";
import { setRecentlyMessagedAction } from "Redux/actions";

const ENDPOINT = "http://localhost:4000";
let socket: any;
export default function ChatPage() {
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<any>();
  const [pollingInterval, setPollingInterval] = useState<boolean>(false);
  const [recipientData, setRecipientData] = useState<RecipientUserInfo>();
  const [loadingRecipientData, setLoadingRecipientData] = useState<boolean>(
    true
  );
  const friend = useSelector((state: ReduxStore) => state.friend);
  const recentlyMessaged = useSelector(
    (state: ReduxStore) => state.recentlyMessaged
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name: user.username });
    return () => socket.emit("end");
  }, []);

  useEffect(() => {
    socket.on("message", (message: SocketPrivateChatMessage) => {
      pushIfNotExist(message.sentBy);
    });
  }, [recentlyMessaged]);

  useEffect(() => {
    getRecentlyMessagedRequest(user.username).then(
      (res: AxiosResponse<string[]>) => {
        dispatch(setRecentlyMessagedAction(res.data));
      }
    );
  }, []);

  useEffect(() => {
    getFriendsRequest(user.userId).then((res) => {
      setFriendsList(res.data);
    });
  }, [pollingInterval]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setPollingInterval((current) => !current);
      setFetchNew((current: any) => !current);
    }, 5000);
    return () => clearInterval(myInterval);
  }, []);

  const fetchUser = () => {
    return getUserByUsernameRequest(friend).then((res) => {
      setRecipientData(res.data);
      setLoadingRecipientData(false);
    });
  };

  // This function pushes to our RecentlyMessaged list, if it doesn't exist and keeps order.
  function pushIfNotExist(item: string) {
    if (item !== user.username) {
      let newRecentlyMessaged = recentlyMessaged;
      const index = newRecentlyMessaged.indexOf(item);
      if (index !== -1) {
        newRecentlyMessaged.splice(index, 1);
      }
      newRecentlyMessaged = [item, ...newRecentlyMessaged];
      dispatch(setRecentlyMessagedAction(newRecentlyMessaged));
    }
  }

  if (friendsList === undefined) {
    return <LoadingPage propStyles={{ width: "100vw" }} />;
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
            pushIfNotExist={pushIfNotExist}
            recipientData={recipientData}
            loadingRecipientData={loadingRecipientData}
            setLoadingRecipientData={setLoadingRecipientData}
          />
        )
      ) : friendsList?.length > 0 ? (
        <Friends
          userInfo={user}
          friendsList={friendsList}
          setFriendsIsOpen={setFriendsIsOpen}
          pollingInterval={pollingInterval}
          fetchUser={fetchUser}
          recipientData={recipientData}
          loadingRecipientData={loadingRecipientData}
        />
      ) : (
        <LoadingPage />
      )}

      <ActiveFriends friendsList={friendsList} />
    </ChatPageWrapper>
  );
}
