import React from "react";
import { MainContainer } from "Theme/containers";
import { StyledLogo, Title } from "./WelcomePage-css";

export default function NoFriendsPage() {
  return (
    <MainContainer>
      <Title>
        <h1>Welcome To</h1>
        <StyledLogo />
      </Title>
    </MainContainer>
  );
}
