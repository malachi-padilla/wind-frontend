import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormBtns,
  FormContainer,
  FormInputs,
  FormTitle,
  LoginInput,
  StyledMainContainer,
} from "Pages/Login/Login-css";
import { registerRequest } from "Api/user";
import { Logo } from "Theme/misc";

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const register = () => {
    if (registerUsername.length > 2 && registerPassword.length >= 4) {
      registerRequest(registerUsername, registerPassword).then((res) => {
        if (res.status === 200) {
          window.location.href = "/";
        }
      });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
  }, []);

  return (
    <StyledMainContainer>
      <Logo />
      <FormContainer>
        <div>
          <FormTitle>
            <h1 style={{ marginBottom: "2rem" }}>Welcome To Wind!</h1>

            <h3>We're so excited to have you!</h3>
          </FormTitle>
          <FormInputs>
            <label>CREATE A USERNAME</label>
            <LoginInput
              error={error}
              onKeyDown={(e) => (e.key === "Enter" ? register() : null)}
              onChange={(e) => setRegisterUsername(e.target.value)}
              type="text"
              required
            />

            <label>CREATE A PASSWORD</label>
            <LoginInput
              error={error}
              onChange={(e) => setRegisterPassword(e.target.value)}
              type="password"
              required
              style={error ? { borderColor: "red" } : undefined}
            />
          </FormInputs>
          <FormBtns>
            <button onClick={register} type="submit">
              Sign Up
            </button>
            <p>
              <Link to="/" style={{ color: "#7289da" }}>
                Already have a account?
              </Link>
            </p>
          </FormBtns>
        </div>
      </FormContainer>
    </StyledMainContainer>
  );
}
