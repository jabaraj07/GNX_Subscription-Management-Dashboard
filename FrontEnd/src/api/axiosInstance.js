import axios from "axios";

const base_url = import.meta.env.VITE_APP_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

const plainAxios = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await plainAxios.post("/refresh");

        return axiosInstance(originalRequest);
      } catch (err) {
        try {
          await plainAxios.post("/logout");
        } catch (e) {
          console.log("Logout failed");
        }

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
