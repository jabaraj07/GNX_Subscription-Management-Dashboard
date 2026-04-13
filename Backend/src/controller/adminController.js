import subscription from "../model/subscription.js";

export const getAllSubscription = async (req, res) => {
  try {
    const AllSubscriptionList = await subscription
      .find()
      .populate("user_id", "name email")
      .populate("plan_id", "name price duration");

    if (!AllSubscriptionList || AllSubscriptionList.length === 0) {
      return res.status(404).json({ message: "Subscription List is Empty" });
    }

    const formattedData = AllSubscriptionList.map((sub) => ({
      id: sub._id,

      user: {
        id: sub.user_id._id,
        name: sub.user_id.name,
        email: sub.user_id.email,
      },

      plan: {
        id: sub.plan_id._id,
        name: sub.plan_id.name,
        price: sub.plan_id.price,
        duration: sub.plan_id.duration,
      },

      status: sub.status,
      startDate: sub.startDate,
      endDate: sub.endDate,
    }));
    return res.status(200).json({
      message: "Subscription list fetch successfully",
      List: formattedData,
    });
  } catch (error) {
    console.log("Error in getAllSubscription Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
