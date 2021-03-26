import React from "react";
import inheritedStyles from "./Chat.module.css";
import styles from "./Friends.module.css";

export default function Friends({
  friendsList,
  setFriend,
  setFriendsIsOpen,
  recipientIsTyping,
}) {
  return (
    <div className={inheritedStyles.MainContainer}>
      <div className={styles.ActionBar}>
        <div className={styles.FriendsTab}>
          <i className="fas fa-user-friends"></i>
          <p style={{ color: "#fff", fontWeight: 700 }}>Friends</p>
        </div>
        <div className={styles.ActionBarBtns}>
          <button className={styles.FriendsBtn}>Online</button>
          <button className={styles.FriendsBtn}>All</button>
          <button className={styles.FriendsBtn}>Pending</button>
          <button className={styles.AddBtn}>Add Friend</button>
        </div>
      </div>
      {friendsList.length < 1 ? (
        <h1>No Friends Yet :( </h1>
      ) : (
        <div className={styles.FriendsList}>
          {friendsList &&
            friendsList.map((item, index) => (
              <div className={styles.FriendBar} key={index}>
                <div className={styles.UserInfo}>
                  {recipientIsTyping ? (
                    <div className={styles.IsTyping}>
                      <span></span>
                    </div>
                  ) : null}
                  <h3>{item.username}</h3>
                  <p style={{ color: "#888e9b" }}>
                    {recipientIsTyping ? "Online" : null}
                  </p>
                </div>
                <div className={styles.Actions}>
                  <button
                    onClick={() => {
                      setFriend(item.username);
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
      )}
    </div>
  );
}
