import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./Chat.module.css";
import SideBar from "./SideBar";

const ENDPOINT = "http://localhost:5000";

let socket;
function ChatPage({ name, friend, setFriend }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
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
      <SideBar friend={friend} setFriend={setFriend} />
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
        onSubmit={(e) => sendMessage(e.target.value)}
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

export default ChatPage;
