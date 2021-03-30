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
import axios, { AxiosResponse } from "axios";
import { SocketPrivateChatMessage } from "Components/Types/models";

const ENDPOINT = "http://localhost:4000";
let socket: any;
export default function ChatPage() {
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [recipientIsTyping, setRecipientIsTyping] = useState<boolean>(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<any>();
  const [pollingInterval, setPollingInterval] = useState<boolean>(false);
  const [recentlyMessaged, setRecentlyMessaged] = useState<string[]>([]);
  const friend = useSelector((state: ReduxStore) => state.friend);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name: user.username });
    return () => socket.emit("end");
  }, []);

  const pushIfNotExist = function (item: string) {
    setRecentlyMessaged((current) => {
      if (item !== user.username) {
        const index = current.indexOf(item);
        if (index !== -1) {
          current.splice(index, 1);
          return [item, ...current];
        } else {
          return [item, ...current];
        }
      } else {
        return current;
      }
    });
  };

  useEffect(() => {
    socket.on("message", (message: SocketPrivateChatMessage) => {
      pushIfNotExist(message.sentBy);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/messages/recentlyMessaged?user=${user.username}`
      )
      .then((res: AxiosResponse<string[]>) => {
        setRecentlyMessaged(res.data);
      });
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
          recentlyMessaged={recentlyMessaged}
          setRecentlyMessaged={setRecentlyMessaged}
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
            recentlyMessaged={recentlyMessaged}
            setRecentlyMessaged={setRecentlyMessaged}
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
