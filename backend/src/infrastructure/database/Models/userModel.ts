import { model, Document, ObjectId } from "mongoose";
import { userSchema } from "../Schema/userSchema";

export interface IUserModel extends Document{
    _id:ObjectId;
    name:string,
    email:string,
    password:string,
    isVerified:boolean,
    userRole:string,
    googleId?:string,
    createdAt:Date;
}

export const UserModel = model<IUserModel>("User",userSchema)