import axios from "axios";
import { SideBarProps } from "components/types";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";

export default function SideBar({ friend, setFriend, userInfo }: SideBarProps) {
  const [chatOpen, setChatOpen] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>("");

  const addFriend = () => {
    setFriend(friendInput);
    setFriendInput("");
  };
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
            <div className={styles.EnterFriendWrapper}>
              <input
                onKeyDown={(e) => (e.key == "Enter" ? addFriend() : null)}
                onChange={(e: any) => setFriendInput(e.target.value)}
                value={friendInput}
                type="text"
                placeholder="Type the username of a friend"
              ></input>
              <button onClick={addFriend} className={styles.PlusBtn}>
                +
              </button>
            </div>

            {!friend ? null : (
              <div className={styles.ChatBar}>
                <p>{friend}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 style={{ color: "#fff", marginBottom: "20px" }}>
              {!friend ? "No Friends Yet :(" : "Your Friends!"}
            </h1>
            {!friend ? null : (
              <div className={styles.ChatBar}>
                <p>{friend}</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.ProfileBar}>
        <div>
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              fontSize: "12px",
            }}
          >
            {userInfo.username}
          </p>
          <p style={{ color: "#36393f", fontSize: "12px" }}>
            #{userInfo.userId}
          </p>
        </div>
        <button>
          <i className="fas fa-cog"></i>
        </button>
        <button className={styles.LogoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
