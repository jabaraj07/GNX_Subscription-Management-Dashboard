import user from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { cookieConfig } from "../config/cookie.js";
import { jwtConfig } from "../config/jwt.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const isUserExist = await user.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User Already Exist with this EmailId" });
    }

    const hashPassword = await bcrypt.hash(password, 11);

    const Data = { name, email, password: hashPassword };
    if (role) {
      Data.role = role;
    }

    const AddedUser = await user.create(Data);
    if (!AddedUser) {
      return res.status(400).json({ message: "User Registration failed" });
    }
    AddedUser.password = undefined;

    return res
      .status(200)
      .json({ message: "User Register Successfully", user: AddedUser });
  } catch (error) {
    console.log("Error in Register Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await user.findOne({ email });
    if (!isUserExist) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const validatePassword = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!validatePassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const Access_Token = generateAccessToken(isUserExist);
    const Refresh_Token = generateRefreshToken(isUserExist);

    if (!Access_Token || !Refresh_Token) {
      console.error("JWT generation failed");

      return res.status(500).json({
        message: "Authentication error. Please try again later.",
      });
    }

    res.cookie("AccessToken", Access_Token, cookieConfig.access);
    res.cookie("RefreshToken", Refresh_Token, cookieConfig.refresh);
    isUserExist.password = undefined;
    return res.status(200).json({
      message: "User Login Successfully",
      user:isUserExist
    });
  } catch (error) {
    console.log("Error in Login Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LogoutUser = (req, res) => {
  try {
    res.clearCookie("AccessToken", cookieConfig.access);
    res.clearCookie("RefreshToken", cookieConfig.refresh);
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.RefreshToken;    

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);

    const existUser = await user.findById(decoded.Id);    

    if (!existUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newAccessToken = generateAccessToken(existUser);    

    res.cookie("AccessToken", newAccessToken, cookieConfig.access);

    return res.status(200).json({
      message: "Token refreshed successfully",
    });

  } catch (error) {
    console.log("Error in RefreshToken Controller", error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { Id } = req.user;
    const current_user = await user.findById(Id).select("-password");

    if (!current_user) {
      return res.status(401).json({ message: "unAuthorized" });
    }
    return res
      .status(200)
      .json({ message: "Current user fetch successfully ", current_user });
  } catch (error) {
    console.log("Error in getCurrentUser Controller ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
