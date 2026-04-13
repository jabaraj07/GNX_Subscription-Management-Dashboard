import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import styles from "./css/AdminLayout.module.css";

const AdminLayout = () => {
  return (
    <div className={styles.wrapper}>
      <AdminNavbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;