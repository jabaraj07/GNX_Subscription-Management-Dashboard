import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan Name Required"],
    },
    price: {
      type: Number,
      required: [true, "Plan Price Required"],
      min: 0,
    },
    duration: {
      type: Number,
      required: [true, "Plan duration Required"],
      min: 1,
      max: 365,
    },
    features: {
      type: [String],
      required: [true, "features Required"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Plans", planSchema);
