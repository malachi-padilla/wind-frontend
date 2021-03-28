import { logoutRequest } from "Api/user";
import axios from "axios";
import { SideBarProps } from "Components/types";
import React, { useEffect, useState } from "react";
import {
  DirectMessageTab,
  EnterFriendWrapper,
  FriendBar,
  FriendsTab,
  IsTyping,
  LogoutBtn,
  ProfileBar,
  ProfileBtns,
  RecentFriendsWrapper,
  RecentlyMessagedList,
  RemoveFriendButton,
  SideBarContents,
  StyledFriendInput,
  StyledMainContainer,
} from "./Sidebar-css";

export default function SideBar({
  friend,
  setFriend,
  userInfo,
  recipientIsTyping,
  setFriendsIsOpen,
  friendsIsOpen,
  friendsList,
}: SideBarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>("");
  const [recentlyMessaged, setRecentlyMessaged] = useState<string[]>([]);
  const [notFoundError, setNotFoundError] = useState<boolean>(false);

  const logout = () => {
    logoutRequest().then(() => {
      window.location.href = "/";
    });
  };

  const findUserByUsername = async (username: string) => {
    return axios
      .get(`http://localhost:4000/user?username=${username}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch(() => "Not Found");
  };

  const addFriend = async () => {
    // Perform Check To See If User Exists First!
    if (friendInput.length > 0 && friendInput !== userInfo.username) {
      const userResult = await findUserByUsername(friendInput);
      if (
        userResult !== "Not Found" &&
        recentlyMessaged.indexOf(friendInput) === -1
      ) {
        setNotFoundError(false);
        setFriend(friendInput);
        setFriendsIsOpen(false);
        setRecentlyMessaged((current) => [...current, friendInput]);
        setFriendInput("");
      } else {
        setNotFoundError(true);
      }
    }
  };

  useEffect(() => {
    setNotFoundError(false);
  }, [friendInput]);

  return (
    <StyledMainContainer>
      <SideBarContents>
        <EnterFriendWrapper>
          <StyledFriendInput
            error={notFoundError}
            onKeyDown={(e) => (e.key == "Enter" ? addFriend() : null)}
            onChange={(e: any) => setFriendInput(e.target.value)}
            value={friendInput}
            type="text"
            placeholder="Find or start a conversation"
          ></StyledFriendInput>
        </EnterFriendWrapper>
        <RecentFriendsWrapper>
          <FriendsTab
            onClick={() => setFriendsIsOpen(true)}
            style={{ backgroundColor: friendsIsOpen ? "#36393f" : undefined }}
          >
            <div>
              <i className="fas fa-user-friends"></i>
            </div>
            <p>Friends</p>
          </FriendsTab>
          <DirectMessageTab>
            <p>DIRECT MESSAGES</p>
            <button>+</button>
          </DirectMessageTab>
          {!friend ? null : (
            <RecentlyMessagedList>
              {recentlyMessaged.map((item, index) => (
                <FriendBar
                  style={{
                    backgroundColor: friend === item ? "#36393f" : "#2f3136",
                  }}
                  key={index}
                  onClick={() => {
                    setFriend(item);
                    setFriendsIsOpen(false);
                  }}
                >
                  {recipientIsTyping ? (
                    <IsTyping>
                      <span></span>
                    </IsTyping>
                  ) : null}
                  <p>{item}</p>
                  <RemoveFriendButton
                    onClick={() =>
                      setRecentlyMessaged((current) =>
                        current.filter((node) => item !== node)
                      )
                    }
                  >
                    <i className="fas fa-times"></i>
                  </RemoveFriendButton>
                </FriendBar>
              ))}
            </RecentlyMessagedList>
          )}
        </RecentFriendsWrapper>
      </SideBarContents>
      <ProfileBar>
        <p>{userInfo.username}</p>
        <ProfileBtns>
          <button>
            <i className="fas fa-cog"></i>
          </button>
          <LogoutBtn onClick={logout}>Logout</LogoutBtn>
        </ProfileBtns>
      </ProfileBar>
    </StyledMainContainer>
  );
}
