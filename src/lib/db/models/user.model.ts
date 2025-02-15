import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
