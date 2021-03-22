import React from 'react';
import styles from "../../components/Login/Login.module.css";
import axios from "axios"
import { useState } from "react";

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
    <div className={styles.MainContainer}>
      <div className={styles.Title}>
        <h1>
          WIND <i className="fas fa-wind"></i>
        </h1>
      </div>
      <div className={styles.FormContainer}>
        <div className={styles.Form}>
          <div className={styles.FormTitle}>
            <h1 style={{ marginBottom: "2rem" }}>Welcome To Wind!</h1>

            <h3>We're so excited to have you!</h3>
          </div>
          <div className={styles.FormInputs}>
            <label style={{ fontWeight: 600, fontSize: "12px" }}>
              CREATE A USERNAME
            </label>
            <input
              onChange={(e) => setRegisterUsername(e.target.value)}
              type="text"
              required
            ></input>
            <label style={{ fontWeight: 600, fontSize: "12px" }}>
              CREATE A PASSWORD
            </label>
            <input
              onChange={(e) => setRegisterPassword(e.target.value)}
              type="text"
              required
            ></input>
          </div>
          <div className={styles.FormBtns}>
            <button
              onClick={register}
              className={styles.LoginBtn}
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
