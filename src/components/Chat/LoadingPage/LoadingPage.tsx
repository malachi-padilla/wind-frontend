import React from "react";
import { Logo } from "Theme/misc";
import { IsTyping } from "../chat-css";
import { LoadingContainer, LogoContainer } from "./LoadingPage-css";
import { MainContainer } from "Theme/containers";

export default function LoadingPage({ propStyles = undefined }: any) {
  return (
    <MainContainer style={propStyles ? propStyles : undefined}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <LoadingContainer>
        <IsTyping>
          <span></span>
          <span></span>
          <span></span>
        </IsTyping>
        <h2>Loading</h2>
      </LoadingContainer>
    </MainContainer>
  );
}
