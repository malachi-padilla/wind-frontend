import {
  Actions,
  FriendBar,
  MoreBtn,
  UserInfo,
} from "Components/Chat/Friends/Friends-css";
import { UserInfoWrapper } from "Components/Chat/Profile/Profile-css";
import React, { useState } from "react";
import { PrimaryButton } from "Theme/buttons";
import { ModalContainer } from "Theme/containers";
import { ProfilePicture } from "Theme/misc";
import {
  FriendBox,
  FriendBoxTop,
  FriendNav,
  NavOpts,
  MutualFriends,
} from "./FriendModal-css";

export default function FriendModal({
  setViewFriend,
  friend,
  recipientData,
  myFriends,
}) {
  console.log(recipientData);
  return (
    <ModalContainer>
      <FriendBox>
        <FriendBoxTop>
          <UserInfoWrapper>
            <ProfilePicture
              style={{ height: "80px", width: "80px" }}
              src="https://source.unsplash.com/random"
              alt="profilepic"
            ></ProfilePicture>
            <h3>{friend}</h3>
          </UserInfoWrapper>
          <Actions>
            <PrimaryButton onClick={() => setViewFriend(false)}>
              Send Message
            </PrimaryButton>
            <MoreBtn>
              <i className="fas fa-ellipsis-v"></i>
            </MoreBtn>
          </Actions>
        </FriendBoxTop>
        <FriendNav>
          <NavOpts>
            <p>Mutual Friends</p>
          </NavOpts>
        </FriendNav>
        <MutualFriends></MutualFriends>
      </FriendBox>
    </ModalContainer>
  );
}
