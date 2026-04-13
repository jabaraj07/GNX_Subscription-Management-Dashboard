import plan from "../model/plan.js";
import subscription from "../model/subscription.js";

export const AddSubscription = async (req, res) => {
  try {
    const { planId } = req.params;
    const { Id } = req.user;
    if (!planId) {
      return res.status(400).json({ message: "PlanId Required" });
    }

    if (!Id) {
      return res.status(401).json({ message: "UnAuthorize" });
    }

    const existingSubscription = await subscription.findOne({
      user_id: Id,
      status: "active",
    });

    if (existingSubscription) {
      return res.status(400).json({
        message: "You already have an active subscription",
      });
    }

    const SelectedPlan = await plan.findById(planId);

    if (!SelectedPlan) {
      return res.status(404).json({ message: "Plan Not Found" });
    }

    const EndDate = new Date(
      Date.now() + SelectedPlan.duration * 24 * 60 * 60 * 1000,
    );

    const SubscribeData = {
      user_id: Id,
      plan_id: SelectedPlan._id,
      endDate: EndDate,
    };

    const AddedSubscription = await subscription.create(SubscribeData);

    if (!AddedSubscription) {
      return res
        .status(400)
        .json({ message: "Something Went Wrong in Subscription created" });
    }
    return res.status(201).json({
      message: "Subscription Created Successfully",
      AddedSubscription,
    });
  } catch (error) {
    console.log("Error in AddSubscription Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentSubscription = async (req, res) => {
  try {
    const { Id } = req.user;
    const current_Subscription = await subscription
      .findOne({ user_id: Id })
      .populate("plan_id");

    if (!current_Subscription) {
      return res
        .status(404)
        .json({ message: "No Subscription found for this user" });
    }

        const responseData = {
      ...current_Subscription.toObject(), // convert mongoose doc to plain object
      plan: current_Subscription.plan_id,
    };

    delete responseData.plan_id;
    return res
      .status(200)
      .json({
        message: "Current Subscription fetch successfully ",
        current_Subscription : responseData,
      });
  } catch (error) {
    console.log("Error in getCurrentAubscription Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
