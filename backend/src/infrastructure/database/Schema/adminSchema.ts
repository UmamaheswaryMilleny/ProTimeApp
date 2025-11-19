// // src/infrastructure/database/Schema/adminSchema.ts
// import mongoose, { Schema } from "mongoose";
// import { IAdminModel } from "../Models/adminModel";

// const AdminSchema = new Schema<IAdminModel>(
//   {
//     id: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, default: "ADMIN" },
//   },
//   { timestamps: true }
// );

// export const AdminModel = mongoose.model<IAdminModel>("Admin", AdminSchema);
