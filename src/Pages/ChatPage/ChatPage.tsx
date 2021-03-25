import React, { useContext, useState } from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "components/Sidebar/Sidebar";
import styles from "./ChatPage.module.css";
import { MyContext } from "Context";
import { UserContext } from "components/types";
import ActiveFriends from "components/Chat/ActiveFriends";
import Friends from "components/Chat/Friends";

export default function ChatPage() {
  const [friend, setFriend] = useState<string>("");
  const user = useContext(MyContext) as UserContext;
  const [recipientIsTyping, setRecipientIsTyping] = useState<boolean>(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState<boolean>(false);
  const [friendsList, setFriendsList] = useState<string[]>([]);

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
          setFriendsList={setFriendsList}
        />
      </div>
      {!friendsIsOpen ? (
        <Chat
          recipientIsTyping={recipientIsTyping}
          setRecipientIsTyping={setRecipientIsTyping}
          userInfo={user}
          friend={friend}
        />
      ) : (
        <Friends
          friendsList={friendsList}
          setFriendsList={setFriendsList}
          setFriend={setFriend}
          setFriendsIsOpen={setFriendsIsOpen}
        />
      )}

      <ActiveFriends recipientIsTyping={recipientIsTyping} />
    </div>
  );
}
