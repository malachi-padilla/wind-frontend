import Context from "./Context";
import React from "react";
import ReactDOM from "react-dom";
import Routes from "Routes";
import "./globalStyles.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "Theme/Theme";
import { GlobalStyle } from "globalStyles";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
