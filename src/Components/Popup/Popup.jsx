import React, { useState } from "react";
import styles from "./Popup.module.css";

export const Popup = ({ isOpen, togglePopup, children }) => {
  const closePopup = () => {
    togglePopup(false);
  };

  return (
    <div className={`${styles.popup} ${isOpen ? styles.open : ""}`}>
      <div className={styles.overlay} onClick={closePopup} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
