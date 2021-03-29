import Context from "./Context";
import React from "react";
import ReactDOM from "react-dom";
import Routes from "Routes";
import "./globalStyles.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "Theme/theme";
import { GlobalStyle } from "globalStyles";
import store from "Redux/mainStore";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </Provider>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
