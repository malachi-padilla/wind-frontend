import React, { useContext, useEffect, useState } from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "components/Sidebar/Sidebar";
import styles from "./ChatPage.module.css";
import { MyContext } from "Context";
import ActiveFriends from "components/Chat/ActiveFriends";
import Friends from "components/Chat/Friends";
import NoFriendsPage from "components/Chat/NoFriendsPage";
import axios from "axios";
import { UserContextNotNull } from "components/types";
import LoadingPage from "components/Chat/LoadingPage/LoadingPage";

export default function ChatPage() {
  const [friend, setFriend] = useState<string>("");
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [recipientIsTyping, setRecipientIsTyping] = useState<boolean>(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<any>();
  const [pollingInterval, setPollingInterval] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/friends?user=${user.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
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
    <div className={styles.ChatPageWrapper}>
      <div className={styles.SideBarWrapper}>
        <div className={styles.NavBar}>
          <div className={styles.Home}>
            <div className={styles.Logo}></div>
          </div>
        </div>
        <SideBar
          recipientIsTyping={recipientIsTyping}
          userInfo={user}
          friend={friend}
          setFriend={setFriend}
          friendsIsOpen={friendsIsOpen}
          setFriendsIsOpen={setFriendsIsOpen}
          friendsList={friendsList}
        />
      </div>
      {!friendsIsOpen ? (
        !friend ? (
          <NoFriendsPage />
        ) : (
          <Chat
            recipientIsTyping={recipientIsTyping}
            setRecipientIsTyping={setRecipientIsTyping}
            userInfo={user}
            friend={friend}
            pollingInterval={pollingInterval}
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
    </div>
  );
}
