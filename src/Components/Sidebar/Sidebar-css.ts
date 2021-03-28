import styled, { keyframes } from "styled-components";
import {
  FlexColCenterCenter,
  FlexColCenterStart,
  FlexRowCenterStart,
  MainContainer,
  FlexRowCenterEvenly,
  FlexRowCenterEnd,
  FriendBarTheme,
} from "Theme/Containers";
import { SecondaryButton } from "Theme/Buttons";

export const StyledMainContainer = styled(MainContainer)`
  width: 224px;
  background: #2f3136;
`;
export const SideBarContents = styled(FlexColCenterCenter)`
  justify-content: unset;
`;
export const RecentFriendsWrapper = styled(FlexColCenterStart)`
  height: 80%;
`;
export const RecentlyMessagedList = styled(FlexColCenterStart)`
  overflow-y: scroll;
  width: 95%;
  height: unset;
`;

export const EnterFriendWrapper = styled(FlexColCenterCenter)`
  height: 48px;
  line-height: 24px;
  border-bottom: 1px solid #202225;
  box-shadow: 1px 1px 10px #2022255b;
`;

export const StyledFriendInput = styled.input<{ error: boolean }>`
  border: ${(props) =>
    props.error ? "1px solid #b92d2d" : "1px solid #1b1b1b"};

  background-color: #202225;
  width: 90%;
  height: 28px;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  color: #dcddde;
  font-size: 14px;
  font-weight: 500px !important;
  &:hover {
    transition: ease-in 200ms;
  }
  &:focus {
    border: ${(props) =>
      props.error ? "1px solid #b92d2d" : "1px solid #7289da"};
  }
`;
export const FriendsTab = styled(FlexRowCenterStart)`
  gap: 10%;
  background-color: transparent;
  width: 90%;
  height: 42px;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 16px;
  color: #888e9b;
  cursor: pointer;
  margin-top: 20px;
  :hover {
    background-color: #36393f;
    color: #fff;
  }
`;

export const DirectMessageTab = styled(FlexRowCenterStart)`
  height: 40px;
  width: 100%;
  font-size: 11px;
  padding: 18px 8px 4px 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColors.defaultMediumGrey};
  position: relative;
  :hover {
    color: #fff;
  }
  button {
    color: #aab0bd;
    font-size: 25px;
    position: absolute;
    right: 30px;
  }
`;

export const FriendBar = styled(FriendBarTheme)``;

export const loadingFade = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`;

export const IsTyping = styled.div`
  will-change: transform;
  span {
    height: 10px;
    width: 10px;
    float: left;
    margin-right: 5px;
    background-color: ${(props) => props.theme.fontColors.actionGreen};
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    animation: ${loadingFade} 1s infinite;
  }
`;

export const RemoveFriendButton = styled.button`
  background: none;
  color: #888e9b;
  font-size: 16px;
  outline: none;
  border: none;
  position: absolute;
  right: 10px;
  :hover {
    transition: ease-in 100ms;
    color: #fff;
  }
`;

export const ProfileBar = styled(FlexRowCenterEvenly)`
  height: 52px;
  background-color: #292b2f;
  color: #fff;
  button {
    font-size: 16px;
  }
`;

export const ProfileBtns = styled(FlexRowCenterEnd)`
  width: 60%;
`;

export const SettingsBtn = styled.button`
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
`;

export const LogoutBtn = styled(SecondaryButton)`
  background-color: transparent;
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  :hover {
    transition: ease-in 200ms;
    color: ${(props) => props.theme.fontColors.importantRed};
  }
`;
