import axios from "axios";
import { SideBarProps } from "components/types";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";

export default function SideBar({ friend, setFriend, userInfo }: SideBarProps) {
  const [chatOpen, setChatOpen] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>("");
  const [recentlyMessaged, setRecentlyMessaged] = useState<string[]>([]);

  const logout = () => {
    axios
      .get("http://localhost:4000/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        window.location.href = "/";
      });
  };

  const addFriend = () => {
    // Perform Check To See If User Exists First!
    if (friendInput.length > 0) {
      setFriend(friendInput);
      setRecentlyMessaged(current => [...current, friendInput])
      setFriendInput("");
    }
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
            <div className={styles.RecentFriendsWrapper}> {
              recentlyMessaged.length > 0 ? (
                <h3 style={{ color: "#72767d", marginBottom: "20px" }}>DIRECT MESSAGES</h3>
              ) : null
            }
              {!friend ? null :
                <div className={styles.RecentlyMessagedList}>
                  {recentlyMessaged.map(item => (
                    <div style={{ backgroundColor: friend === item ? "#7288da" : "#3c3f47" }} className={styles.FriendBar} key={item} onClick={() => setFriend(item)}>
                      { item}
                      <button
                        className={styles.RemoveFriendButton}
                        onClick={() => setRecentlyMessaged(current => current.filter(node => item !== node))}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div >
              }
            </div>
          </>
        ) : (
          <>
            <div className={styles.EnterFriendWrapper}>
              <h1 style={{ color: "#fff", marginBottom: "20px" }}>
                {!friend ? "No Friends Yet :(" : "Your Friends!"}
              </h1>
            </div>
            <div className={styles.RecentlyMessagedList}>
              {!friend ? null : <div className={styles.FriendBar}>{friend}</div>}
            </div>
          </>
        )
        }
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
    </div >
  );
}
