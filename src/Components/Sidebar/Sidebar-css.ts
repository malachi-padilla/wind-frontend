import styled, { keyframes } from 'styled-components';
import {
  FlexColCenterCenter,
  FlexColCenterStart,
  FlexRowCenterStart,
  MainContainer,
  FlexRowCenterEvenly,
  FlexRowCenterEnd,
  FriendBarTheme,
} from 'Theme/containers';

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
  border-bottom: ${(props) => props.theme.defaultBorderBottom};
  box-shadow: ${(props) => props.theme.defaultBoxShadow};
`;

export const StyledFriendInput = styled.input<{ error: boolean }>`
  border: ${(props) =>
    props.error ? '1px solid #b92d2d' : '1px solid #1b1b1b'};

  background-color: ${(props) => props.theme.tertiaryDarkGrey};
  width: 90%;
  height: 28px;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  color: ${(props) => props.theme.fontColors.offWhite};
  font-size: 14px;
  font-weight: 500px !important;
  &:hover {
    transition: ease-in 200ms;
  }
  &:focus {
    border: ${(props) =>
      props.error ? '1px solid #b92d2d' : '1px solid #7289da'};
  }
`;
export const FriendsTab = styled(FlexRowCenterStart)`
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
    background-color: ${(props) => props.theme.mainGrey};
    color: #fff;
  }
  div {
    margin-right: 1rem;
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
  margin-bottom: 20px;
  :hover {
    color: #fff;
  }
  button {
    color: #aab0bd;
    font-size: 12px;
    position: absolute;
    right: 22.5px;
    transform: rotate(-45deg);
  }
`;

export const FriendBar = styled(FriendBarTheme)`
  justify-content: space-between;
  padding-right: 10px;
`;

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
  color: ${(props) => props.theme.fontColors.defaultMediumGrey};
  font-size: 16px;
  outline: none;
  border: none;
  :hover {
    transition: ease-in 100ms;
    color: ${(props) => props.theme.fontColors.defaultWhite};
  }
`;

export const ProfileBar = styled(FlexRowCenterEvenly)`
  height: 52px;
  padding: 10px;
  background-color: #292b2f;
  color: ${(props) => props.theme.fontColors.defaultWhite};
  button {
    font-size: 16px;
  }
`;

export const ProfileBtns = styled(FlexRowCenterEnd)`
  width: 60%;
  position: relative;
`;

export const SettingsBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  border-radius: 8px;
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  &:hover {
    transition: ease-in 200ms;
    background-color: ${(props) => props.theme.mainGrey};
  }
`;
