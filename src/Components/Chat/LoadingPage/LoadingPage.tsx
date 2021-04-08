import React from "react";
import { Logo } from "Theme/misc";
import { LoadingContainer, LogoContainer } from "./LoadingPage-css";
import { MainContainer } from "Theme/containers";
import styled, { css, keyframes } from "styled-components";

export default function LoadingPage({ propStyles = undefined }: any) {
  const loadingFade = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 0.8;
}
100% {
  opacity: 0;
}
`;

  const IsTypingCSS = css`
    will-change: transform;
    span {
      height: 10px;
      width: 10px;
      float: left;
      margin: 0 1px;
      background-color: ${(props) => props.theme.fontColors.defaultMediumGrey};
      display: block;
      border-radius: 50%;
      opacity: 0.4;
      animation: ${loadingFade} 1s infinite;
    }
    span:nth-of-type(1) {
      animation-delay: 0s;
    }
    span:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    span:nth-of-type(3) {
      animation-delay: 0.4s;
    }
  `;

  const IsTyping = styled.div`
    ${IsTypingCSS}
  `;

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
