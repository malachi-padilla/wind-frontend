import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Logo } from "Theme/Misc";
import {
  FormBtns,
  FormContainer,
  FormInputs,
  FormTitle,
  StyledMainContainer,
} from "./Login-css";
import { loginRequest } from "Api/user";

export default function App() {
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const login = () => {
    loginRequest(loginUsername, loginPassword).then((res) => {
      if (res.status === 200) {
        window.location.href = "/chat";
      }
    });
  };

  return (
    <StyledMainContainer>
      <Logo />
      <FormContainer>
        <div>
          <FormTitle>
            <h1 style={{ marginBottom: "2rem" }}>Welcome Back!</h1>

            <h3>We're so excited to see you again!</h3>
          </FormTitle>
          <FormInputs>
            <label>USERNAME</label>
            <input
              onChange={(e) => setLoginUsername(e.target.value)}
              type="text"
              required
            ></input>
            <label>PASSWORD</label>
            <input
              onKeyDown={(e) => (e.key === "Enter" ? login() : null)}
              onChange={(e) => setLoginPassword(e.target.value)}
              type="password"
              required
            ></input>
          </FormInputs>

          <FormBtns>
            <button onClick={login} type="submit">
              Login
            </button>
            <p>
              <Link to="register" style={{ color: "#7289da" }}>
                don't have an acount?
              </Link>
            </p>
          </FormBtns>
        </div>
      </FormContainer>
      <div></div>
    </StyledMainContainer>
  );
}