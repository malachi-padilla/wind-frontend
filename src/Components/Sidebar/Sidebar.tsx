import { SideBarProps } from 'Components/Types/props';
import React, { useEffect, useState } from 'react';
import {
  DirectMessageTab,
  EnterFriendWrapper,
  FriendBar,
  FriendsTab,
  IsTyping,
  ProfileBar,
  ProfileBtns,
  RecentFriendsWrapper,
  RecentlyMessagedList,
  RemoveFriendButton,
  SettingsBtn,
  SideBarContents,
  StyledFriendInput,
  StyledMainContainer,
} from './Sidebar-css';
import { getUserByUsernameRequest } from 'Api/user';
import { SocketIsTypingMessage } from 'Components/Types/models';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFriendAction,
  setPopOverMessage,
  setRecentlyMessagedAction,
} from 'Redux/actions';
import { ReduxStore } from 'Redux/types';
import { DefaultStatusIndicator, ProfilePicture } from 'Theme/misc';
import { Actions, UserInfo } from 'Components/Chat/Friends/Friends-css';
import DirectMessageModal from 'Components/Modals/DirectMessageModal';
import PopOver from 'Components/PopOver/PopOver';
import { isOnline } from 'Util/utilFunctions';
import { RecipientUserInfo } from 'Types/models';

interface PeopleTyping {
  [key: string]: boolean;
}
export default function SideBar({
  userInfo,
  setFriendsIsOpen,
  friendsIsOpen,
  socket,
  setProfileOpen,
  friendsList,
}: SideBarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>('');
  const [directMessageModalOpen, setDirectMessageModalOpen] = useState<boolean>(
    false
  );
  const [notFoundError, setNotFoundError] = useState<boolean>(false);
  const [peopleTyping, setPeopleTyping] = useState<PeopleTyping>({});
  const friend = useSelector((state: ReduxStore) => state.friend);
  const [friendsOnline, setFriendsOnline] = useState<RecipientUserInfo[]>([]);
  const recentlyMessaged = useSelector(
    (state: ReduxStore) => state.recentlyMessaged
  );

  const popOverMessage = useSelector(
    (state: ReduxStore) => state.popOverMessage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('typing', ({ personTyping, isTyping }: SocketIsTypingMessage) => {
      if (personTyping) {
        setPeopleTyping((current) => {
          return {
            ...current,
            [personTyping]: isTyping,
          };
        });
      }
    });
  }, []);

  const removeRecentlyMessaged = (item: string) => {
    const newList = recentlyMessaged.filter((node) => item !== node.username);
    dispatch(setRecentlyMessagedAction(newList));
  };

  const addFriend = async () => {
    // Perform Check To See If User Exists First!
    if (friendInput.length > 0 && friendInput !== userInfo.username) {
      const userResult = await getUserByUsernameRequest(friendInput)
        .then((res) => res)
        .catch(() => 'Not Found');
      if (userResult !== 'Not Found') {
        setNotFoundError(false);
        dispatch(setFriendAction(friendInput));
        setFriendsIsOpen(false);
        setFriendInput('');
      } else {
        setNotFoundError(true);
      }
    }
  };

  useEffect(() => {
    setNotFoundError(false);
  }, [friendInput]);

  useEffect(() => {
    setFriendsOnline(friendsList.filter((item) => isOnline(item.lastOnline)));
  }, [friendsList]);

  return (
    <StyledMainContainer>
      {directMessageModalOpen && (
        <DirectMessageModal
          open={setDirectMessageModalOpen}
          allFriends={friendsList}
        />
      )}
      <SideBarContents>
        <EnterFriendWrapper>
          <StyledFriendInput
            error={notFoundError}
            onKeyDown={(e) => (e.key === 'Enter' ? addFriend() : null)}
            onChange={(e: any) => setFriendInput(e.target.value)}
            value={friendInput}
            type='text'
            placeholder='Find or start a conversation'
          ></StyledFriendInput>
        </EnterFriendWrapper>
        <RecentFriendsWrapper>
          <FriendsTab
            onClick={() => setFriendsIsOpen(true)}
            style={{ backgroundColor: friendsIsOpen ? '#36393f' : undefined }}
          >
            <div>
              <i className='fas fa-user-friends'></i>
            </div>
            <p>Friends</p>
          </FriendsTab>
          <DirectMessageTab>
            <p>DIRECT MESSAGES</p>
            {popOverMessage === 'Create DM' ? <PopOver /> : null}
            <button
              onClick={() => setDirectMessageModalOpen(true)}
              onMouseOver={() => {
                dispatch(setPopOverMessage('Create DM'));
              }}
              onMouseLeave={() => dispatch(setPopOverMessage(''))}
            >
              <i className='fas fa-times'></i>
            </button>
          </DirectMessageTab>
          <RecentlyMessagedList>
            {recentlyMessaged.map((item, index) => (
              <FriendBar
                style={{
                  backgroundColor:
                    friend === item.username ? '#3c3f47' : undefined,
                }}
                key={index}
                onClick={() => {
                  dispatch(setFriendAction(item.username));
                  setFriendsIsOpen(false);
                }}
              >
                <UserInfo>
                  <ProfilePicture
                    src={item.profilePicture}
                    alt='profilepic'
                  ></ProfilePicture>
                  <DefaultStatusIndicator
                    online={
                      friendsOnline[0] &&
                      friendsOnline[0].username === item.username
                    }
                  >
                    {peopleTyping[item.username] ? (
                      <IsTyping>
                        <span></span>
                      </IsTyping>
                    ) : (
                      <span></span>
                    )}
                  </DefaultStatusIndicator>
                  <p>{item.username}</p>
                </UserInfo>
                <Actions>
                  <RemoveFriendButton
                    onClick={() => removeRecentlyMessaged(item.username)}
                  >
                    <i className='fas fa-times'></i>
                  </RemoveFriendButton>
                </Actions>
              </FriendBar>
            ))}
          </RecentlyMessagedList>
        </RecentFriendsWrapper>
      </SideBarContents>
      <ProfileBar>
        <UserInfo>
          <ProfilePicture
            src={userInfo.profilePicture}
            alt='profilepic'
          ></ProfilePicture>
          <DefaultStatusIndicator online={true}>
            <span></span>
          </DefaultStatusIndicator>
          <p>{userInfo.username}</p>
        </UserInfo>
        <ProfileBtns>
          {popOverMessage === 'User Settings' ? <PopOver /> : null}
          <SettingsBtn
            onClick={() => {
              setProfileOpen(true);
              dispatch(setPopOverMessage(''));
            }}
            onMouseOver={() => {
              dispatch(setPopOverMessage('User Settings'));
            }}
            onMouseLeave={() => dispatch(setPopOverMessage(''))}
          >
            <i className='fas fa-cog'></i>
          </SettingsBtn>
        </ProfileBtns>
      </ProfileBar>
    </StyledMainContainer>
  );
}
