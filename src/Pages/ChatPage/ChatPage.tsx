import React, { useContext, useEffect, useState } from "react";
import Chat from "../../Components/Chat/Chat";
import SideBar from "../../Components/Sidebar/Sidebar";
import { MyContext } from "Context";
import ActiveFriends from "../../Components/Chat/ActiveFriends/ActiveFriends";
import Friends from "../../Components/Chat/Friends/Friends";
import WelcomePage from "../../Components/Chat/WelcomePage/WelcomePage";
import { UserContextNotNull } from "Components/types";
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

const ENDPOINT = "http://localhost:4000";
let socket;
export default function ChatPage() {
  const [friend, setFriend] = useState<string>("");
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [recipientIsTyping, setRecipientIsTyping] = useState<boolean>(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<any>();
  const [pollingInterval, setPollingInterval] = useState<boolean>(false);

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
      setFetchNew((current) => !current);
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
          friend={friend}
          setFriend={setFriend}
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
            friend={friend}
            pollingInterval={pollingInterval}
            socket={socket}
          />
        )
      ) : friendsList?.length > 0 ? (
        <Friends
          userInfo={user}
          friendsList={friendsList}
          setFriend={setFriend}
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
