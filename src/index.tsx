import Context from "./Context";
import React from "react";
import ReactDOM from "react-dom";
import Routes from "Routes";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <Routes />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
