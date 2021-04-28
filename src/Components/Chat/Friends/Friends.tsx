import React, { useEffect, useState } from 'react';
import { getMinutesLastOnline } from 'Util/utilFunctions';
import { getUsersRequest } from 'Api/user';
import { MainContainer } from 'Theme/containers';
import {
  AcceptBtn,
  ActionBar,
  ActionBarBtns,
  Actions,
  AddBtn,
  ChatBtn,
  FriendBar,
  FriendsBtn,
  FriendsList,
  FriendsTab,
  FriendsTabText,
  Notification,
  RequestBtnContents,
  UserInfo,
  InputContent,
  AddFriendContainer,
  Title,
  MoreBtn,
  AddFriendInput,
} from './Friends-css';
import { RecipientUserInfo } from 'Types/models';
import { FriendsProps } from 'Components/Types/props';
import { useDispatch } from 'react-redux';
import { setFriendAction, setPopOverMessage } from 'Redux/actions';
import FriendButton from 'Components/Buttons/FriendButton/FriendButton';
import { addFriendRequest, searchUsersRequest } from 'Api/friends';
import { ProfilePicture } from 'Theme/misc';

export default function Friends({
  friendsList,
  setFriendsIsOpen,
  userInfo,
}: FriendsProps) {
  const [onlineFilter, setOnlineFilter] = useState<boolean>(false);
  const [requestsFilter, setRequestsFilter] = useState<boolean>(false);
  const [requestedFilter, setRequestedFilter] = useState<boolean>(false);
  const [addFriendOpen, setAddFriendOpen] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(true);
  const [friendInput, setFriendInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<RecipientUserInfo[]>([]);
  const [mappingList, setMappingList] = useState<RecipientUserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !requestedFilter &&
      !requestsFilter &&
      !onlineFilter &&
      mappingList !== friendsList
    ) {
      setMappingList(friendsList);
      setLoading(false);
    }
  }, [friendsList, onlineFilter, requestsFilter, requestedFilter, userInfo]);

  const setFilter = async (filter: string) => {
    if (filter === 'Online') {
      if (onlineFilter) {
        setOnlineFilter(false);
        if (!requestedFilter && !requestsFilter) {
          setLoading(true);
        }
      } else {
        setMappingList(
          friendsList.filter(
            (item) => getMinutesLastOnline(item.lastOnline) < 10
          )
        );
        setOnlineFilter(true);
      }
      setRequestedFilter(false);
      setRequestsFilter(false);
      setAddFriendOpen(false);
    } else if (filter === 'Requested') {
      if (requestedFilter) {
        setRequestedFilter(false);
        if (!onlineFilter && !requestsFilter) {
          setLoading(true);
        }
      } else {
        await getUsersRequest(userInfo.sentFriendRequests).then((res) => {
          setMappingList(res.data);
        });
        setRequestedFilter(true);
      }
      setOnlineFilter(false);
      setRequestsFilter(false);
      setAddFriendOpen(false);
    } else if (filter === 'Requests') {
      if (requestsFilter) {
        setRequestsFilter(false);
        if (!onlineFilter && !requestedFilter) {
          setLoading(true);
        }
      } else {
        await getUsersRequest(userInfo.recievedFriendRequests).then((res) => {
          setMappingList(res.data);
        });
        setRequestsFilter(true);
      }
      setOnlineFilter(false);
      setRequestedFilter(false);
      setAddFriendOpen(false);
    } else if (filter === 'Add Friend') {
      if (addFriendOpen) {
        setAddFriendOpen(false);
      } else {
        setAddFriendOpen(true);
        setOnlineFilter(false);
        setRequestedFilter(false);
        setRequestsFilter(false);
      }
    }
  };

  useEffect(() => {
    setSearchError(false);
  }, [friendInput]);

  const searchUsers = async (searchInput) => {
    await searchUsersRequest(searchInput).then((res) => {
      setSearchResults(
        res.data.filter((item) => item.username !== userInfo.username)
      );
      if (!res.data.length) {
        setSearchError(true);
      }
    });
  };

  const renderNone = () => {
    if (requestsFilter) {
      return <h1>No Open Requests At This Time</h1>;
    } else if (requestedFilter) {
      return <h1>No Users Requested At This Time</h1>;
    } else if (onlineFilter) {
      return <h1>No Users Currently Online</h1>;
    } else {
      return <h1>No Friends Yet</h1>;
    }
  };

  const acceptRequest = async (userId: string, friendId: string) => {
    await addFriendRequest(userId, friendId).then(() => {
      setMappingList(mappingList.filter((item) => item.userId !== friendId));
    });
  };

  return (
    <MainContainer>
      <ActionBar>
        <FriendsTab>
          <i className='fas fa-user-friends'></i>
          <FriendsTabText>Friends</FriendsTabText>
        </FriendsTab>
        <ActionBarBtns>
          <FriendsBtn
            selected={onlineFilter}
            onClick={() => {
              setFilter('Online');
            }}
          >
            Online
          </FriendsBtn>
          <FriendsBtn
            selected={requestedFilter}
            onClick={() => {
              setFilter('Requested');
            }}
          >
            Requested
          </FriendsBtn>
          <FriendsBtn
            selected={requestsFilter}
            onClick={() => {
              setFilter('Requests');
            }}
          >
            <RequestBtnContents>
              Requests
              {requestsFilter && mappingList.length > 0 ? (
                <Notification>
                  <p>{mappingList?.length}</p>
                </Notification>
              ) : null}
            </RequestBtnContents>
          </FriendsBtn>
          <AddBtn
            addFriendOpen={addFriendOpen}
            onClick={() => {
              setAddFriendOpen(!addFriendOpen);
              setFilter('Add Friend');
            }}
          >
            Add Friend
          </AddBtn>
        </ActionBarBtns>
      </ActionBar>
      {!loading ? (
        friendsList.length < 1 || mappingList?.length < 1 ? (
          <FriendsList>{renderNone()}</FriendsList>
        ) : (
          <FriendsList>
            {addFriendOpen ? (
              <AddFriendContainer>
                <Title error={searchError}>
                  <h4>ADD FRIEND</h4>
                  {searchError ? (
                    <p>Hm, didn't work. Double check that.</p>
                  ) : (
                    <p>You can add a friend with their username.</p>
                  )}
                </Title>
                <InputContent>
                  <AddFriendInput
                    error={searchError}
                    onKeyDown={(e: any) =>
                      e.key === 'Enter' && searchUsers(friendInput)
                    }
                    onChange={(e: any) => setFriendInput(e.target.value)}
                    value={friendInput}
                    placeholder='Enter a Username'
                    type='text'
                  ></AddFriendInput>
                </InputContent>
                {searchResults.map((item) => (
                  <>
                    <FriendBar>
                      <UserInfo>
                        <ProfilePicture
                          src={item.profilePicture}
                          alt='profilepic'
                        ></ProfilePicture>
                        <p>{item.username}</p>
                      </UserInfo>
                      <FriendButton
                        recipientId={item.userId}
                        relation={item.relation}
                      />
                    </FriendBar>
                  </>
                ))}
              </AddFriendContainer>
            ) : (
              mappingList &&
              mappingList.map((item, index) => (
                <FriendBar key={index}>
                  <UserInfo>
                    <ProfilePicture
                      src={item.profilePicture}
                      alt='profilepic'
                    ></ProfilePicture>
                    <h3>{item.username}</h3>
                  </UserInfo>
                  <Actions>
                    {!requestsFilter ? (
                      <>
                        <ChatBtn
                          onClick={() => {
                            dispatch(setFriendAction(item.username));
                            setFriendsIsOpen(false);
                          }}
                        >
                          <i className='fas fa-comment-alt'></i>
                        </ChatBtn>
                        <MoreBtn>
                          <i className='fas fa-ellipsis-v'></i>
                        </MoreBtn>
                      </>
                    ) : (
                      <>
                        <AcceptBtn
                          onClick={() =>
                            acceptRequest(userInfo.userId, item.userId)
                          }
                        >
                          <i className='fas fa-check'></i>
                        </AcceptBtn>
                      </>
                    )}
                  </Actions>
                </FriendBar>
              ))
            )}
          </FriendsList>
        )
      ) : null}
    </MainContainer>
  );
}
