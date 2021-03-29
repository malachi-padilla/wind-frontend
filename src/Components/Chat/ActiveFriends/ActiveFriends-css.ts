import styled from "styled-components";
import {
  FlexColCenterCenter,
  FlexColCenterStart,
  FriendBarTheme,
} from "Theme/containers";

export const MainContainer = styled(FlexColCenterCenter)`
  width: 20%;
  background-color: ${(props) => props.theme.secondaryDarkGrey};
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const Subheading = styled.h4`
  color: ${(props) => props.theme.fontColors.defaultWhite};
  margin-bottom: "10px";
`;

export const Text = styled.p`
  color: ${(props) => props.theme.fontColors.defaultMediumGrey};
`;

export const Title = styled.div`
  display: flex;
  margin-top: 90px;
  font-size: 12px;
  margin-bottom: 40px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const ActiveUsersContainer = styled(FlexColCenterStart)`
  width: 90%;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const LonelyWrapper = styled(FlexColCenterCenter)`
  height: fit-content;
  padding: 20px;
  background-color: ${(props) => props.theme.mainGrey};
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const OnlineIndicator = styled.div`
  span {
    height: 10px;
    width: 10px;
    float: left;
    margin-right: 10px;
    background-color: ${(props) => props.theme.fontColors.actionGreen};
    display: block;
    border-radius: 50%;
  }
`;

export const ActiveUsersList = styled(FlexColCenterStart)``;
export const ActiveUser = styled(FriendBarTheme)``;
