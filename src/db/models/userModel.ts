import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt: mongoose.Schema.Types.Date;
}
// https://railway.app/project/eb9bc59a-dd8e-4790-8d9e-00d99696e7cc/plugin/190e7a9b-307c-4dd2-a102-841eddef42a3/Data
// Define User schema
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create User model
export const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);
