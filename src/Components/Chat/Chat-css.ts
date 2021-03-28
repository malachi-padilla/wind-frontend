import styled, { css, keyframes } from "styled-components";
import {
  FlexColCenterCenter,
  FlexRowCenterCenter,
  FlexRowCenterStart,
} from "Theme/Containers";
export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ActionBar = styled(FlexRowCenterStart)`
  height: 48px;
  position: absolute;
  top: 0;
  border-bottom: ${(props) => props.theme.defaultBorderBottom};
  box-shadow: ${(props) => props.theme.defaultBoxShadow};
  padding-left: 10px;
`;

export const ChatBody = styled(FlexColCenterCenter)`
  height: 85%;
  margin-top: 30px;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const MainMessage = styled.div<{ secondaryMessage: boolean }>`
  max-width: 50%;
  word-break: break-all;
  word-wrap: break-word;
  padding: 10px;
  background-color: ${(props) =>
    props.secondaryMessage
      ? props.theme.messaging.secondaryGrey
      : props.theme.messaging.primaryBlue};
  border-radius: 30px;
  color: ${(props) => props.theme.fontColors.defaultWhite};
  margin-bottom: ${(props) => (props.secondaryMessage ? "20px" : "8px")};
  align-self: ${(props) =>
    props.secondaryMessage ? "flex-start" : "flex-end"};
  margin-right: 20px;
`;

export const InputContent = styled(FlexRowCenterCenter)`
  display: flex;
  width: 80%;
  margin-top: 20px;
  input {
    background-color: ${(props) => props.theme.tertiaryGrey};
    width: 100%;
    height: 48px;
    padding: 10px;
    outline: none;
    box-sizing: border-box;
    border-radius: 8px;
    border: ${(props) => props.theme.inputBorder};
    color: ${(props) => props.theme.fontColors.defaultLightGrey};
    font-size: 16px;
  }
`;

export const FriendLabel = styled(FlexRowCenterCenter)`
  width: unset;
  justify-content: flex-start;
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  padding: 5px;
`;

export const FriendLabelText = styled.h3`
  margin-left: 2px;
  color: ${(props) => props.theme.fontColors.defaultWhite};
`;

export const InputWrapper = styled(FlexColCenterCenter)`
  height: 10%;
`;

export const ChatMessages = styled(FlexColCenterCenter)`
  height: 95%;
  width: 80%;
  justify-content: unset;
  overflow-y: scroll;
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
export const IsTypingCSS = css`
  will-change: transform;
  span {
    height: 10px;
    width: 10px;
    float: left;
    margin: 0 1px;
    background-color: #9e9ea1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    animation: ${loadingFade} 1s infinite;
  }
  span:nth-of-type(1) {
    animation-delay: 0s;
  }
  span:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  span:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;

export const IsTyping = styled.div`
  ${IsTypingCSS}
`;

export const IsTypingMessage = styled(MainMessage)`
  ${IsTypingCSS}
`;
