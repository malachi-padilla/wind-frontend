import axios from "axios";
import React, { useContext } from "react";
import defaultStyles from "./FriendButton.module.css";
import { MyContext } from "Context";
import { UserContextNotNull } from "Components/types";
import { addFriendRequest, removeFriendRequest } from "Api/friends";

export interface FriendButtonProps {
  styles?: any;
  recipientId: string;
  relation: string;
  fetchUser: () => void;
}

export default function FriendButton({
  recipientId,
  styles,
  relation,
  fetchUser,
}: FriendButtonProps) {
  const { user: userInfo } = useContext(MyContext) as UserContextNotNull;

  const addFriend = async () => {
    addFriendRequest(userInfo.userId, recipientId).then(() => {
      fetchUser();
    });
  };

  const removeFriend = async () => {
    removeFriendRequest(userInfo.userId, recipientId).then(() => {
      fetchUser();
    });
  };

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
