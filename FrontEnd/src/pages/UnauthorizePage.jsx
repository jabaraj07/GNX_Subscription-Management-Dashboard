import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/UnauthorizePage.module.css";

const UnauthorizePage = () => {
  const navigate = useNavigate();

  const handleLoginAgain = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="container">
      <div className={styles.card}>
        <h1 className={styles.code}>401</h1>
        <p className={styles.message}>Unauthorized</p>
        <button className={styles.button} onClick={handleLoginAgain}>
          Login Again
        </button>
      </div>
    </div>
  );
};

export default UnauthorizePage;