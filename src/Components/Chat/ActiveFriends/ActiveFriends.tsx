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
} from "./ActiveFriends-css";

export default function ActiveFriends({ friendsList }) {
  const [activeUsers, setActiveUsers] = useState<any>([]);
  useEffect(() => {
    setActiveUsers(
      friendsList.filter((item) => {
        return getMinutesLastOnline(item.lastOnline) > 10;
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
                <h1>{item.username}</h1>
              </ActiveUser>
            ))}
          </ActiveUsersList>
        )}
      </ActiveUsersContainer>
    </MainContainer>
  );
}
