// import { Link, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";
// import { LogoutApi } from "../api/authApi";
// import { toast } from "react-toastify";

// const AdminNavbar = () => {
//     const navigate = useNavigate();
//   const logout = useAuthStore((state) => state.logout);

//   const handleLogout = async () => {
//     try {
//       // call backend to clear cookies
//       const res = await LogoutApi();
//       toast.success(res.message)
//     } catch (error) {
//       console.log("Logout error", error);
//       toast.error("Logout Fail")
//     }

//     // clear Zustand state
//     logout();

//     setTimeout(()=>{
//         navigate("/login");
//     },500)
//   };
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       <h3>Admin Panel</h3>

//       <nav style={{ display: "flex", gap: "10px",alignItems:"center" }}>
//         <Link to="/admin">Home</Link>
//         <Link to="/admin/subscriptions">List</Link>
//         <button onClick={handleLogout}>Logout</button>
//       </nav>
//     </div>
//   );
// };

// export default AdminNavbar;









import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { LogoutApi } from "../api/authApi";
import { toast } from "react-toastify";
import styles from "./css/AdminNavbar.module.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      const res = await LogoutApi();
      toast.success(res.message);
    } catch (error) {
      console.log("Logout error", error);
      toast.error("Logout Fail");
    }

    logout();

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className={styles.navbar}>
      <h3 className={styles.logo}>Admin Panel</h3>

      <nav className={styles.navLinks}>
        <Link className={styles.link} to="/admin">
          Home
        </Link>
        <Link className={styles.link} to="/admin/subscriptions">
          List
        </Link>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminNavbar;