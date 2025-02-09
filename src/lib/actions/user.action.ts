"use server";

import { revalidatePath } from "next/cache";

import { handleError } from "../utils";
import { connectDB } from "../db/connect";
import User from "../db/models/user.model";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    console.log("Creating user...", (await connectDB()).connection.name);
    await connectDB();

    const newUser = await User.create(user);
    console.log("Created USer:", JSON.parse(JSON.stringify(newUser)));
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
export async function getUserByUsername(username: string) {
  try {
    await connectDB();

    const user = await User.findOne({ username });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllUsers() {
  try {
    await connectDB();
    const users = await User.find();
    console.log("Getting user...", (await connectDB()).connection.name);
    if (!users) throw new Error("User not found");
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectDB();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}
// Filter User
interface QueryParams {
  filter?: { [key: string]: any }; // Filtering conditions
  sort?: { [key: string]: 1 | -1 }; // Sorting conditions (1 for ASC, -1 for DESC)
  page?: number; // Page number for pagination
  limit?: number; // Number of results per page
}

export async function getFilteredUsers(query: QueryParams) {
  try {
    await connectDB();

    const { filter = {}, sort = {}, page = 1, limit = 1 } = query;

    // Ensure page and limit are positive integers
    const pageNum = Math.max(1, page);
    const limitNum = Math.max(1, limit);

    // Build query filters and sorting conditions
    const queryFilter = filter;
    const querySort = sort;

    // Fetch filtered users with pagination
    const users = await User.find(queryFilter)
      .sort(querySort) // Sorting by provided conditions
      .skip((pageNum - 1) * limitNum) // Skip based on the current page
      .limit(limitNum); // Limit results to the specified page size

    // Count the total number of matching users
    const totalUsers = await User.countDocuments(queryFilter);

    // Manually serialize data to remove non-serializable fields like ObjectId
    const serializedData = users.map((user) => {
      return {
        ...user.toObject(),
        _id: user._id.toString(), // Convert ObjectId to string
        joinDate: user.joinDate ? user.joinDate.toISOString() : null, // Convert dates to strings
        createdAt: user.createdAt ? user.createdAt.toISOString() : null, // Convert dates to strings
        updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null, // Convert dates to strings
      };
    });

    return {
      metadata: {
        total: totalUsers,
        page: pageNum,
      },
      data: serializedData,
    };
  } catch (error) {
    handleError(error);
    return { metadata: { total: 0, page: 1 }, data: [] };
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectDB();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectDB();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
