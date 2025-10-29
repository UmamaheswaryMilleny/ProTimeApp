// import { error } from "console";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/protimeAppTr"

// export class connectDB{

//     public async connect():Promise<void>{
//     try{
//         await mongoose.connect(MONGO_URI)
//         console.log('mongodb connected')
//     }catch{
//         console.error('mongodb connection failed',error)
//         process.exit(1)
//     }
// }
// }

// src/infrastructure/config/db.ts
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error("❌ MONGO_URI is missing. Check your .env file!");
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
