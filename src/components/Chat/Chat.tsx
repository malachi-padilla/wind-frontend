import SideBar from "components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./Chat.module.css";

const ENDPOINT = "http://localhost:5000";

let socket;
export default function ChatPage({ name, friend, setFriend }: any) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", { name, friend });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((currentMessages) => [...currentMessages, message]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { friend, message: currentMessage });
    setCurrentMessage("");
  };

  return (
    <div className={styles.MainContainer}>
      <SideBar friend={friend} />
      <div className={styles.Title}>
        <p>{`you're chatting with ${friend}`}</p>
      </div>
      <div className={styles.ChatBody}>
        {messages.map((item) => (
          <>
            <div
              className={
                item.sentBy === name
                  ? styles.MainMessage
                  : styles.SecondaryMessage
              }
            >
              {item.message}
            </div>
          </>
        ))}
      </div>
      <form
        onSubmit={(e: any) => sendMessage(e.target.value)}
        className={styles.MessagingContainer}
      >
        <input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        ></input>
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}
