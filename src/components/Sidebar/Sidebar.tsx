import { SideBarProps } from "components/types";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import ProfileModal from "./ProfileModal"

export default function SideBar({ friend, setFriend, user }: SideBarProps) {
  const [chatOpen, setChatOpen] = useState<boolean>(true);
  const [ userInput, setUserInput] = useState<string>("");
  const [profileModal, setProfileModal] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState(false);
  const addFriend = () => {
    setFriend(userInput);
    setUserInput("");
  }
  return (
    <>
    { profileModal
      ? <ProfileModal/>
      : null
    }
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
              <input  value={userInput} onChange={e => setUserInput(e.target.value)}type="text" placeholder="Enter Friend"></input>
              <button onClick={addFriend}className={styles.PlusBtn}>+</button>
            </div>

            {
              !friend
              ? null
              :
               ( <div className={styles.ChatBar}>
                <p>
                 {friend}
                </p>
                </div>)
            }
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
      <div className={styles.ProfileBar}>
        <div>
            <p style={{fontWeight: 'bold'}}>{user.username}</p>
            <p style={{color: '#72767d'}}>#{user.userId}</p>
        </div>
        <button onClick={() => setProfileModal(true)}><i className="fas fa-cog"></i></button>
      </div>
    </div>
    </>
  );
}
