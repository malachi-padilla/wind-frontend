import { SideBarProps } from "Components/Types/props";
import React, { useEffect, useState } from "react";
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
} from "./Sidebar-css";
import { getUserByUsernameRequest } from "Api/user";
import { SocketIsTypingMessage } from "Components/Types/models";
import { useDispatch, useSelector } from "react-redux";
import { setFriendAction, setRecentlyMessagedAction } from "Redux/actions";
import { ReduxStore } from "Redux/types";
import { ProfilePicture } from "Theme/misc";

interface PeopleTyping {
  [key: string]: boolean;
}
export default function SideBar({
  userInfo,
  setFriendsIsOpen,
  friendsIsOpen,
  socket,
  setProfileOpen,
}: SideBarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [friendInput, setFriendInput] = useState<string>("");
  const [notFoundError, setNotFoundError] = useState<boolean>(false);
  const [peopleTyping, setPeopleTyping] = useState<PeopleTyping>({});
  const friend = useSelector((state: ReduxStore) => state.friend);
  const recentlyMessaged = useSelector(
    (state: ReduxStore) => state.recentlyMessaged
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("typing", ({ personTyping, isTyping }: SocketIsTypingMessage) => {
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
    const newList = recentlyMessaged.filter((node) => item !== node);
    dispatch(setRecentlyMessagedAction(newList));
  };

  const addFriend = async () => {
    // Perform Check To See If User Exists First!
    if (friendInput.length > 0 && friendInput !== userInfo.username) {
      const userResult = await getUserByUsernameRequest(friendInput)
        .then((res) => res)
        .catch(() => "Not Found");
      if (
        userResult !== "Not Found" &&
        recentlyMessaged.indexOf(friendInput) === -1
      ) {
        setNotFoundError(false);
        dispatch(setFriendAction(friendInput));
        setFriendsIsOpen(false);
        setFriendInput("");
      } else {
        setNotFoundError(true);
      }
    }
  };

  // useEffect(() => {
  //   setNotFoundError(false);
  // }, [friendInput]);

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
            <button>
              <i className="fas fa-times"></i>
            </button>
          </DirectMessageTab>
          <RecentlyMessagedList>
            {recentlyMessaged.map((item, index) => (
              <FriendBar
                style={{
                  backgroundColor: friend === item ? "#36393f" : undefined,
                }}
                key={index}
                onClick={() => {
                  dispatch(setFriendAction(item));
                  setFriendsIsOpen(false);
                }}
              >
                {peopleTyping[item] ? (
                  <IsTyping>
                    <span></span>
                  </IsTyping>
                ) : null}
                <ProfilePicture
                  src="https://source.unsplash.com/random"
                  alt="profilepic"
                ></ProfilePicture>
                <p>{item}</p>
                <RemoveFriendButton
                  onClick={() => removeRecentlyMessaged(item)}
                >
                  <i className="fas fa-times"></i>
                </RemoveFriendButton>
              </FriendBar>
            ))}
          </RecentlyMessagedList>
        </RecentFriendsWrapper>
      </SideBarContents>
      <ProfileBar>
        <ProfilePicture
          src="https://source.unsplash.com/random"
          alt="profilepic"
        ></ProfilePicture>
        <p>{userInfo.username}</p>
        <ProfileBtns>
          <SettingsBtn onClick={() => setProfileOpen(true)}>
            <i className="fas fa-cog"></i>
          </SettingsBtn>
        </ProfileBtns>
      </ProfileBar>
    </StyledMainContainer>
  );
}
