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