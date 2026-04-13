import { useNavigate } from "react-router-dom";
import styles from "./css/NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>WHOOPS!</h2>

      <h1 className={styles.code}>404</h1>

      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => navigate("/")}
        >
          Go Home
        </button>

        <button
          className={styles.button}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;