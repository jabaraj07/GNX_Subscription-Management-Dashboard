import axiosInstance from "./axiosInstance";

export const SubscribeAPi = async (Id) => {
  const res = await axiosInstance.post(`/subscribe/${Id}`);
  return res.data;
};

export const getCurrentSubscription = async () => {
    const res = await axiosInstance.get('/my-subscription');
    return res.data.current_Subscription;
}