import axiosInstance from "./axiosInstance";

export const getAllPlansApi = async () => {
    const res = await axiosInstance.get('/plans');
    return res.data.plans;
}