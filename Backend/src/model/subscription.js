import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "UserId Required"],
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plans",
      required: [true, "PlanId Required"],
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscriptions", subscriptionSchema);
