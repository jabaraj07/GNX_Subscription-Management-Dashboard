import React, { useEffect, useState } from "react";
import { getAllPlansApi } from "../api/planApi";
import { SubscribeAPi } from "../api/subscriptionApi";
import { toast } from "react-toastify";
import styles from "./css/PlansPage.module.css";

const PlansPage = () => {
  const [plans, setPlans] = useState([]);

  const fetchAllPlans = async () => {
    try {
      const res = await getAllPlansApi();
      setPlans(res);
    } catch (error) {
      console.log("Error while fetching plans:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllPlans();
  }, []);

  const handlePurchase = async (id) => {
    try {
      const res = await SubscribeAPi(id);
      toast.success("Purchase successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Plans</h1>
        <p className={styles.subheading}>Choose a plan that works for you</p>
      </div>

      {plans.length === 0 ? (
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
              />
            </svg>
          </div>
          <p className={styles.emptyTitle}>No plans available</p>
          <p className={styles.emptyText}>
            There are no plans to display right now. Please check back later.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {plans.map((item) => {
            const features = Array.isArray(item.features)
              ? item.features
              : String(item.features)
                  .split(",")
                  .map((f) => f.trim())
                  .filter(Boolean);

            return (
              <div key={item._id} className={styles.card}>
                <div className={styles.cardTop}>
                  <h2 className={styles.planName}>{item.name}</h2>
                  <p className={styles.planDuration}>{item.duration} days</p>
                </div>

                <p className={styles.planPrice}>
                  ₹ {item.price}
                  <span className={styles.planPriceSuffix}>/ plan</span>
                </p>

                <hr className={styles.divider} />

                <ul className={styles.featureList}>
                  {features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.featureDot} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={styles.purchaseButton}
                  onClick={() => handlePurchase(item._id)}
                >
                  Purchase
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlansPage;