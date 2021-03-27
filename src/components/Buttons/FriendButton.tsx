import axios from "axios";
import React, { useContext } from "react";
import defaultStyles from "./FriendButton.module.css";
import { MyContext } from "Context";
import { UserContextNotNull } from "components/types";

export interface FriendButtonProps {
  styles?: any;
  recipientId: any;
  relation: string;
  fetchUser: any;
}

export default function FriendButton({
  recipientId,
  styles,
  relation,
  fetchUser,
}: FriendButtonProps) {
  const { user: userInfo } = useContext(MyContext) as UserContextNotNull;

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
        fetchUser();
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
        fetchUser();
      });
  };
  // Scenario : Build out UI to make action in Front End and render result without seperate HTTP Requestsa

  return (
    <button
      onClick={
        relation === "Requested" || relation === "Friends"
          ? removeFriend
          : addFriend
      }
      style={styles ? styles : undefined}
      className={!styles ? defaultStyles.FriendsBtn : undefined}
    >
      {relation === "Requested"
        ? "Sent Request"
        : relation === "Recipient Requested"
        ? "Accept Friend"
        : relation === "Friends"
        ? "Friends"
        : "Add Friend"}
    </button>
  );
}
