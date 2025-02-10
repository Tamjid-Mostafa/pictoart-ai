/* eslint-disable no-unused-vars */
// ====== USER PARAMS
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  planId?: number;
  creditBalance?: number;
  joinDate?: Date;
  membershipStatus?: "active" | "inactive" | "cancelled";
  workoutPreferences?: string[];
  nutritionGoals?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

declare type UpdateUserParams = {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  planId?: number;
  creditBalance?: number;
  joinDate?: Date;
  membershipStatus?: "active" | "inactive" | "cancelled";
  workoutPreferences?: string[];
  nutritionGoals?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

declare type CreatePostParams = {
  userId: string;
  prompt: string;
  photo: string;
  palette: string;
};

declare type UpdatePostParams = {
  prompt?: string;
  photo?: string;
  palette?: string;
};

declare type Post = {
  palette: string;
  _id: string;
  userId: string;
  prompt: string;
  photo: string;
  user: {
    username: string | null;
  }
}