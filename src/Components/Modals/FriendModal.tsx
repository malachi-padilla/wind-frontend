import { getMutualFriendsRequest } from "Api/friends";
import { getUserById } from "Api/user";
import { IsTyping } from "Components/Chat/Chat/Chat-css";
import {
  Actions,
  FriendBar,
  MoreBtn,
  UserInfo,
} from "Components/Chat/Friends/Friends-css";
import { LoadingContainer } from "Components/Chat/LoadingPage/LoadingPage-css";
import { UserInfoWrapper } from "Components/Chat/Profile/Profile-css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFriendAction } from "Redux/actions";
import { PrimaryButton } from "Theme/buttons";
import { ModalContainer } from "Theme/containers";
import { ProfilePicture } from "Theme/misc";
import { RecipientUserInfo } from "Types/models";
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
  userInfo,
}) {
  const [mutualFriends, setMutualFriends] = useState<RecipientUserInfo[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getMutualFriendsRequest(recipientData.userId, userInfo.userId).then(
      (res) => {
        setMutualFriends(res.data);
      }
    );
  }, []);

  return (
    <ModalContainer onClick={() => setViewFriend(false)}>
      <FriendBox onClick={(e) => e.stopPropagation()}>
        <FriendBoxTop>
          <UserInfoWrapper>
            <ProfilePicture
              style={{ height: "80px", width: "80px" }}
              src={recipientData.profilePicture}
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
        <MutualFriends>
          {mutualFriends!.length > 0 ? (
            mutualFriends!.map((item) => (
              <FriendBar
                onClick={() => dispatch(setFriendAction(item.username))}
                key={item.userId}
              >
                <UserInfo>
                  <ProfilePicture
                    src={item.profilePicture}
                    alt="profilepic"
                  ></ProfilePicture>
                  <p>{item.username}</p>
                </UserInfo>
              </FriendBar>
            ))
          ) : (
            <LoadingContainer>
              <IsTyping>
                <span></span>
                <span></span>
                <span></span>
              </IsTyping>
              <h2>Loading</h2>
            </LoadingContainer>
          )}
        </MutualFriends>
      </FriendBox>
    </ModalContainer>
  );
}
