import { PrivateChatMessage } from "components/types";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./Chat.module.css";
import axios from "axios";
import { animateScroll } from "react-scroll";
import NoFriendsPage from "./NoFriendsPage";

const ENDPOINT = "http://localhost:4000";
let socket;
export default function ChatPage({
  friend,
  userInfo,
  setRecipientIsTyping,
  recipientIsTyping,
}) {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<PrivateChatMessage[]>([]);

  const name = userInfo.username;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, friend });
    socket.on("message", (message: PrivateChatMessage) => {
      setMessages((currentMessages) => [...currentMessages, message]);
    });
    return () => socket.emit("end");
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/messages/getMessages?user1=${name}&user2=${friend}`
      )
      .then((res) => {
        if (res.data) {
          setMessages(res.data);
        }
      });

    socket.on("typing", ({ personTyping, isTyping }) => {
      if (personTyping === friend) {
        setRecipientIsTyping(isTyping);
      }
    });
  }, [friend]);

  useEffect(() => {
    if (currentMessage!.length > 0) {
      socket.emit("typing", { friend, isTyping: true });
    } else {
      socket.emit("typing", { friend, isTyping: false });
    }
  }, [currentMessage]);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "ContainerElementID",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, recipientIsTyping, currentMessage]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { friend, message: currentMessage });
    setCurrentMessage("");
  };

  if (!friend) {
    return <NoFriendsPage />;
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Title}>
        <div className={styles.TitleContent}>
          <p>you're chatting with {friend}</p>
        </div>
      </div>

      <div className={styles.ChatBody}>
        <div className={styles.ChatMessages} id="ContainerElementID">
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
          {recipientIsTyping ? (
            <div className={`${styles.IsTyping} && ${styles.SecondaryMessage}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.InputWrapper}>
        <form
          onSubmit={(e: any) => sendMessage(e.target.value)}
          className={styles.InputContent}
        >
          <input
            value={currentMessage}
            placeholder={`message @${friend}`}
            onChange={(e: any) => setCurrentMessage(e.target.value)}
          ></input>
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
