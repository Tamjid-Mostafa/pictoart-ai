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
  membershipStatus?: "active" | "inactive" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
};
declare type User = {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  planId?: number;
  creditBalance?: number;
  membershipStatus?: "active" | "inactive" | "cancelled";
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
declare type Post = {
  _id: string;
  prompt: string;
  photo: string;
  palette: string;
  likes: number;
  downloads: number;
  likedBy: string[];
  isLiked?: boolean;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

// ====== URL QUERY PARAMS
declare type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

declare type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

declare type RemoveUrlQueryParams = {
  searchParams: string;
  keysToRemove: string[];
};