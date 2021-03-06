import styled, { css, keyframes } from 'styled-components';
import {
  FlexColCenterCenter,
  FlexRowCenterCenter,
  FlexRowCenterStart,
} from 'Theme/containers';
export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ActionBar = styled(FlexRowCenterStart)`
  height: 5%;
  border-bottom: ${(props) => props.theme.defaultBorderBottom};
  box-shadow: ${(props) => props.theme.defaultBoxShadow};
  padding: 10px;
`;

export const ChatBody = styled(FlexColCenterCenter)`
  height: 80%;
  margin-top: 30px;
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ChatMessages = styled(FlexColCenterCenter)`
  height: 100%;
  width: 98%;
  overflow-y: scroll;
  justify-content: unset;
  overflow-x: hidden;
`;

export const MessageWrapper = styled.div<{ secondaryMessage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.secondaryMessage ? 'flex-end' : 'flex-start'};
  max-width: 50%;
  align-self: ${(props) =>
    props.secondaryMessage ? 'flex-start' : 'flex-end'};
  padding: 10px;
`;

export const MainMessage = styled.div<{ secondaryMessage: boolean }>`
  display: flex;
  align-items: center;
  word-break: break-all;
  word-wrap: break-word;
  padding: 5px 10px 5px 10px;
  min-height: 30px;
  line-height: 1.5;
  background-color: ${(props) =>
    props.secondaryMessage
      ? props.theme.messaging.secondaryGrey
      : props.theme.messaging.primaryBlue};
  border-radius: 15px;
  color: ${(props) => props.theme.fontColors.defaultWhite};
`;

export const NameLabel = styled.p`
  color: ${(props) => props.theme.fontColors.defaultMediumGrey};
  font-size: 10px;
`;

export const InputWrapper = styled(FlexColCenterCenter)`
  justify-content: flex-end;
  height: 15%;
  z-index: 1;
  p {
    color: ${(props) => props.theme.fontColors.defaultLightGrey};
    align-self: flex-end;
    margin-right: 20px;
    margin-top: 20px;
  }
`;

export const InputContent = styled(FlexRowCenterCenter)`
  display: flex;
  width: 98%;
  align-items: flex-end;
  padding: 10px;
`;

export const EnterMessage = styled.textarea<{ showScrollBar: boolean }>`
  background-color: ${(props) => props.theme.tertiaryGrey};
  width: 100%;
  min-height: 48px;
  line-height: 24px;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${(props) => props.theme.inputBorder};
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  font-size: 16px;
  overflow-y: ${(props) => (props.showScrollBar ? 'scroll' : 'hidden')};
  resize: none;
`;

export const FriendLabel = styled(FlexRowCenterCenter)`
  width: unset;
  justify-content: flex-start;
  color: ${(props) => props.theme.fontColors.defaultLightGrey};
  padding: 5px;
  cursor: pointer;
`;

export const FriendLabelText = styled.h3`
  margin-left: 2px;
  color: ${(props) => props.theme.fontColors.defaultWhite};
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
    background-color: ${(props) => props.theme.fontColors.defaultMediumGrey};
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
  ${IsTypingCSS};
`;
