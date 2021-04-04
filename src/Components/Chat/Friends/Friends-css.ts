import styled, { css } from "styled-components";
import { PrimaryButton, SecondaryButton } from "Theme/buttons";
import {
  FlexColCenterStart,
  FlexRowCenterBetween,
  FlexRowCenterCenter,
} from "Theme/containers";

export const ActionBar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.mainGrey};
  border-bottom: ${(props) => props.theme.defaultBorderBottom};
  box-shadow: ${(props) => props.theme.defaultBoxShadow};
  top: 0;
  position: absolute;
  padding: 10px;
  gap: 10px;
  z-index: 10;
`;

export const FriendsTab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-right: 1rem;
  color: ${(props) => props.theme.messaging.secondaryGrey};
  border-right: 1px solid ${(props) => props.theme.mediumGray};
`;

export const ActionBarBtns = styled.div`
  display: flex;
  width: 50%;
  gap: 20px;
`;

export const Notification = styled(FlexRowCenterCenter)`
  padding: 2px;
  height: 20px;
  width: 20px;
  box-shadow: ${(props) => props.theme.defaultBoxShadow};
  border-radius: 50%;
  background-color: ${(props) => props.theme.fontColors.importantRed};
  color: ${(props) => props.theme.fontColors.defaultWhite};
  position: absolute;
  top: -10px;
  right: -15%;
`;

export const FriendsBtn = styled(SecondaryButton)<{ selected: boolean }>`
  background: ${(props) =>
    props.selected
      ? props.theme.messaging.primaryBlue
      : props.theme.tertiaryGrey};
`;

export const AddBtn = styled(PrimaryButton)``;

export const RequestBtnContents = styled(FlexRowCenterCenter)`
  height: unset;
  width: unset;
  gap: 10px;
  position: relative;
`;

export const FriendsList = styled(FlexColCenterStart)`
  height: 80%;
  margin-top: 30px;
  gap: 20px;
`;

export const FriendBar = styled(FlexRowCenterBetween)`
  height: 62px;
  width: 90%;
  border-top: 1px solid ${(props) => props.theme.tertiaryGrey};
  padding: 10px;

  &:hover {
    background-color: ${(props) => props.theme.tertiaryGrey};
    border-radius: 8px;
    border-top: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.fontColors.defaultWhite};
`;

export const Actions = styled.div`
  display: flex;
  gap: 5px;
`;

export const ButtonStyles = css`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.secondaryDarkGrey};
  color: ${(props) => props.theme.fontColors.offWhite};
`;

export const ChatBtn = styled.button`
  ${ButtonStyles}
`;

export const MoreBtn = styled.button`
  ${ButtonStyles}
`;

export const AcceptBtn = styled.button`
  ${ButtonStyles};
  color: ${(props) => props.theme.fontColors.actionGreen};
`;

export const DenyBtn = styled.button`
  ${ButtonStyles};
  color: ${(props) => props.theme.fontColors.importantRed};
`;

export const FriendsTabText = styled.p`
  color: ${(props) => props.theme.fontColors.defaultWhite};
  font-weight: 700;
`;

export const AddFriendContainer = styled(FlexColCenterStart)``;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  height: 5%;
  width: 90%;
  margin-left: 10%;
  margin-bottom: 50px;
  color: ${(props) => props.theme.fontColors.defaultWhite};
  font-weight: 700;
  p {
    color: ${(props) => props.theme.fontColors.importantRed};
    font-weight: 300;
    font-size: 16px;
  }
`;

export const InputContent = styled(FlexRowCenterCenter)`
  align-items: flex-start;
  height: 25%;
  width: 80%;
`;

export const AddFriendInput = styled.input<{ error: boolean }>`
  background-color: ${(props) => props.theme.tertiaryGrey};
  width: 100%;
  height: 52px;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${(props) => props.theme.inputBorder};
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  font-size: 16px;
  &:hover {
    transition: ease-in 200ms;
  }
  &:focus {
    border: ${(props) =>
      props.error ? "1px solid #b92d2d" : "1px solid #7289da"};
  }
`;
