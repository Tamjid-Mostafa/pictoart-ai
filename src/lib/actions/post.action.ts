"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import { connectDB } from "../db/connect";
import Post from "../db/models/post.model";
import mongoose from 'mongoose';

// CREATE
export async function createPost(post: {
  userId: string;
  prompt: string;
  photo: string;
  palette: string;
}) {
  try {
    await connectDB();

    const newPost = await Post.create(post);

    revalidatePath("/", "page");
    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getAllPosts() {
  try {
    await connectDB();

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [{ $project: { username: 1, _id: 0 } }],
          as: "user"
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    handleError(error);
  }
}

export async function getPostById(postId: string) {
  try {
    await connectDB();

    const post = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [{ $project: { username: 1, _id: 0 } }],
          as: "user"
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      }
    ]).then(results => results[0]);

    if (!post) throw new Error("Post not found");

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updatePost(postId: string, update: {
  prompt?: string;
  photo?: string;
}) {
  try {
    await connectDB();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    );

    if (!updatedPost) throw new Error("Post update failed");

    revalidatePath("/");
    return JSON.parse(JSON.stringify(updatedPost));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deletePost(postId: string) {
  try {
    await connectDB();

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) throw new Error("Post not found");

    revalidatePath("/");
    return JSON.parse(JSON.stringify(deletedPost));
  } catch (error) {
    handleError(error);
  }
}