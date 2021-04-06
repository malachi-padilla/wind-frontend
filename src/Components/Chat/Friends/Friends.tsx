import React, { useEffect, useState } from "react";
import { getMinutesLastOnline } from "Util/utilFunctions";
import { getUserByUsernameRequest, getUsersRequest } from "Api/user";
import { FriendBarTheme, MainContainer } from "Theme/containers";
import {
  AcceptBtn,
  ActionBar,
  ActionBarBtns,
  Actions,
  AddBtn,
  ChatBtn,
  DenyBtn,
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
} from "./Friends-css";
import { RecipientUserInfo } from "Types/models";
import { FriendsProps } from "Components/Types/props";
import { useDispatch, useSelector } from "react-redux";
import { setFriendAction } from "Redux/actions";
import { ReduxStore } from "Redux/types";
import FriendButton from "Components/Buttons/FriendButton/FriendButton";
import LoadingPage from "../LoadingPage/LoadingPage";
import { addFriendRequest } from "Api/friends";

export default function Friends({
  friendsList,
  setFriendsIsOpen,
  userInfo,
  pollingInterval,
}: FriendsProps) {
  const [onlineFilter, setOnlineFilter] = useState<boolean>(false);
  const [requestsFilter, setRequestsFilter] = useState<boolean>(false);
  const [requestedFilter, setRequestedFilter] = useState<boolean>(false);
  const [addFriendOpen, setAddFriendOpen] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(true);
  const [friendInput, setFriendInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RecipientUserInfo>();
  const [mappingList, setMappingList] = useState<RecipientUserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const friend = useSelector((state: ReduxStore) => state.friend);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!requestedFilter && !requestsFilter && !onlineFilter) {
      setMappingList(friendsList);
    } else {
      // setLoading(false);
    }
  }, [friendsList, onlineFilter, requestsFilter, requestedFilter, userInfo]);

  const setFilter = async (filter: string) => {
    if (filter === "Online") {
      setRequestedFilter(false);
      setRequestsFilter(false);
      if (onlineFilter) {
        setOnlineFilter(false);
      } else {
        setMappingList(
          friendsList.filter(
            (item) => getMinutesLastOnline(item.lastOnline) < 10
          )
        );
        setOnlineFilter(true);
      }
    } else if (filter === "Requested") {
      setOnlineFilter(false);
      setRequestsFilter(false);
      if (requestedFilter) {
        setRequestedFilter(false);
      } else {
        await getUsersRequest(userInfo.sentFriendRequests).then((res) => {
          setMappingList(res.data);
        });
        setRequestedFilter(true);
      }
    } else if (filter === "Requests") {
      setOnlineFilter(false);
      setRequestedFilter(false);
      if (requestsFilter) {
        setRequestsFilter(false);
      } else {
        await getUsersRequest(userInfo.recievedFriendRequests).then((res) => {
          setMappingList(res.data);
        });
        setRequestsFilter(true);
      }
    }
  };

  useEffect(() => {
    setSearchError(false);
  }, [friendInput]);

  const getRecipientInformation = async () => {
    const searchResult = await getUserByUsernameRequest(friendInput)
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch(() => "Bad Request");
    if (searchResult !== "Bad Request") {
      setFriendInput("");
    } else {
      setSearchError(true);
    }
  };

  const renderNone = () => {
    if (loading) {
      return <LoadingPage />;
    }
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
          <i className="fas fa-user-friends"></i>
          <FriendsTabText>Friends</FriendsTabText>
        </FriendsTab>
        <ActionBarBtns>
          <FriendsBtn
            selected={onlineFilter}
            onClick={() => {
              setFilter("Online");
              setAddFriendOpen(false);
            }}
          >
            Online
          </FriendsBtn>
          <FriendsBtn
            selected={requestedFilter}
            onClick={() => {
              setFilter("Requested");
              setAddFriendOpen(false);
            }}
          >
            Requested
          </FriendsBtn>
          <FriendsBtn
            selected={requestsFilter}
            onClick={() => {
              setFilter("Requests");
              setAddFriendOpen(false);
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
              setRequestsFilter(false);
              setRequestedFilter(false);
              setOnlineFilter(false);
            }}
          >
            Add Friend
          </AddBtn>
        </ActionBarBtns>
      </ActionBar>

      {friendsList.length < 1 || mappingList?.length < 1 ? (
        <FriendsList>{renderNone()}</FriendsList>
      ) : (
        <FriendsList>
          {addFriendOpen ? (
            <AddFriendContainer>
              <Title>
                <h4>ADD FRIEND</h4>
                {searchError ? (
                  <p>
                    Hm, didn't work. Double check that the capitalization and
                    spelling are correct.
                  </p>
                ) : null}
              </Title>
              <InputContent>
                <AddFriendInput
                  error={searchError}
                  onKeyDown={(e: any) =>
                    e.key === "Enter" && getRecipientInformation()
                  }
                  onChange={(e: any) => setFriendInput(e.target.value)}
                  value={friendInput}
                  placeholder="Enter a Username"
                  type="text"
                ></AddFriendInput>
              </InputContent>
              {searchResults && (
                <>
                  <FriendBar>
                    <p>{searchResults.username}</p>
                    <FriendButton
                      recipientId={searchResults.userId}
                      relation={searchResults.relation}
                    />
                  </FriendBar>
                </>
              )}
            </AddFriendContainer>
          ) : (
            mappingList &&
            mappingList.map((item, index) => (
              <FriendBar key={index}>
                <UserInfo>
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
                        <i className="fas fa-comment-alt"></i>
                      </ChatBtn>
                      <MoreBtn>
                        <i className="fas fa-ellipsis-v"></i>
                      </MoreBtn>
                    </>
                  ) : (
                    <>
                      <AcceptBtn
                        onClick={() =>
                          acceptRequest(userInfo.userId, item.userId)
                        }
                      >
                        <i className="fas fa-check"></i>
                      </AcceptBtn>
                    </>
                  )}
                </Actions>
              </FriendBar>
            ))
          )}
        </FriendsList>
      )}
    </MainContainer>
  );
}
