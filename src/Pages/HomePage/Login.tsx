import React from "react";
import styles from "../../components/Login/Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/login",
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/chat";
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
            <h1 style={{ marginBottom: "2rem" }}>Welcome Back!</h1>

            <h3>We're so excited to see you again!</h3>
          </div>
          <div className={styles.FormInputs}>
            <label style={{ fontWeight: 600, fontSize: "12px" }}>
              USERNAME
            </label>
            <input
              onChange={(e) => setLoginUsername(e.target.value)}
              type="text"
              required
            ></input>
            <label style={{ fontWeight: 600, fontSize: "12px" }}>
              PASSWORD
            </label>
            <input
              onKeyDown={(e) => (e.key === "Enter" ? login() : null)}
              onChange={(e) => setLoginPassword(e.target.value)}
              type="text"
              required
            ></input>
          </div>
          <div className={styles.FormBtns}>
            <button onClick={login} className={styles.LoginBtn} type="submit">
              Login
            </button>
            <p>
              <Link to="register" style={{ color: "#7289da" }}>
                don't have an acount?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
