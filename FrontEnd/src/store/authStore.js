import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { getCurrentUserApi, LogoutApi } from "../api/authApi";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        try {
          await LogoutApi();
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.log("Error While Logout : ", error);
        }
      },

      checkAuth: async () => {
        try {
          set({ loading: true });
          const res = await getCurrentUserApi();
          set({
            user: res.current_user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.log("Error while check current user : ", error);
          set({
            user: null,
            isAuthenticated: false,
          });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "auth-storage" },
  ),
);
export default useAuthStore;
