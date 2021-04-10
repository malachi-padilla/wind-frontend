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
  const [mutualFriends, setMutualFriends] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const matchedFriends = recipientData.friends.filter((item) =>
      myFriends.includes(item)
    );
    const usernames: string[] = [];
    for (const id of matchedFriends) {
      getUserById(id).then((res) => {
        usernames.push(res.data.username);
      });
    }
    setMutualFriends(usernames);
  }, []);

  return (
    <ModalContainer onClick={() => setViewFriend(false)}>
      <FriendBox onClick={(e) => e.stopPropagation()}>
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
        <MutualFriends>
          {mutualFriends!.length > 0 ? (
            mutualFriends!.map((item, index) => (
              <FriendBar
                onClick={() => dispatch(setFriendAction(item))}
                key={index}
              >
                <UserInfo>
                  <ProfilePicture
                    src="https://source.unsplash.com/random"
                    alt="profilepic"
                  ></ProfilePicture>
                  <p>{item}</p>
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
