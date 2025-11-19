// src/infrastructure/database/Models/adminModel.ts
import { Document } from "mongoose";

export interface IAdminModel extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
