import React, { useContext, useState } from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "components/Sidebar/Sidebar";
import styles from "./ChatPage.module.css";
import { MyContext } from "Context";
import { UserContext } from "components/types";

export default function ChatPage() {
  const [friend, setFriend] = useState<string>("");
  const user = useContext(MyContext) as UserContext;
  const [recipientIsTyping, setRecipientIsTyping] = useState<boolean>(false);

  return (
    <div className={styles.ChatPageWrapper}>
      <SideBar
        recipientIsTyping={recipientIsTyping}
        userInfo={user}
        friend={friend}
        setFriend={setFriend}
      />
      <Chat
        recipientIsTyping={recipientIsTyping}
        setRecipientIsTyping={setRecipientIsTyping}
        userInfo={user}
        friend={friend}
      />
    </div>
  );
}
