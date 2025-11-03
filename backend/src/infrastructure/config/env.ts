import dotenv from "dotenv";
dotenv.config()

export  const config = {
  mongoURI: process.env.MONGO_URI!,
  redisURL: process.env.REDIS_URL!,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,

  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || "1h",
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
  emailUser: process.env.EMAIL_USER!,
  emailPass: process.env.EMAIL_PASS!,
};
