import React from "react";
import styled from "styled-components";
import { MainContainer } from "Theme/Containers";
import { Logo } from "Theme/Misc";
import { Title } from "./WelcomePage-css";

export default function NoFriendsPage() {
  return (
    <MainContainer>
      <Title>
        <h1>Welcome To</h1>
        <Logo style={{ marginLeft: "15px" }}></Logo>
      </Title>
    </MainContainer>
  );
}
