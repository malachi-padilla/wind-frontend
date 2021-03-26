import axios from "axios";
import React, { useContext } from "react";
import defaultStyles from "./FriendButton.module.css";
import { MyContext } from "Context";

export interface FriendButtonProps {
  styles?: any;
  recipientId: any;
}

export default function FriendButton({
  recipientId,
  styles,
}: FriendButtonProps) {
  const [userInfo, [fetchNew, setFetchNew]]: any = useContext(MyContext);
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
      .then(setFetchNew(!fetchNew));
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
      .then(setFetchNew(!fetchNew));
  };

  return (
    <button
      onClick={
        userInfo.sentFriendRequests.includes(recipientId) ||
        userInfo.friends.includes(recipientId)
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
