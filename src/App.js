import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";

export default function App() {
  const [name, setName] = useState("");
  const [friend, setFriend] = useState("");
  const [inChatRoom, setInChatRoom] = useState(false);
  return inChatRoom ? (
    <Chat name={name} friend={friend} setFriend={setFriend} />
  ) : (
    <Login
      setInChatRoom={setInChatRoom}
      setName={setName}
      setFriend={setFriend}
    />
  );
}
