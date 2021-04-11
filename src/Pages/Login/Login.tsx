import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from "Theme/misc";
import {
  FormBtns,
  FormContainer,
  FormInputs,
  FormTitle,
  InputLabel,
  LoginInput,
  PasswordInput,
  StyledMainContainer,
} from "./Login-css";
import { loginRequest } from "Api/user";
import { AxiosError } from "axios";

export default function App() {
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = () => {
    loginRequest(loginUsername, loginPassword)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/";
        }
      })
      .catch((err: AxiosError) => setError(err!.response!.data));
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
            <InputLabel error={error}>
              {error === "bad-username" || error === "bad-password"
                ? "USERNAME-invalid username or password"
                : "USERNAME"}
            </InputLabel>
            <LoginInput
              error={error}
              onChange={(e) => setLoginUsername(e.target.value)}
              type="text"
              required
            />
            <InputLabel error={error}>
              {error === "bad-password" || error === "bad-username"
                ? "PASSWORD-invalid password or username"
                : "PASSWORD"}
            </InputLabel>
            <PasswordInput
              error={error}
              onKeyDown={(e) => (e.key === "Enter" ? login() : null)}
              onChange={(e) => setLoginPassword(e.target.value)}
              type="password"
              required
            />
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
