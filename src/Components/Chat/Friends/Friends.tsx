import React, { useContext, useEffect, useState } from 'react';
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
  NoFriendstext,
} from './Friends-css';
import { RecipientUserInfo } from 'Types/models';
import { FriendsProps } from 'Components/Types/props';
import { useDispatch } from 'react-redux';
import { setFriendAction } from 'Redux/actions';
import FriendButton from 'Components/Buttons/FriendButton/FriendButton';
import { addFriendRequest, searchUsersRequest } from 'Api/friends';
import { ProfilePicture } from 'Theme/misc';
import { MyContext } from 'Context';
import { UserContextNotNull } from 'Types/types';

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
  const [lonelyText, setLonelyText] = useState<string>('No Friends Yet');
  const dispatch = useDispatch();
  const { setFetchNew } = useContext(MyContext) as UserContextNotNull;

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
        await getUsersRequest(userInfo.sentFriendRequests).then((res: any) => {
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
        await getUsersRequest(userInfo.recievedFriendRequests).then(
          (res: any) => {
            setMappingList(res.data);
          }
        );
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
    await searchUsersRequest(searchInput).then((res: any) => {
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
      return (
        <MainContainer>
          <NoFriendstext>No Open Requests At This Time</NoFriendstext>
        </MainContainer>
      );
    } else if (requestedFilter) {
      return (
        <MainContainer>
          <NoFriendstext>No Users Requested At This Time</NoFriendstext>
        </MainContainer>
      );
    } else if (onlineFilter) {
      return (
        <MainContainer>
          <NoFriendstext>Looks Like Your're Alone</NoFriendstext>
        </MainContainer>
      );
    } else if (!addFriendOpen && !friendsList.length) {
      return (
        <MainContainer>
          <NoFriendstext
            onMouseOver={() => setLonelyText('Add a Friend')}
            onMouseLeave={() => setLonelyText('No Friends Yet')}
            onClick={() => {
              setAddFriendOpen(true);
              setLonelyText('No Friends Yet');
            }}
          >
            {lonelyText}
          </NoFriendstext>
        </MainContainer>
      );
    } else {
      return (
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
      );
    }
  };

  const acceptRequest = async (userId: string, friendId: string) => {
    await addFriendRequest(userId, friendId).then(() => {
      setFetchNew((current) => !current);
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
        mappingList?.length < 1 ? (
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
