import React, { useState } from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "components/Sidebar/Sidebar";

export default function ChatPage() {
  const [friend, setFriend] = useState<string>("");
  return (
    <div>
      <SideBar friend={friend} setFriend={setFriend} />
      <Chat friend={friend} />
    </div>
  );
}
