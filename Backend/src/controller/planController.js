import plan from "../model/plan.js"

export const getAllPlans = async (req, res) => {
  try {
    const result = await plan.find();
    if (!result) {
      return res.status(404).json({ message: "No Plans Found" });
    }
    return res
      .status(200)
      .json({ message: "Plans fetch successfully ", plans: result });
  } catch (error) {
    console.log("Error in getAllPlans Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};