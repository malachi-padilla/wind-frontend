import React from "react";
import { Logo } from "Theme/Misc";
import { IsTyping } from "../Chat-css";
import { LoadingContainer, LogoContainer } from "./LoadingPage-css";
import { MainContainer } from "Theme/Containers";

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
