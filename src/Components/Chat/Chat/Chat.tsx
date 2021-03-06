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
  EnterMessage,
  MessageWrapper,
} from "./Chat-css";
import { MainContainer } from "Theme/containers";
import { animateScroll } from "react-scroll";
import FriendButton from "Components/Buttons/FriendButton/FriendButton";
import { getMessagesRequest } from "Api/user";
import {
  SocketPrivateChatMessage,
  SocketIsTypingMessage,
} from "Components/Types/models";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "Redux/types";
import {
  setRecentlyMessagedAction,
  setRecipientIsTypingAction,
} from "Redux/actions";
import FriendModal from "Components/Modals/FriendModal";
import { getProfilePictureByUsernameRequest } from "Api/friends";
const minRows = 1;
const maxRows = 15;
const maxChar = 2000;
export default function ChatPage({
  userInfo,
  pollingInterval,
  socket,
  fetchUser,
  recipientData,
  loadingRecipientData,
  setLoadingRecipientData,
  loadingMessages,
  pushIfNotExist,
  setLoadingMessages,
  LoadingPage,
}: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<SocketPrivateChatMessage[]>([]);
  const [shift, setShift] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [viewFriend, setViewFriend] = useState<boolean>(false);

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
      pushIfNotExist(message.sentBy);
    });
  }, []);

  useEffect(() => {
    dispatch(setRecipientIsTypingAction(false));
    setLoadingRecipientData(true);
    fetchUser();
    setLoadingMessages(true);
    getMessagesRequest(name, friend).then((res) => {
      if (res.data) {
        setMessages(res.data);
        setLoadingMessages(false);
      }
    });

    socket.on("typing", ({ personTyping, isTyping }: SocketIsTypingMessage) => {
      if (personTyping === friend) {
        dispatch(setRecipientIsTypingAction(isTyping));
      }
    });
  }, [friend]);

  // Poll User Information
  useEffect(() => {
    fetchUser();
  }, [pollingInterval]);

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

  if (loadingRecipientData || loadingMessages) {
    return <LoadingPage />;
  }

  const sendMessage = async () => {
    if (currentMessage.trim().length > 0) {
      let indexOfFriend = -1;
      for (let i = 0; i < recentlyMessaged.length; i++) {
        if (recentlyMessaged[i].username === friend) {
          indexOfFriend = i;
        }
      }
      // New variable so we dont modify previous state
      let newRecentlyMessagedList = recentlyMessaged;
      // If this user is already in our recently messaged, splice first
      let profileImage;
      if (indexOfFriend !== -1) {
        profileImage = recentlyMessaged[indexOfFriend].profilePicture;
        newRecentlyMessagedList.splice(indexOfFriend, 1);
      } else {
        const request = await getProfilePictureByUsernameRequest(friend);
        profileImage = request.data;
      }
      // Push user to top of stack
      newRecentlyMessagedList = [
        { username: friend, profilePicture: profileImage },
        ...newRecentlyMessagedList,
      ];

      // Dispatch new array
      dispatch(setRecentlyMessagedAction(newRecentlyMessagedList));

      socket.emit("message", { friend, message: currentMessage });
      setCurrentMessage("");
      setRows(1);
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Shift") {
      setShift(true);
    } else if (e.key == "Enter") {
      if (shift) {
        setCurrentMessage((current) => current + "\r\n");
      } else {
        if (currentMessage.trim().length > 0) {
          sendMessage();
        }
      }
      e.preventDefault();
    }
  };

  const onKeyUp = (e: any) => {
    e.key === "Shift" && setShift(false);
  };

  const getNewlineText = (message: string) => {
    return message.split("\n").map((str, i) => <p key={i}>{str}</p>);
  };

  const handleChange = async (event: any) => {
    const textareaLineHeight = 24;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);

    if (event.target.value.length > maxChar) {
      const cutString = await event.target.value.substring(0, maxChar);
      setCurrentMessage(cutString);
    } else {
      setCurrentMessage(event.target.value);
    }
  };

  return (
    <MainContainer>
      {viewFriend && (
        <FriendModal
          setViewFriend={setViewFriend}
          friend={friend}
          recipientData={recipientData}
          userInfo={userInfo}
        />
      )}
      <ActionBar>
        <FriendLabel>
          <h3>@</h3>
          <FriendLabelText onClick={() => setViewFriend(true)}>
            {friend}
          </FriendLabelText>
          <FriendButton
            recipientId={recipientData!.userId}
            relation={recipientData!.relation}
          />
        </FriendLabel>
      </ActionBar>

      <ChatBody>
        <ChatMessages id="ContainerElementID">
          {messages.map((item, index) => (
            <>
              <MessageWrapper
                key={index}
                secondaryMessage={item.sentBy === name ? false : true}
              >
                <MainMessage
                  secondaryMessage={item.sentBy === name ? false : true}
                >
                  {getNewlineText(item.message)}
                </MainMessage>
              </MessageWrapper>
            </>
          ))}
          {recipientIsTyping ? (
            <MessageWrapper secondaryMessage>
              <IsTypingMessage secondaryMessage>
                <span></span>
                <span></span>
                <span></span>
              </IsTypingMessage>
            </MessageWrapper>
          ) : null}
        </ChatMessages>
      </ChatBody>

      <InputWrapper>
        <InputContent>
          <EnterMessage
            rows={rows}
            showScrollBar={rows === maxRows}
            value={currentMessage}
            onChange={handleChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            placeholder={`message @${friend}`}
          />
        </InputContent>
        {currentMessage.length > 1500 && (
          <p>{maxChar - currentMessage.length}</p>
        )}
      </InputWrapper>
    </MainContainer>
  );
}
