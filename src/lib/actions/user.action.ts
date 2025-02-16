"use server";

import { revalidatePath } from "next/cache";

import { handleError } from "../utils";
import { connectDB } from "../db/connect";
import User from "../db/models/user.model";
export async function generateUniqueUsername(
  firstName: string = "",
  lastName: string = "",
  email: string
): Promise<string> {
  const cleanText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim();
  };

  const emailPrefix = email.split('@')[0];
  const cleanFirstName = cleanText(firstName);
  const cleanLastName = cleanText(lastName);

  const generateUsername = (base: string, attempt: number = 0): string => {
    if (attempt === 0) return base;
    return `${base}${attempt}`;
  };

  const usernameCandidates = [
    cleanFirstName + cleanLastName, // johndoe
    emailPrefix, // johndoe123
    cleanFirstName + (cleanLastName ? cleanLastName[0] : ''), // johnd
    (cleanFirstName ? cleanFirstName[0] : '') + cleanLastName, // jdoe
  ].filter(Boolean); // Remove empty strings

  for (const baseUsername of usernameCandidates) {
    let attempt = 0;
    let username = '';
    let isUnique = false;

    while (!isUnique && attempt < 1000) {
      username = generateUsername(baseUsername, attempt);
      // Check if username exists in database
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        isUnique = true;
        break;
      }
      attempt++;
    }

    if (isUnique) return username;
  }

  // Fallback: Use timestamp if all attempts fail
  return `user${Date.now().toString().slice(-8)}`;
}
// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectDB();
    // Generate username if not provided
    if (!user.username) {
      user.username = await generateUniqueUsername(
        user.firstName,
        user.lastName,
        user.email
        );
      }
      const newUser = await User.create(user);
      // console.log({newUser});
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
    // console.log("Getting user...", (await connectDB()).connection.name);
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
