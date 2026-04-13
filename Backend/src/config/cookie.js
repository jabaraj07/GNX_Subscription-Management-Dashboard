export const cookieConfig = {
  access: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: Number(process.env.ACCESS_COOKIE_MAX_AGE),
  },
  refresh: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: Number(process.env.REFRESH_COOKIE_MAX_AGE),
  }
};