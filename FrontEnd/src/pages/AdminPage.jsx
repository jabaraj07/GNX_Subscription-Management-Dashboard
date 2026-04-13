import React from "react";
import useAuthStore from "../store/authStore";
import styles from "./css/AdminPage.module.css";

const AdminPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Welcome {user?.name} 👋
        </h1>

        <p className={styles.subtitle}>
          You are logged in as <strong>Admin</strong>.
        </p>

        <p className={styles.description}>
          Use the navigation above to manage subscriptions, users and plans.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;