import axiosInstance from "./axiosInstance";

export const getSubscriptionList = async () => {
    const res = await axiosInstance.get('/admin/subscriptions');
    return res.data.List;
}