import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMinutesLastOnline } from "util/utilFunctions";
import inheritedStyles from "./Chat.module.css";
import styles from "./Friends.module.css";

export default function Friends({
  friendsList,
  setFriend,
  setFriendsIsOpen,
  recipientIsTyping,
  userInfo,
}) {
  const [onlineFilter, setOnlineFilter] = useState<boolean>();
  const [requestsFilter, setRequestsFilter] = useState<boolean>();
  const [requestedFilter, setRequestedFilter] = useState<boolean>();
  const [mappingList, setMappingList] = useState<any>();

  useEffect(() => {
    if (!requestedFilter && !requestsFilter && !onlineFilter) {
      setMappingList(friendsList);
    }
    if (onlineFilter) {
      setMappingList(
        friendsList.filter((item) => getMinutesLastOnline(item.lastOnline) < 2)
      );
    } else if (requestsFilter) {
      axios
        .post(
          `http://localhost:4000/user/getUsers`,
          {
            users: userInfo.recievedFriendRequests,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setMappingList(res.data);
        });
    } else if (requestedFilter) {
      axios
        .post(
          `http://localhost:4000/user/getUsers`,
          {
            users: userInfo.sentFriendRequests,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setMappingList(res.data);
        });
    }
  }, [friendsList, onlineFilter, requestsFilter, requestedFilter, userInfo]);

  const setFilter = (filter: string) => {
    if (filter === "Online") {
      setRequestedFilter(false);
      setRequestsFilter(false);
      if (onlineFilter) {
        setOnlineFilter(false);
      } else {
        setOnlineFilter(true);
      }
    } else if (filter === "Requested") {
      setOnlineFilter(false);
      setRequestsFilter(false);
      if (requestedFilter) {
        setRequestedFilter(false);
      } else {
        setRequestedFilter(true);
      }
    } else if (filter === "Requests") {
      setOnlineFilter(false);
      setRequestedFilter(false);
      if (requestsFilter) {
        setRequestsFilter(false);
      } else {
        setRequestsFilter(true);
      }
    }
  };

  return (
    <div className={inheritedStyles.MainContainer}>
      <div className={styles.ActionBar}>
        <div className={styles.FriendsTab}>
          <i className="fas fa-user-friends"></i>
          <p style={{ color: "#fff", fontWeight: 700 }}>Friends</p>
        </div>
        <div className={styles.ActionBarBtns}>
          <button
            style={{ backgroundColor: !onlineFilter ? "#40444b" : "#5676af" }}
            className={styles.FriendsBtn}
            onClick={() => setFilter("Online")}
          >
            Online
          </button>
          <button
            style={{
              backgroundColor: !requestedFilter ? "#40444b" : "#5676af",
            }}
            className={styles.FriendsBtn}
            onClick={() => setFilter("Requested")}
          >
            Requested
          </button>
          <button
            style={{ backgroundColor: !requestsFilter ? "#40444b" : "#5676af" }}
            className={styles.FriendsBtn}
            onClick={() => setFilter("Requests")}
          >
            Requests
          </button>
          <button className={styles.AddBtn}>Add Friend</button>
        </div>
      </div>
      {friendsList.length < 1 || mappingList?.length < 1 ? (
        <div className={styles.FriendsList}>
          {requestsFilter ? (
            <h1>No Open Requests At This Time</h1>
          ) : requestedFilter ? (
            <h1>No Users Requested At This Time</h1>
          ) : onlineFilter ? (
            <h1>No Users Currently Online</h1>
          ) : (
            <h1>No Friends Yet</h1>
          )}
        </div>
      ) : (
        <div className={styles.FriendsList}>
          {mappingList &&
            mappingList.map((item, index) => (
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
