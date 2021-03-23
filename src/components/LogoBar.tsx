import React from "react";
import styles from "./LogoBar.module.css";

export default function LogoBar() {
  return (
    <div className={styles.LogoBar}>
      <h1>
        WIND <i className="fas fa-wind"></i>
      </h1>
    </div>
  );
}
