import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Whitney, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
  button {
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
  }
  button:hover {
    opacity: 0.9;
  }

  &::-webkit-scrollbar {
    background-color: ${(props) => props.theme.secondaryDarkGrey};
    width: 7px;

  }

  &::-webkit-scrollbar-button {
    background-color: transparent;

  }

  &::-webkit-scrollbar-track {
    background-color: transparent;

  }

  &::-webkit-scrollbar-track-piece {
    background-color: transparent;

  }

  &::-webkit-scrollbar-thumb {
    background-color: #27292e;
    border-radius: 3rem;
    height: 5px;
  }
`;
