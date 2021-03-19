import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";

export default function App() {
  const [name, setName] = useState<string>("");
  const [friend, setFriend] = useState<string>("");
  const [inChatRoom, setInChatRoom] = useState<boolean>(false);
  return inChatRoom ? (
    <Chat name={name} friend={friend} />
  ) : (
    <Login
      setInChatRoom={setInChatRoom}
      setName={setName}
      setFriend={setFriend}
    />
  );
}
