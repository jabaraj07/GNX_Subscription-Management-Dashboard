import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { LogoutApi } from "../api/authApi";
import { toast } from "react-toastify";
import styles from "./css/Navbar.module.css";
import usePlanStore from "../store/planStore";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const clearPlan = usePlanStore((state) => state.clearPlan);
  const clearAllPlans = usePlanStore((state) => state.clearAllPlan);

  const handleLogout = async () => {
    try {
      const res = await LogoutApi();
      clearPlan();
      clearAllPlans();
      toast.success(res.message);
    } catch (error) {
      console.log("Logout error", error);
      toast.error("Logout failed");
    }

    logout();

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className={styles.navbar}>
      <Link to="/dashboard" className={styles.brand}>
        Management
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/plans"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Plans
        </NavLink>

        <div className={styles.divider} />

        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
