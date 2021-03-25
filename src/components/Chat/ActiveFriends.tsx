import React from "react";
import styles from "./ActiveFriends.module.css";

export default function ActiveFriends({ recipientIsTyping }) {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.Title}>
        <h4>ACTIVE NOW</h4>
      </div>
      <div className={styles.ActiveUsersContainer}>
        {!recipientIsTyping ? (
          <div className={styles.LonelyWrapper}>
            <h4 style={{ color: "#fff", marginBottom: "10px" }}>
              It's quiet for now...
            </h4>
            <p style={{ color: "#9e9ea1" }}>
              When a friend starts an activity, like chatting with someone,
              we'll show it here !
            </p>
          </div>
        ) : (
          //Display Active Users
          <h1></h1>
        )}
      </div>
    </div>
  );
}
