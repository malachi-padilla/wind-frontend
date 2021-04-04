import React, { useContext, useState } from "react";
import { MyContext } from "Context";
import { UserContextNotNull } from "Types/types";
import { addFriendRequest, removeFriendRequest } from "Api/friends";
import { PrimaryButton } from "Theme/buttons";
import styled from "styled-components";
import { FriendButtonProps } from "Components/Types/props";
import axios, { AxiosResponse } from "axios";
import { RecipientUserInfo } from "Types/models";

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin-left: 10px;
`;

export default function FriendButton({
  recipientId,
  relation,
}: FriendButtonProps) {
  const [updatedRelation, setUpdatedRelation] = useState<string>(relation);
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

  const fetchUser = () => {
    axios
      .get(`http://localhost:4000/user/${recipientId}`, {
        withCredentials: true,
      })
      .then((res: AxiosResponse<RecipientUserInfo>) => {
        setUpdatedRelation(res.data.relation);
      });
  };

  return (
    <StyledPrimaryButton
      onClick={
        updatedRelation === "Requested" || updatedRelation === "Friends"
          ? removeFriend
          : addFriend
      }
    >
      {updatedRelation === "Requested"
        ? "Sent Request"
        : updatedRelation === "Recipient Requested"
        ? "Accept Friend"
        : updatedRelation === "Friends"
        ? "Friends"
        : "Add Friend"}
    </StyledPrimaryButton>
  );
}
