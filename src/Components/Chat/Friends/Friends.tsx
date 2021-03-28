import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMinutesLastOnline } from "Util/utilFunctions";
import { getUsersRequest } from "Api/user";
import { MainContainer } from "Theme/Containers";
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
  Notification,
  RequestBtnContents,
  UserInfo,
} from "./Friends-css";

export default function Friends({
  friendsList,
  setFriend,
  setFriendsIsOpen,
  recipientIsTyping,
  userInfo,
}) {
  const [onlineFilter, setOnlineFilter] = useState<boolean>(false);
  const [requestsFilter, setRequestsFilter] = useState<boolean>(false);
  const [requestedFilter, setRequestedFilter] = useState<boolean>(false);
  const [mappingList, setMappingList] = useState<any>();

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

  return (
    <MainContainer>
      <ActionBar>
        <FriendsTab>
          <i className="fas fa-user-friends"></i>
          <p style={{ color: "#fff", fontWeight: 700 }}>Friends</p>
        </FriendsTab>
        <ActionBarBtns>
          <FriendsBtn
            selected={onlineFilter}
            onClick={() => setFilter("Online")}
          >
            Online
          </FriendsBtn>
          <FriendsBtn
            selected={requestedFilter}
            onClick={() => setFilter("Requested")}
          >
            Requested
          </FriendsBtn>
          <FriendsBtn
            selected={requestsFilter}
            onClick={() => setFilter("Requests")}
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
          <AddBtn>Add Friend</AddBtn>
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
          {mappingList &&
            mappingList.map((item, index) => (
              <FriendBar key={index}>
                <UserInfo>
                  {recipientIsTyping ? (
                    <div>
                      <span></span>
                    </div>
                  ) : null}
                  <h3>{item.username}</h3>
                </UserInfo>
                <Actions>
                  {!requestsFilter ? (
                    <ChatBtn
                      onClick={() => {
                        setFriend(item.username);
                        setFriendsIsOpen(false);
                      }}
                    >
                      <i className="fas fa-comment-alt"></i>
                    </ChatBtn>
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
            ))}
        </FriendsList>
      )}
    </MainContainer>
  );
}
