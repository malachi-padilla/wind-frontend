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
import {
  ChatPageWrapper,
  Home,
  NavBar,
  SideBarWrapper,
  StyledLogo,
} from "./ChatPage-css";
import { UserContextNotNull } from "Types/types";
import { useSelector } from "react-redux";
import { ReduxStore } from "Redux/types";

const ENDPOINT = "http://localhost:4000";
let socket: any;
export default function ChatPage() {
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [recipientIsTyping, setRecipientIsTyping] = useState<boolean>(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<any>();
  const [pollingInterval, setPollingInterval] = useState<boolean>(false);
  const friend = useSelector((state: ReduxStore) => state.friend);

  useEffect(() => {
    socket = io(ENDPOINT);

    return () => socket.emit("end");
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
    }, 10000);
    return () => clearInterval(myInterval);
  }, []);

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
          recipientIsTyping={recipientIsTyping}
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
            recipientIsTyping={recipientIsTyping}
            setRecipientIsTyping={setRecipientIsTyping}
            userInfo={user}
            pollingInterval={pollingInterval}
            socket={socket}
          />
        )
      ) : friendsList?.length > 0 ? (
        <Friends
          userInfo={user}
          friendsList={friendsList}
          setFriendsIsOpen={setFriendsIsOpen}
          recipientIsTyping={recipientIsTyping}
        />
      ) : (
        <LoadingPage />
      )}

      <ActiveFriends friendsList={friendsList} />
    </ChatPageWrapper>
  );
}
