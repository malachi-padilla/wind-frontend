import React, { useState } from "react";
import styles from "./Login.module.css";

export default function Login({ setInChatRoom, setName, setFriend }) {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.Title}>
        <h1>
          DEV-CHAT <i className="fas fa-headset"></i>
        </h1>
      </div>
      <div className={styles.FormContainer}>
        <div className={styles.Form}>
          <div className={styles.FormTitle}>
            <h1 style={{ marginBottom: "2rem" }}>Welcome Back!</h1>

            <h3>We're so excited to see you again!</h3>
          </div>
          <div className={styles.FormInputs}>
            <label style={{ fontWeight: "600", fontSize: "12px" }}>
              ENTER YOUR NAME
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            ></input>
            <label style={{ fontWeight: "600", fontSize: "12px" }}>
              ENTER A FRIEND
            </label>
            <input
              onChange={(e) => setFriend(e.target.value)}
              type="text"
              required
            ></input>
          </div>
          <div className={styles.FormBtns}>
            <button
              onClick={() => setInChatRoom(true)}
              className={styles.LoginBtn}
              type="submit"
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
