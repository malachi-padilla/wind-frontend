import React, { useContext } from "react";
import Login from "./Pages/HomePage/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "Pages/Register/Register";
import ChatPage from "Pages/ChatPage/ChatPage";
import { MyContext } from "Context";

export default function Routes() {
  const user = useContext(MyContext);
  console.log(user);

  return (
    <BrowserRouter>
      <Switch>
        {!user ? (
          <>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
          </>
        ) : (
          <Route path="/chat" component={ChatPage} />
        )}
      </Switch>
    </BrowserRouter>
  );
}
