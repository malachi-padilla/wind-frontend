import React, { useContext, useEffect, useState } from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "components/Sidebar/Sidebar";
import styles from "./ChatPage.module.css";
import { MyContext } from "Context";
import ActiveFriends from "components/Chat/ActiveFriends";
import Friends from "components/Chat/Friends";
import NoFriendsPage from "components/Chat/NoFriendsPage";
import axios from "axios";
import { PersonalUserInfo, UserContext } from "components/types";

export default function ChatPage() {
  const [friend, setFriend] = useState<string>("");
  // Get The Context
  const context = useContext(MyContext);
  const user = context[0] as PersonalUserInfo;
  // Get The User from Context and Assert Not Null | Undefined
  const [recipientIsTyping, setRecipientIsTyping] = useState<boolean>(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<any>();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/friends?user=${user.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFriendsList(res.data);
        console.log(res.data);
      });
  }, [friend]);

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
            friendsList={friendsList}
            setFriendsList={setFriendsList}
          />
        )
      ) : (
        <Friends
          friendsList={friendsList}
          setFriend={setFriend}
          setFriendsIsOpen={setFriendsIsOpen}
          recipientIsTyping={recipientIsTyping}
        />
      )}

      <ActiveFriends recipientIsTyping={recipientIsTyping} />
    </div>
  );
}
