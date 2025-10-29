
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      id: { type: String, required: true },
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    isVerified:{type:Boolean,default:false},
  role: { type: String, default: "USER" },
  status: { type: String, default: "PENDING_VERIFICATION" }, // <-- added
  // googleId: { type: String },
  // createdAt: { type: Date, default: Date.now }
},{timestamps:true})



export const UserModel = mongoose.model("User", userSchema);
  
