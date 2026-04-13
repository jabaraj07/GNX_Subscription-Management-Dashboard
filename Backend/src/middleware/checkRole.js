import user from "../model/user.js";

export const checkRole = async (req, res, next) => {
  try {
    const { Id } = req.user;
    const UserData = await user.findById({_id:Id});
        
    if (!UserData?.role || UserData?.role !== "admin") {
      return res.status(401).json({ message: "This Api only Access By Admin" });
    }
    next();
  } catch (error) {
    console.log("Error in checkRole Middleware ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
