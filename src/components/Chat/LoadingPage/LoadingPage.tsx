import React from "react";
import inheritedStyles from "../Chat.module.css";
import styles from "./LoadingPage.module.css";

export default function LoadingPage({ propStyles = undefined }: any) {
  return (
    <div
      className={inheritedStyles.MainContainer}
      style={propStyles ? propStyles : undefined}
    >
      <div className={styles.LogoContainer}>
        <div className={inheritedStyles.Logo}></div>
      </div>
      <div className={styles.LoadingContainer}>
        <div className={inheritedStyles.IsTyping}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h2 style={{ color: "#fff" }}>Loading</h2>
      </div>
    </div>
  );
}
