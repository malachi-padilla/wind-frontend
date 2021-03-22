import { SideBarProps } from "components/types";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";

export default function SideBar({ friend, setFriend }: SideBarProps) {
  const [chatOpen, setChatOpen] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>("");


  const addFriend = () => {
    setFriend(friendInput);
    setFriendInput("")
  }
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
              <input
                onKeyDown={(e) =>
                  e.key == "Enter" ? addFriend() : null
                }
                onChange={(e: any) => setFriendInput(e.target.value)}
                value={friendInput}
                type="text"
                placeholder="Enter Friend"
              ></input>
              <button onClick={addFriend} className={styles.PlusBtn}>+</button>
            </div>

            { !friend 
            ? null 
            : (
            <div
              className={styles.ChatBar}
              >
                <p>
                  {friend}
                </p>
              </div>)}
          </>
        ) : (
          <>
            <h1 style={{ color: "#fff", marginBottom: "20px" }}>
           { !friend ? "No Friends Yet :(" :"Your Friends!"}
            </h1>
            {
              !friend
              ? null
              : (
              <div className={styles.ChatBar}>
                <p>{friend}</p>
              </div>
              )
            }
          
          </>
        )}
      </div>
    </div>
  );
}
