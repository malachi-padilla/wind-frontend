import React, { useContext, useState } from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "components/Sidebar/Sidebar";
import styles from './ChatPage.module.css';
import { MyContext } from "Context";
import { UserContext } from "components/types";

export default function ChatPage() {
  const [friend, setFriend] = useState<string>("");
  const user = useContext(MyContext) as UserContext;

  return (
    <div className={styles.ChatPageWrapper}>
      <SideBar userInfo={user} friend={friend} setFriend={setFriend} />
      <Chat userInfo={user} friend={friend} />
    </div>
  );
}