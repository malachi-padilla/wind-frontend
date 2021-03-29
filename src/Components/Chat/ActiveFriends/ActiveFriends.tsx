import React, { useEffect, useState } from "react";
import { getMinutesLastOnline } from "Util/utilFunctions";
import {
  ActiveUsersContainer,
  ActiveUsersList,
  LonelyWrapper,
  MainContainer,
  Title,
  Text,
  ActiveUser,
  Subheading,
  OnlineIndicator,
} from "./ActiveFriends-css";

export default function ActiveFriends({ friendsList }) {
  const [activeUsers, setActiveUsers] = useState<any>([]);
  useEffect(() => {
    setActiveUsers(
      friendsList.filter((item) => {
        return getMinutesLastOnline(item.lastOnline) < 10;
      })
    );
  }, [friendsList]);

  return (
    <MainContainer>
      <Title>
        <h4>ACTIVE NOW</h4>
      </Title>
      <ActiveUsersContainer>
        {activeUsers.length < 1 ? (
          <LonelyWrapper>
            <Subheading>It's quiet for now...</Subheading>
            <Text>
              When a friend starts an activity, like chatting with someone,
              we'll show it here!
            </Text>
          </LonelyWrapper>
        ) : (
          <ActiveUsersList>
            {activeUsers.map((item, index) => (
              <ActiveUser key={index}>
                <OnlineIndicator>
                  <span></span>
                </OnlineIndicator>
                <p>{item.username}</p>
              </ActiveUser>
            ))}
          </ActiveUsersList>
        )}
      </ActiveUsersContainer>
    </MainContainer>
  );
}
