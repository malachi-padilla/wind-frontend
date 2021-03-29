import React, { useContext } from "react";
import { MyContext } from "Context";
import { UserContextNotNull } from "Components/types";
import { addFriendRequest, removeFriendRequest } from "Api/friends";
import { PrimaryButton } from "Theme/buttons";
import styled from "styled-components";

export interface FriendButtonProps {
  recipientId: string;
  relation: string;
  fetchUser: () => void;
}

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin-left: 10px;
`;

export default function FriendButton({
  recipientId,
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
    <StyledPrimaryButton
      onClick={
        relation === "Requested" || relation === "Friends"
          ? removeFriend
          : addFriend
      }
    >
      {relation === "Requested"
        ? "Sent Request"
        : relation === "Recipient Requested"
        ? "Accept Friend"
        : relation === "Friends"
        ? "Friends"
        : "Add Friend"}
    </StyledPrimaryButton>
  );
}
