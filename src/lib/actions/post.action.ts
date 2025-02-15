"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import { connectDB } from "../db/connect";
import Post from "../db/models/post.model";
import mongoose from 'mongoose';

// Types
type CreatePostParams = {
  user: string;
  prompt: string;
  photo: string;
  palette: string;
};

type GetAllPostsParams = {
  searchQuery?: string;
  filter?: 'popular' | 'downloads' | 'recent';
  style?: string;
  userId?: string;
  cursor?: string;
  limit?: number;
};

type UpdatePostParams = {
  prompt?: string;
  photo?: string;
};

type BaseResponse<T = any> = {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
};

type CursorPaginatedResponse<T> = BaseResponse<{
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}>;


type PostResponse = BaseResponse<Post>;
type PostsResponse = CursorPaginatedResponse<Post>;
type StatsResponse = BaseResponse<{
  updatedCount: number;
  posts: Post[];
}>;

// Helper function to serialize MongoDB documents
const serializeData = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

// Actions
export async function createPost(post: CreatePostParams): Promise<PostResponse> {
  try {
    await connectDB();
console.log(post);
    const newPost = await Post.create({
      ...post,
      // likes: Math.floor(Math.random() * 1000),
      // downloads: Math.floor(Math.random() * 500),
      // likedBy: [],
    });

    revalidatePath("/");
    return {
      success: true,
      data: serializeData(newPost),
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllPosts(params: GetAllPostsParams): Promise<PostsResponse> {
  try {
    await connectDB();

    const limit = params.limit || 9;
    const query: mongoose.FilterQuery<typeof Post> = {};
    
    if (params.searchQuery) {
      query.prompt = { $regex: params.searchQuery, $options: 'i' };
    }

    if (params.style) {
      query.palette = params.style;
    }

    // Define sort field based on filter
    let sortField = 'createdAt';
    switch (params.filter) {
      case 'popular':
        sortField = 'likes';
        break;
      case 'downloads':
        sortField = 'downloads';
        break;
    }

    // Add cursor to query if provided
    if (params.cursor) {
      const skipCount = parseInt(Buffer.from(params.cursor, 'base64').toString());
      const posts = await Post.aggregate([
        { $match: query },
        { $sort: { [sortField]: -1, _id: -1 } },
        { $skip: skipCount },
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
        },
        {
          $addFields: {
            isLiked: {
              $cond: {
                if: { $eq: [params.userId, undefined] },
                then: false,
                else: {
                  $in: [
                    params.userId ? new mongoose.Types.ObjectId(params.userId) : null,
                    { $ifNull: ["$likedBy", []] }
                  ]
                }
              }
            }
          }
        },
        { $limit: limit + 1 } // Get one extra to check if there are more items
      ]);

      // Check if there are more items
      const hasMore = posts.length > limit;
      const items = posts.slice(0, limit);

      // Create the next cursor
      let nextCursor = null;
      if (hasMore) {
        nextCursor = Buffer.from((skipCount + limit).toString()).toString('base64');
      }

      return {
        success: true,
        data: {
          items: serializeData(items),
          nextCursor,
          hasMore
        }
      };
    }

    // Initial query without cursor
    const posts = await Post.aggregate([
      { $match: query },
      { $sort: { [sortField]: -1, _id: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "user",
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
      },
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: { $eq: [params.userId, undefined] },
              then: false,
              else: {
                $in: [
                  params.userId ? new mongoose.Types.ObjectId(params.userId) : null,
                  { $ifNull: ["$likedBy", []] }
                ]
              }
            }
          }
        }
      },
      { $limit: limit + 1 } // Get one extra to check if there are more items
    ]);

    // Check if there are more items
    const hasMore = posts.length > limit;
    const items = posts.slice(0, limit);

    // Create the first cursor
    let nextCursor = null;
    if (hasMore) {
      nextCursor = Buffer.from(limit.toString()).toString('base64');
    }
    return {
      success: true,
      data: {
        items: serializeData(items),
        nextCursor,
        hasMore
      }
    };
  } catch (error) {
    return handleError(error);
  }
}


export async function getPostById(postId: string, userId?: string): Promise<PostResponse> {
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
      },
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: { $eq: [userId, undefined] },
              then: false,
              else: {
                $in: [
                  new mongoose.Types.ObjectId(userId),
                  { $ifNull: ["$likedBy", []] }
                ]
              }
            }
          }
        }
      }
    ]).then(results => results[0]);

    if (!post) {
      return {
        success: false,
        message: "Post not found"
      };
    }

    return {
      success: true,
      data: serializeData(post)
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function toggleLike(postId: string, userId: string): Promise<PostResponse> {
  try {
    await connectDB();

    const post = await Post.findById(postId);
    if (!post) {
      return {
        success: false,
        message: "Post not found"
      };
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const isLiked = post.likedBy.includes(userObjectId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      isLiked
        ? {
            $pull: { likedBy: userObjectId },
            $inc: { likes: -1 }
          }
        : {
            $addToSet: { likedBy: userObjectId },
            $inc: { likes: 1 }
          },
      { new: true }
    );

    revalidatePath("/");
    revalidatePath("/gallery");
    return {
      success: true,
      data: serializeData({
        ...updatedPost?.toObject(),
        isLiked: !isLiked
      })
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function downloadPost(postId: string): Promise<PostResponse> {
  try {
    await connectDB();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return {
        success: false,
        message: "Post not found"
      };
    }

    revalidatePath("/");
    return {
      success: true,
      data: serializeData(updatedPost)
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function updatePost(postId: string, update: UpdatePostParams): Promise<PostResponse> {
  try {
    await connectDB();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    );

    if (!updatedPost) {
      return {
        success: false,
        message: "Post update failed"
      };
    }

    revalidatePath("/");
    return {
      success: true,
      data: serializeData(updatedPost)
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function deletePost(postId: string): Promise<PostResponse> {
  try {
    await connectDB();

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return {
        success: false,
        message: "Post not found"
      };
    }

    revalidatePath("/");
    return {
      success: true,
      data: serializeData(deletedPost)
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateAllPostsWithRandomStats(): Promise<StatsResponse> {
  try {
    await connectDB();

    const posts = await Post.find({});
    
    const updatePromises = posts.map(post => {
      return Post.findByIdAndUpdate(
        post._id,
        {
          $set: {
            likes: Math.floor(Math.random() * 1000),
            downloads: Math.floor(Math.random() * 500)
          }
        },
        { new: true }
      );
    });

    const updatedPosts = await Promise.all(updatePromises);

    revalidatePath("/");
    return {
      success: true,
      message: `Updated ${updatedPosts.length} posts with random stats`,
      data: {
        updatedCount: updatedPosts.length,
        posts: serializeData(updatedPosts)
      }
    };
  } catch (error) {
    return handleError(error);
  }
}