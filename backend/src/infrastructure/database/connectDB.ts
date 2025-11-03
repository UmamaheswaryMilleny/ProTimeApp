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
import { config } from "../config/env";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
