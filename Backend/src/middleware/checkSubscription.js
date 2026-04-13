import subscription from "../model/subscription.js";

export const checkActiveSubscription = async (req, res, next) => {
  try {
    const { Id } = req.user;
    const subscriptionData = await subscription.findOne({ user_id: Id });
    if (!subscriptionData) {
      return res.status(404).json({ message: "Subscription Not Found" });
    }
    if (subscriptionData.endDate < new Date()) {
      subscriptionData.status = "expired";
      await subscription.save();
      return res.status(403).json({ message: "Subscription Expired" });
    }
    next();
  } catch (error) {
    console.error("Subscription Middleware Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
