import mongoose from "mongoose";
import dotenv from "dotenv";
import plan from "../model/plan.js";
import { connectDB } from "../config/db.js";
dotenv.config();
connectDB();

const plans = [
  {
    name: "Free",
    price: 0,
    duration: 7,
    features: ["Limited access", "Basic support", "Ads enabled"],
  },
  {
    name: "Basic",
    price: 299,
    duration: 30,
    features: ["Core features", "Email support", "No ads"],
  },
  {
    name: "Pro",
    price: 999,
    duration: 30,
    features: ["Unlimited access", "Priority support", "No ads"],
  },
];

const seedData = async () => {
  try {
    await plan.deleteMany();

    const res = await plan.insertMany(plans);

    console.log("Plans Seeded Successfully", res);
  } catch (error) {
    console.log("Error while Seed Data", error);
  }
};
seedData();
