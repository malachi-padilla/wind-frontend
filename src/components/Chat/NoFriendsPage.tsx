import React from "react";
import inheritedStyles from "./Chat.module.css";

export default function NoFriendsPage() {
  return (
    <div className={inheritedStyles.MainContainer}>
      <div className={inheritedStyles.Title}>
        <h1>Welcome To</h1>
        <div
          className={inheritedStyles.Logo}
          style={{ marginLeft: "15px" }}
        ></div>
      </div>
    </div>
  );
}
