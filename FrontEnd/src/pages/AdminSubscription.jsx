import React, { useEffect, useState } from "react";
import { getSubscriptionList } from "../api/adminApi";
import { toast } from "react-toastify";
import styles from "./css/AdminSubscription.module.css";

const AdminSubscription = () => {
  const [list, setList] = useState([]);

  const fetchSubscription = async () => {
    try {
      const res = await getSubscriptionList();
      setList(res);
    } catch (error) {
      console.log("Error while fetch Plans : ", error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Subscriptions</h2>

      {list && list.length === 0 ? (
        <p className={styles.empty}>No Subscription Found</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>

            <tbody>
              {list.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.user.name}</td>
                  <td>{sub.user.email}</td>
                  <td>{sub.plan.name}</td>
                  <td>₹{sub.plan.price}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        sub.status === "ACTIVE"
                          ? styles.active
                          : styles.inactive
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td>{new Date(sub.startDate).toLocaleDateString()}</td>
                  <td>{new Date(sub.endDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSubscription;