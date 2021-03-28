import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormBtns,
  FormContainer,
  FormInputs,
  FormTitle,
  StyledMainContainer,
} from "Pages/Login/Login-css";
import { Logo } from "Theme/Misc";

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/register",
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/";
      }
    });
  };
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
            <input
              onKeyDown={(e) => (e.key === "Enter" ? register() : null)}
              onChange={(e) => setRegisterUsername(e.target.value)}
              type="text"
              required
            ></input>
            <label>CREATE A PASSWORD</label>
            <input
              onChange={(e) => setRegisterPassword(e.target.value)}
              type="password"
              required
            ></input>
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
