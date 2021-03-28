import styled, { css } from "styled-components";
import { PrimaryButton, SecondaryButton } from "Theme/Buttons";
import {
  FlexColCenterStart,
  FlexRowCenterBetween,
  FlexRowCenterCenter,
} from "Theme/Containers";

export const ActionBar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  border-bottom: ${(props) => props.theme.defaultBorderBottom};
  box-shadow: ${(props) => props.theme.defaultBoxShadow};
  top: 0;
  position: absolute;
  padding: 10px;
  gap: 10px;
`;

export const FriendsTab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-right: 1rem;
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
  border-radius: 50%;
  background-color: rgb(230, 71, 71);
  color: #fff;
  position: absolute;
  top: -10px;
  right: -10%;
`;

export const FriendsBtn = styled(SecondaryButton)<{ selected: boolean }>`
  background: ${(props) => (props.selected ? "#5676af" : "#40444b")};
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
  border-top: 1px solid ${(props) => props.theme.messaging.secondaryGrey};
  &:hover {
    background-color: ${(props) => props.theme.messaging.secondaryGrey};
    border-radius: 8px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.fontColors.defaultWhite};
`;

export const Actions = styled.div`
  margin-right: 10%;
`;

export const ButtonStyles = css`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.secondaryDarkGrey};
  color: #aab0bd;
  &:hover {
    transition: ease-in 200ms;
    height: 40px;
    width: 40px;
  }
`;

export const ChatBtn = styled.button`
  ${ButtonStyles}
`;

export const AcceptBtn = styled.button`
  ${ButtonStyles};
  color: #43b581;
`;

export const DenyBtn = styled.button`
  ${ButtonStyles};
  color: rgb(230, 71, 71);
  &:hover {
    color: rgb(230, 71, 71);
  }
`;

export const FriendsTabText = styled.p`
  color: ${(props) => props.theme.fontColors.defaultWhite};
  font-weight: 700;
`;
