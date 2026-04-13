import dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
    accessSecret : process.env.ACCESS_TOKEN_SECRET,
    refreshSecret : process.env.REFRESH_TOKEN_SECRET,
    accessExpires : process.env.ACCESS_TOKEN_EXPIRES,
    refreshExpires : process.env.REFRESH_TOKEN_EXPIRES
}