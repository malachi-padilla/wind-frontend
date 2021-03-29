import { ChatProps } from "Components/Types/props";
import React, { useEffect, useState } from "react";
import {
  ActionBar,
  ChatBody,
  ChatMessages,
  IsTypingMessage,
  InputContent,
  InputWrapper,
  MainMessage,
  FriendLabel,
  FriendLabelText,
} from "./Chat-css";
import { MainContainer } from "Theme/containers";
import { animateScroll } from "react-scroll";
import FriendButton from "../Buttons/FriendButton/FriendButton";
import LoadingPage from "./LoadingPage/LoadingPage";
import { getMessagesRequest, getUserByUsernameRequest } from "Api/user";
import {
  SocketPrivateChatMessage,
  SocketIsTypingMessage,
} from "Components/Types/models";
import { RecipientUserInfo } from "Types/models";

export default function ChatPage({
  friend,
  userInfo,
  setRecipientIsTyping,
  recipientIsTyping,
  pollingInterval,
  socket,
}: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<SocketPrivateChatMessage[]>([]);
  const [recipientData, setRecipientData] = useState<RecipientUserInfo>();
  const [loadingRecipientData, setLoadingRecipientData] = useState<boolean>(
    true
  );
  const name = userInfo.username;

  console.log(messages);

  useEffect(() => {
    socket.emit("join", { name, friend });
    socket.on("message", (message: SocketPrivateChatMessage) => {
      setMessages((currentMessages) => [...currentMessages, message]);
    });
  }, []);

  const fetchUser = () => {
    return getUserByUsernameRequest(friend).then((res) => {
      setRecipientData(res.data);
      setLoadingRecipientData(false);
    });
  };

  useEffect(() => {
    setRecipientIsTyping(false);
    setLoadingRecipientData(true);
    fetchUser();
  }, [friend]);

  // Poll User Information
  useEffect(() => {
    fetchUser();
  }, [pollingInterval]);

  useEffect(() => {
    getMessagesRequest(name, friend).then((res) => {
      if (res.data) {
        setMessages(res.data);
      }
    });

    socket.on("typing", ({ personTyping, isTyping }: SocketIsTypingMessage) => {
      if (personTyping === friend) {
        setRecipientIsTyping(isTyping);
      }
    });
  }, [friend]);

  useEffect(() => {
    if (currentMessage!.length > 0) {
      socket.emit("typing", { friend, isTyping: true });
    } else {
      socket.emit("typing", { friend, isTyping: false });
    }
  }, [currentMessage]);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "ContainerElementID",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, recipientIsTyping, currentMessage]);

  if (loadingRecipientData) {
    return <LoadingPage />;
  }

  const sendMessage = () => {
    socket.emit("message", { friend, message: currentMessage });
    setCurrentMessage("");
  };

  return (
    <MainContainer>
      <ActionBar>
        <FriendLabel>
          <h3>@</h3>
          <FriendLabelText>{friend}</FriendLabelText>
          <FriendButton
            fetchUser={fetchUser}
            recipientId={recipientData!.userId}
            relation={recipientData!.relation}
          />
        </FriendLabel>
      </ActionBar>

      <ChatBody>
        <ChatMessages id="ContainerElementID">
          {messages.map((item) => (
            <>
              <MainMessage
                secondaryMessage={item.sentBy === name ? false : true}
              >
                {item.message}
              </MainMessage>
            </>
          ))}
          {recipientIsTyping ? (
            <IsTypingMessage secondaryMessage>
              <span></span>
              <span></span>
              <span></span>
            </IsTypingMessage>
          ) : null}
        </ChatMessages>
      </ChatBody>

      <InputWrapper>
        <InputContent>
          <input
            value={currentMessage}
            onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
            placeholder={`message @${friend}`}
            onChange={(e: any) => setCurrentMessage(e.target.value)}
          ></input>
        </InputContent>
      </InputWrapper>
    </MainContainer>
  );
}
