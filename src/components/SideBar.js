import React, { useState } from "react";
import styles from "./SideBar.module.css";

export default function SideBar({ friend }) {
  const [chatOpen, setChatOpen] = useState(true);
  const [friendsOpen, setFriendsOpen] = useState(false);
  return (
    <div className={styles.MainContainer}>
      <div className={styles.NavBtns}>
        <button onClick={() => setChatOpen(true)}>
          Chat <i className="fas fa-headset"></i>
        </button>
        <button
          onClick={() => {
            setFriendsOpen(true);
            setChatOpen(false);
          }}
        >
          Friends <i className="fas fa-user-friends"></i>
        </button>
      </div>

      <div className={styles.SideBarContents}>
        {chatOpen ? (
          <>
            <h1 style={{ color: "#fff", marginBottom: "20px" }}>
              Start a New Chat!
            </h1>
            <div className={styles.EnterFriendWrapper}>
              <input type="text" placeholder="Enter Friend"></input>
              <button className={styles.PlusBtn}>+</button>
            </div>

            <div className={styles.ChatBar}>
              <p>
                <span style={{ fontWeight: "900" }}>Chat with </span>
                {friend}
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ color: "#fff", marginBottom: "20px" }}>
              Your Friends!
            </h1>
            <div className={styles.ChatBar}>
              <p>{friend}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
