import styled from "styled-components";
import { SecondaryButton } from "Theme/buttons";
import { UserInfo } from "../Friends/Friends-css";
import {
  FlexColCenterCenter,
  FlexRowCenterBetween,
  FlexRowCenterCenter,
  FriendBarTheme,
  MainContainer,
} from "Theme/containers";

export const ProfilePageWrapper = styled(FlexRowCenterCenter)`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  color: ${(props) => props.theme.tertiaryDarkGrey};
  position: relative;
`;

export const Sidebar = styled(MainContainer)`
  width: 40%;
  background: ${(props) => props.theme.secondaryDarkGrey};
  color: ${(props) => props.theme.tertiaryDarkGrey};
  align-items: flex-end;
  padding: 10px;
`;

export const SettingsWrapper = styled(FlexColCenterCenter)`
  height: 90%;
  width: 30%;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Heading = styled.p`
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const SettingsBar = styled(FriendBarTheme)`
  margin-top: unset;
  background-color: unset;
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  margin-bottom: 10px;
`;

export const LogoutBtn = styled(SecondaryButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding-left: 12px;
  font-size: 16px;
  width: 100%;
  min-height: 40px;
  border-radius: 4px;
  border-top: 1px solid ${(props) => props.theme.tertiaryGrey};
  background-color: transparent;
  color: ${(props) => props.theme.fontColors.importantRed};
  :hover {
    transition: ease-in 200ms;
    background-color: rgba(240, 71, 71, 0.1);
    border: none;
  }
`;

export const ProfileBody = styled(MainContainer)`
  width: 40%;
  padding: 10px;
`;

export const ContentWrapper = styled(FlexColCenterCenter)`
  height: 90%;
  justify-content: flex-start;
`;

export const InfoWrapper = styled(FlexColCenterCenter)`
  justify-content: flex-start;
`;

export const Title = styled.h3`
  align-self: flex-start;
  margin-left: 40px;
  margin-bottom: 20px;
`;

export const InfoBox = styled(FlexColCenterCenter)`
  background: ${(props) => props.theme.secondaryDarkGrey};
  height: 30%;
  width: 90%;
  border-radius: 8px;
  padding: 1rem;
`;
export const AvatarBar = styled(FlexRowCenterBetween)``;
export const UserInfoWrapper = styled(UserInfo)`
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
export const ProfileImg = styled(FlexColCenterCenter)`
  background-image: url("https://source.unsplash.com/random");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
    border-radius: 50%;
    visibility: hidden;
    font-size: 14px;
    font-weight: 600;
  }
  :hover span {
    visibility: visible;
  }
`;

export const ImageLabel = styled(FlexColCenterCenter)`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #dcddde;
  color: ${(props) => props.theme.messaging.secondaryGrey};
  position: absolute;
  top: -5px;
  left: 45px;
`;

export const InfoCard = styled(FlexColCenterCenter)`
  background-color: ${(props) => props.theme.mainGrey};
  border-radius: 8px;
`;
export const InfoBar = styled(FlexRowCenterBetween)`
  padding: 10px;
  margin-bottom: 10px;
`;

export const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const EditBtn = styled(SecondaryButton)`
  background-color: #747f8d;
  min-width: 60px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
`;

export const EscapeBar = styled(MainContainer)`
  width: 20%;
`;
export const EscapeBarContents = styled(FlexColCenterCenter)`
  height: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  gap: 5px;
  p {
    color: ${(props) => props.theme.messaging.secondaryGrey};
    font-size: 12px;
  }
`;

export const EscapeBtn = styled(SecondaryButton)`
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: none;
  border: 2px solid ${(props) => props.theme.messaging.secondaryGrey};
  :hover {
    background-color: ${(props) => props.theme.messaging.secondaryGrey};
  }
`;
