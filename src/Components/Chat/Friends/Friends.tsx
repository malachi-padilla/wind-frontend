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
  const friend = useSelector((state: ReduxStore) => state.friend);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!requestedFilter && !requestsFilter && !onlineFilter) {
      setMappingList(friendsList);
    }
    if (onlineFilter) {
      setMappingList(
        friendsList.filter((item) => getMinutesLastOnline(item.lastOnline) < 10)
      );
    } else if (requestsFilter) {
      getUsersRequest(userInfo.recievedFriendRequests).then((res) => {
        setMappingList(res.data);
      });
    } else if (requestedFilter) {
      getUsersRequest(userInfo.sentFriendRequests).then((res) => {
        setMappingList(res.data);
      });
    }
  }, [friendsList, onlineFilter, requestsFilter, requestedFilter, userInfo]);

  const setFilter = (filter: string) => {
    if (filter === "Online") {
      setRequestedFilter(false);
      setRequestsFilter(false);
      if (onlineFilter) {
        setOnlineFilter(false);
      } else {
        setOnlineFilter(true);
      }
    } else if (filter === "Requested") {
      setOnlineFilter(false);
      setRequestsFilter(false);
      if (requestedFilter) {
        setRequestedFilter(false);
      } else {
        setRequestedFilter(true);
      }
    } else if (filter === "Requests") {
      setOnlineFilter(false);
      setRequestedFilter(false);
      if (requestsFilter) {
        setRequestsFilter(false);
      } else {
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
              {requestsFilter ? (
                <Notification>
                  <p>{mappingList?.length}</p>
                </Notification>
              ) : null}
            </RequestBtnContents>
          </FriendsBtn>
          <AddBtn onClick={() => setAddFriendOpen(!addFriendOpen)}>
            Add Friend
          </AddBtn>
        </ActionBarBtns>
      </ActionBar>

      {friendsList.length < 1 || mappingList?.length < 1 ? (
        <FriendsList>
          {requestsFilter ? (
            <h1>No Open Requests At This Time</h1>
          ) : requestedFilter ? (
            <h1>No Users Requested At This Time</h1>
          ) : onlineFilter ? (
            <h1>No Users Currently Online</h1>
          ) : (
            <h1>No Friends Yet</h1>
          )}
        </FriendsList>
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
                      <AcceptBtn>
                        <i className="fas fa-check"></i>
                      </AcceptBtn>
                      <DenyBtn>
                        <i className="fas fa-times"></i>
                      </DenyBtn>
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
