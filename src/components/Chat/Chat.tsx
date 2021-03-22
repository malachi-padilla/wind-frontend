import { PrivateChatMessage, UserContext } from "components/types";
import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./Chat.module.css";
import { MyContext } from "../../Context";
import axios from "axios";
import { animateScroll } from "react-scroll";
const ENDPOINT = "http://localhost:4000";
let socket;

export default function ChatPage({ friend }) {
  const [currentMessage, setCurrentMessage] = useState<string>();
  const user = useContext(MyContext) as UserContext;
  
  const [messages, setMessages] = useState<PrivateChatMessage[]>([]);
  const name = user.username;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, friend });
  }, []);

  useEffect(() => {
    socket.on("message", (message: PrivateChatMessage) => {
      console.log(message);
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
  }, [friend]);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "ContainerElementID",
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { friend, message: currentMessage });
    setCurrentMessage("");
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Title}>
        <p>
          {friend === ""
            ? `You're chatting with nobody :(`
            : `you're chatting with ${friend}`}
        </p>
      </div>

      <div className={styles.ChatBody} id="ContainerElementID">
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
          onChange={(e: any) => setCurrentMessage(e.target.value)}
        ></input>
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}
