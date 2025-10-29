// src/infrastructure/config/env.ts
export  const config = {
  mongoURI: process.env.MONGO_URI!,
  redisURL: process.env.REDIS_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiry: process.env.JWT_EXPIRY || "1h",
  emailUser: process.env.EMAIL_USER!,
  emailPass: process.env.EMAIL_PASS!,
};
