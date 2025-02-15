// models/post.model.ts
import mongoose from 'mongoose';
// MongoDB Schema type
type PostDocument = Post & {
  _id: import("mongoose").Types.ObjectId;
  likedBy: import("mongoose").Types.ObjectId[];
};

const postSchema = new mongoose.Schema<PostDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  palette: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const Post = mongoose.models.Post || mongoose.model<PostDocument>('Post', postSchema);

export default Post;