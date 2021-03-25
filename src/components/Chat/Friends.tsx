import React from "react";
import inheritedStyles from "./Chat.module.css";
import styles from "./Friends.module.css";

export default function Friends({
  friendsList,
  setFriendsList,
  setFriend,
  setFriendsIsOpen,
}) {
  return (
    <div className={inheritedStyles.MainContainer}>
      <div className={styles.FriendsList}>
        {friendsList.map((item, index) => (
          <div className={styles.FriendBar} key={index}>
            <div className={styles.UserInfo}>
              <h3>{item}</h3>
            </div>
            <div className={styles.Actions}>
              <button
                onClick={() => {
                  setFriend(item);
                  setFriendsIsOpen(false);
                }}
                className={styles.ChatBtn}
              >
                <i className="fas fa-comment-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
