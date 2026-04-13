import React from "react";
import { useForm } from "react-hook-form";
import { RegisterApi } from "../api/authApi.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../schemas/auth.schema.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./css/SignupPage.module.css";

const SignupPage = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const navigate = useNavigate();

  const onRegisterSubmit = async (data) => {
    try {
      const res = await RegisterApi(data);
      console.log(res);
      toast.success("Signup successful");
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Create an account</h1>
        <p className={styles.subheading}>Sign up to get started</p>

        <form className={styles.form} onSubmit={handleSubmit(onRegisterSubmit)}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.input}
              id="name"
              {...register("name")}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              {...register("email")}
              placeholder="Enter email"
              type="email"
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              id="password"
              {...register("password")}
              placeholder="Enter password"
              type="password"
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className={styles.loginRow}>
          Already have an account?
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;