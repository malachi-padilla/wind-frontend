import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import defaultStyles from "./FriendButton.module.css";
import { MyContext } from "Context";
import { UserContextNotNull } from "components/types";

export interface FriendButtonProps {
  styles?: any;
  recipientId: any;
}

export default function FriendButton({
  recipientId,
  styles,
}: FriendButtonProps) {
  const { fetchNew, setFetchNew, user: userInfo } = useContext(
    MyContext
  ) as UserContextNotNull;

  const addFriend = async () => {
    await axios
      .post(
        "http://localhost:4000/friends/friendRequest",
        {
          user1: userInfo.userId,
          user2: recipientId,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("Fetching More User Info");
        setFetchNew(!fetchNew);
      });
  };

  const removeFriend = async () => {
    await axios
      .delete("http://localhost:4000/friends/friendRequest", {
        data: {
          user1: userInfo.userId,
          user2: recipientId,
        },
        withCredentials: true,
      })
      .then(() => {
        setFetchNew(!fetchNew);
      });
  };
  // Scenario : Build out UI to make action in Front End and render result without seperate HTTP Requestsa

  return (
    <button
      onClick={
        userInfo.friends.includes(recipientId) ||
        userInfo.sentFriendRequests.includes(recipientId)
          ? removeFriend
          : addFriend
      }
      style={styles ? styles : undefined}
      className={!styles ? defaultStyles.FriendsBtn : undefined}
    >
      {userInfo.sentFriendRequests.includes(recipientId)
        ? "Sent Request"
        : userInfo.recievedFriendRequests.includes(recipientId)
        ? "Accept Friend"
        : userInfo.friends.includes(recipientId)
        ? "Friends"
        : "Add Friend"}
    </button>
  );
}
