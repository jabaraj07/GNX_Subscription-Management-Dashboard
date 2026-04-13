import jwt from "jsonwebtoken";
import  {jwtConfig}  from "../config/jwt.js";

export const generateAccessToken = (user) => {
  return jwt.sign({ Id: user._id, email: user.email }, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpires,
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { Id: user._id, email: user.email },
    jwtConfig.refreshSecret,
    { expiresIn: jwtConfig.refreshExpires },
  );
};
