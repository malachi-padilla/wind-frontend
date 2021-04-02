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
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "Redux/types";
import {
  setRecentlyMessagedAction,
  setRecipientIsTypingAction,
} from "Redux/actions";

export default function ChatPage({
  userInfo,
  pollingInterval,
  socket,
  fetchUser,
  recipientData,
  loadingRecipientData,
  setLoadingRecipientData,
}: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<SocketPrivateChatMessage[]>([]);
  const name = userInfo.username;
  const dispatch = useDispatch();
  const { recentlyMessaged, friend, recipientIsTyping } = useSelector(
    (state: ReduxStore) => state
  );

  useEffect(() => {
    socket.emit("joinPrivateMessage", { name, friend });
    return () => socket.emit("disconnectPrivateMessage");
  }, []);

  useEffect(() => {
    socket.on("message", (message: SocketPrivateChatMessage) => {
      if (message.sentBy === friend || message.sentBy === name) {
        setMessages((currentMessages) => [...currentMessages, message]);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setRecipientIsTypingAction(false));
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
        dispatch(setRecipientIsTypingAction(isTyping));
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
    const indexOfFriend = recentlyMessaged.indexOf(friend);
    // New variable so we dont modify previous state
    let newRecentlyMessagedList = recentlyMessaged;
    // If this user is already in our recently messaged, splice first
    if (indexOfFriend !== -1) {
      newRecentlyMessagedList.splice(indexOfFriend, 1);
    }
    // Push user to top of stack
    newRecentlyMessagedList = [friend, ...newRecentlyMessagedList];

    // Dispatch new array
    dispatch(setRecentlyMessagedAction(newRecentlyMessagedList));

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
