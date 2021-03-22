import React from 'react'
import styles from "./profileModal.module.css";

export default function ProfileModal() {
    return (
        <div className={styles.MainContainer}>
            <div className={styles.SideBar}></div>
            <div className={styles.ProfileContents}></div>
        </div>
    )
}
