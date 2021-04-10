import { AvatarBar } from "Components/Chat/Profile/Profile-css";
import styled from "styled-components";
import { FlexColCenterCenter, FlexRowCenterStart } from "Theme/containers";

export const FriendBox = styled(FlexColCenterCenter)`
  justify-content: flex-start;
  width: 550px;
  max-height: 440px;
  background-color: ${(props) => props.theme.mainGrey};
  color: ${(props) => props.theme.messaging.secondaryGrey};
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
`;

export const FriendBoxTop = styled(AvatarBar)`
  height: 30%;
  background-color: ${(props) => props.theme.tertiaryDarkGrey};
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.mainGrey};
`;

export const FriendNav = styled(FlexRowCenterStart)`
  height: 20%;
  background-color: ${(props) => props.theme.tertiaryDarkGrey};
  padding-left: 10px;
`;

export const NavOpts = styled(FlexColCenterCenter)`
  width: fit-content;
  border-bottom: 2px solid ${(props) => props.theme.fontColors.defaultWhite};
  color: ${(props) => props.theme.fontColors.offWhite};
  font-size: 14px;
`;

export const MutualFriends = styled(FlexColCenterCenter)`
  overflow: auto;
`;
