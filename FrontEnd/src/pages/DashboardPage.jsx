import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentSubscription } from "../api/subscriptionApi";
import styles from "./css/DashboardPage.module.css";

const DashboardPage = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentPlan = async () => {
    try {
      const res = await getCurrentSubscription();
      setCurrentPlan(res);
    } catch (error) {
      console.log("Error while fetching plan:", error);
    }
  };

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const getStatusClass = (status) => {
    if (status === "active") return styles.statusActive;
    if (status === "expired") return styles.statusExpired;
    return styles.statusInactive;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Dashboard</h1>
        <p className={styles.subheading}>Manage your subscription and account</p>
      </div>

      {!currentPlan ? (
        <div className={styles.emptyCard}>
          <div className={styles.emptyIcon}>
            <svg
              className={styles.emptyIconSvg}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          </div>
          <p className={styles.emptyTitle}>No active plan</p>
          <p className={styles.emptyText}>
            You don't have a subscription yet. Choose a plan to get started.
          </p>
          <button
            className={styles.emptyButton}
            onClick={() => navigate("/plans")}
          >
            Browse plans
          </button>
        </div>
      ) : (
        <div className={styles.planCard}>
          <div className={styles.planCardHeader}>
            <h2 className={styles.planCardTitle}>Current plan</h2>
            <span
              className={`${styles.statusBadge} ${getStatusClass(currentPlan.status)}`}
            >
              {currentPlan.status}
            </span>
          </div>

          <hr className={styles.divider} />

          <div className={styles.planRows}>
            <div className={styles.planRow}>
              <span className={styles.planRowLabel}>Plan</span>
              <span className={styles.planRowValue}>{currentPlan?.plan?.name}</span>
            </div>

            <div className={styles.planRow}>
              <span className={styles.planRowLabel}>Price</span>
              <span className={styles.planPrice}>
                ₹ {currentPlan?.plan?.price}
              </span>
            </div>

            <div className={styles.planRow}>
              <span className={styles.planRowLabel}>Expires on</span>
              <span className={styles.planRowValue}>
                {new Date(currentPlan.endDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;