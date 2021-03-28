import React, { useEffect, useState } from "react";
import { getMinutesLastOnline } from "util/utilFunctions";
import styles from "./ActiveFriends.module.css";

export default function ActiveFriends({ friendsList }) {
  const [activeUsers, setActiveUsers] = useState<any>([]);
  useEffect(() => {
    setActiveUsers(
      friendsList.filter((item) => {
        return getMinutesLastOnline(item.lastOnline) > 10;
      })
    );
  }, [friendsList]);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Title}>
        <h4>ACTIVE NOW</h4>
      </div>
      <div className={styles.ActiveUsersContainer}>
        {activeUsers.length < 1 ? (
          <div className={styles.LonelyWrapper}>
            <h4 style={{ color: "#fff", marginBottom: "10px" }}>
              It's quiet for now...
            </h4>
            <p style={{ color: "#9e9ea1" }}>
              When a friend starts an activity, like chatting with someone,
              we'll show it here!
            </p>
          </div>
        ) : (
          <div className={styles.ActiverUsersList}>
            {activeUsers.map((item, index) => (
              <div className={styles.ActiveUser} key={index}>
                <h1>{item.username}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
