import mongoose, { Schema } from 'mongoose';
import { IUserModel } from '../Models/userModel';


const UserSchema = new Schema<IUserModel>(
  {id: { type: String, required: true,unique:true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    role: { type: String, default: 'USER' },
    status: { type: String, default: 'ACTIVE' },
    isVerified: { type: Boolean, default: false },
    provider: { type:String, required:true },

  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);












// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//       id: { type: String, required: true },
//     name:{type:String,required:true},
//     email:{type:String,required:true,unique:true},
//     password:{type:String},
//     isVerified:{type:Boolean,default:false},
//   role: { type: String, default: "USER" },
//   status: { type: String, default: "PENDING_VERIFICATION" }, // <-- added
//   // googleId: { type: String },
//   // createdAt: { type: Date, default: Date.now }
// },{timestamps:true})



// export const UserModel = mongoose.model("User", userSchema);
  
