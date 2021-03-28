import React, { useContext } from "react";
import Login from "./Pages/HomePage/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from "Pages/Register/Register";
import ChatPage from "Pages/ChatPage/ChatPage";
import { MyContext } from "Context";

export default function Routes() {
  const { user } = useContext(MyContext);
  if (user === null) {
    return null;
  }
  return (
    <BrowserRouter>
      <Switch>
        {!user ? (
          <>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Redirect to="/chat" />
            </Route>
            <Route path="/chat" component={ChatPage} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
