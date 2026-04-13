import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field Required"],
    },
    email: {
      type: String,
      required: [true, "Email field Required"],
      unique:true
    },
    password: {
      type: String,
      required: [true, "Password field Required"],
    },
    role:{
      type:String,
      enum:["user","admin"],
      default:"user"
    }
  },
  { timestamps: true },
);

export default mongoose.model("Users", userSchema);
