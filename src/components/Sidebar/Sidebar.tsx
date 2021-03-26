import axios from "axios";
import { SideBarProps } from "components/types";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";

export default function SideBar({
  friend,
  setFriend,
  userInfo,
  recipientIsTyping,
  setFriendsIsOpen,
  friendsIsOpen,
  friendsList,
}: SideBarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>("");
  const [recentlyMessaged, setRecentlyMessaged] = useState<string[]>([]);
  const [notFoundError, setNotFoundError] = useState<boolean>(false);

  const logout = () => {
    axios
      .get("http://localhost:4000/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        window.location.href = "/";
      });
  };

  const findUserByUsername = async (username: string) => {
    return axios
      .get(`http://localhost:4000/user?username=${username}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch(() => "Not Found");
  };

  const addFriend = async () => {
    // Perform Check To See If User Exists First!
    if (friendInput.length > 0 && friendInput !== userInfo.username) {
      const userResult = await findUserByUsername(friendInput);
      if (
        userResult !== "Not Found" &&
        recentlyMessaged.indexOf(friendInput) === -1
      ) {
        setNotFoundError(false);
        setFriend(friendInput);
        setFriendsIsOpen(false);
        setRecentlyMessaged((current) => [...current, friendInput]);
        setFriendInput("");
      } else {
        setNotFoundError(true);
      }
    }
  };
  return (
    <div className={styles.MainContainer}>
      <div className={styles.SideBarContents}>
        <div className={styles.EnterFriendWrapper}>
          <input
            style={{
              border: notFoundError ? "1px solid #b92d2d" : undefined,
            }}
            onKeyDown={(e) => (e.key == "Enter" ? addFriend() : null)}
            onChange={(e: any) => setFriendInput(e.target.value)}
            value={friendInput}
            type="text"
            placeholder="Find or start a conversation"
          ></input>
        </div>
        <div className={styles.RecentFriendsWrapper}>
          <div
            onClick={() => setFriendsIsOpen(true)}
            className={styles.FriendsTab}
            style={{ backgroundColor: friendsIsOpen ? "#36393f" : undefined }}
          >
            <div>
              <i className="fas fa-user-friends"></i>
            </div>
            <p>Friends</p>
          </div>
          <div className={styles.DirectMessageTab}>
            <p>DIRECT MESSAGES</p>
            <button>+</button>
          </div>
          {!friend ? null : (
            <div className={styles.RecentlyMessagedList}>
              {recentlyMessaged.map((item, index) => (
                <div
                  style={{
                    backgroundColor: friend === item ? "#36393f" : "#2f3136",
                  }}
                  className={styles.FriendBar}
                  key={index}
                  onClick={() => {
                    setFriend(item);
                    setFriendsIsOpen(false);
                  }}
                >
                  {recipientIsTyping ? (
                    <div className={styles.IsTyping}>
                      <span></span>
                    </div>
                  ) : null}
                  <p>{item}</p>
                  <button
                    className={styles.RemoveFriendButton}
                    onClick={() =>
                      setRecentlyMessaged((current) =>
                        current.filter((node) => item !== node)
                      )
                    }
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.ProfileBar}>
        <p className={styles.Username}>{userInfo.username}</p>
        <div className={styles.ProfileBtns}>
          <button>
            <i className="fas fa-cog"></i>
          </button>
          <button className={styles.LogoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
