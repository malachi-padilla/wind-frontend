import { SideBarProps } from "components/types";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import ProfileModal from "./ProfileModal"

export default function SideBar({ friend, setFriend }: SideBarProps) {
  const [chatOpen, setChatOpen] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>("");
  return (
    <>
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
              <input
                onKeyDown={(e) =>
                  e.key == "Enter" ? setFriend(friendInput) : null
                }
                onChange={(e: any) => setFriendInput(e.target.value)}
                type="text"
                placeholder="Enter Friend"
              ></input>
              <button className={styles.PlusBtn}>+</button>
            </div>

            {friendInput.length > 0 ? (
              <div
                className={styles.ChatBar}
                onClick={() => setFriend(friendInput)}
              >
                <p>
                  <span style={{ fontWeight: 900 }}>Chat with </span>
                  {friendInput}
                </p>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <h1 style={{ color: "#fff", marginBottom: "20px" }}>
              { !friend ? "No Friends Yet :(" : "Your Friends!"}
            </h1>
            {
              !friend
              ? null :
           (  <div className={styles.ChatBar}>
                <p>{friend}</p>
             </div>)
            }
          </>
        )}
      </div>
    </div>
    </>
  );
}
