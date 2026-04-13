import React from "react";
import useAuthStore from "../store/authStore";
import Navbar from "./Navbar";
import styles from "./css/AppLayout.module.css";

const AppLayout = ({ children }) => {
  const isAuthenticate = useAuthStore((state) => state.isAuthenticated);
  return (
    <div className={styles.layout}>
      {isAuthenticate && <Navbar />}
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AppLayout;