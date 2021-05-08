import { getMutualFriendsRequest } from 'Api/friends';
import { IsTyping } from 'Components/Chat/Chat/Chat-css';
import {
  Actions,
  MoreBtn,
  UserInfo,
} from 'Components/Chat/Friends/Friends-css';
import { LoadingContainer } from 'Components/Chat/LoadingPage/LoadingPage-css';
import { UserInfoWrapper } from 'Components/Chat/Profile/Profile-css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFriendAction } from 'Redux/actions';
import { PrimaryButton } from 'Theme/buttons';
import { FriendBarTheme } from 'Theme/containers';
import { DefaultStatusIndicator, ProfilePicture } from 'Theme/misc';
import { RecipientUserInfo } from 'Types/models';
import { isOnline } from 'Util/utilFunctions';
import {
  FriendBox,
  FriendBoxTop,
  FriendNav,
  NavOpts,
  MutualFriends,
  Container,
} from './FriendModal-css';

export default function FriendModal({
  setViewFriend,
  friend,
  recipientData,
  userInfo,
}) {
  const [mutualFriends, setMutualFriends] = useState<RecipientUserInfo[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMutualFriendsRequest(recipientData.userId, userInfo.userId).then(
      (res) => {
        setMutualFriends(res.data);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (mutualFriends === undefined) {
      setLoading(true);
    }
  }, [mutualFriends]);

  return (
    <Container onClick={() => setViewFriend(false)}>
      <FriendBox onClick={(e) => e.stopPropagation()}>
        <FriendBoxTop>
          <UserInfoWrapper>
            <ProfilePicture
              style={{ height: '80px', width: '80px' }}
              src={recipientData.profilePicture}
              alt='profilepic'
            ></ProfilePicture>
            <h3>{friend}</h3>
          </UserInfoWrapper>
          <Actions>
            <PrimaryButton
              style={{ marginRight: '1rem' }}
              onClick={() => setViewFriend(false)}
            >
              Send Message
            </PrimaryButton>
            <MoreBtn>
              <i className='fas fa-ellipsis-v'></i>
            </MoreBtn>
          </Actions>
        </FriendBoxTop>
        <FriendNav>
          <NavOpts>
            <p>Mutual Friends</p>
          </NavOpts>
        </FriendNav>
        <MutualFriends>
          {loading && (
            <LoadingContainer>
              <IsTyping>
                <span></span>
                <span></span>
                <span></span>
              </IsTyping>
              <h2>Loading</h2>
            </LoadingContainer>
          )}
          {mutualFriends && mutualFriends!.length > 0 ? (
            mutualFriends!.map((item) => (
              <FriendBarTheme
                onClick={() => dispatch(setFriendAction(item.username))}
                key={item.userId}
              >
                <UserInfo>
                  <ProfilePicture
                    src={item.profilePicture}
                    alt='profilepic'
                  ></ProfilePicture>
                  <p>{item.username}</p>
                  <DefaultStatusIndicator
                    appLocation={'Modal'}
                    online={isOnline(item.lastOnline) ? true : false}
                  >
                    <span></span>
                  </DefaultStatusIndicator>
                </UserInfo>
              </FriendBarTheme>
            ))
          ) : !loading ? (
            <h2>No Friends in Common</h2>
          ) : null}
        </MutualFriends>
      </FriendBox>
    </Container>
  );
}
