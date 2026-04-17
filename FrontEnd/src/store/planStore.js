import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentSubscription } from "../api/subscriptionApi";
import { getAllPlansApi } from "../api/planApi";

const usePlanStore = create(
  persist(
    (set) => ({
      CurrentPlan: null,
      loading: false,
      AllPlans: [],

      fetchFullPlans: async () => {
        try {
          set({ loading: true });
          const res = await getAllPlansApi();
          set({ AllPlans: res });
        } catch (error) {
          console.log("Error in Fetch All Plans : ", error);
        } finally {
          set({ loading: false });
        }
      },

      fetchCurrentPlan: async () => {
        try {
          set({ loading: true });
          const res = await getCurrentSubscription();
          set({ CurrentPlan: res });
        } catch (error) {
          console.log("Error in Fetch Current Plan : ", error);
        } finally {
          set({ loading: false });
        }
      },

      clearPlan: () => set({ CurrentPlan: null }),
      clearAllPlan: () => set({ AllPlans: [] }),
    }),
    { name: "Plans-storage" },
  ),
);

export default usePlanStore;
