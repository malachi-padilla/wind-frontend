import React from "react";
import styled from "styled-components";
import { MainContainer } from "Theme/Containers";
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