import axiosInstance from "./axiosInstance";

export const RegisterApi = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const LoginApi = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const LogoutApi = async () => {
  const res = await axiosInstance.post("/logout");
  return res.data;
};

export const getCurrentUserApi = async () => {
  const res = await axiosInstance.get("/me");
  return res.data;
};
