import { Schema } from "mongoose";


export const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    isVerified:{type:Boolean},
    createdAt:{type:Date},
    userRole:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    googleVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



  
