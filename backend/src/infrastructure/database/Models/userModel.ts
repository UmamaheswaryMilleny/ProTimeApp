

import {Document } from 'mongoose';



export interface IUserModel extends Document {
  id: string;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: string;
  status: string;
  isVerified: boolean;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

// const UserSchema = new Schema<IUserModel>(
//   {id: { type: String, required: true,unique:true },
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String },
//     googleId: { type: String },
//     role: { type: String, default: 'USER' },
//     status: { type: String, default: 'ACTIVE' },
//     isVerified: { type: Boolean, default: false },
//     provider: { type:String, required:true },

//   },
//   {
//     timestamps: true,
//   }
// );

// export const UserModel = mongoose.model<IUserModel>('User', UserSchema);

// import { model, Document, ObjectId } from "mongoose";
// import { userSchema } from "../Schema/userSchema";

// export interface IUserModel extends Document{
//     _id:ObjectId;
//     name:string,
//     email:string,
//     password:string,
//     isVerified:boolean,
//     userRole:string,
//     userStatus:string,
//     googleId?:string,
//     createdAt:Date;
// }

// export const UserModel = model<IUserModel>("User",userSchema)
