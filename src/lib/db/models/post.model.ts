import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  palette: { type: String, required: true },
});

const PostSchema = mongoose.models.Post || mongoose.model('Post', Post);

export default PostSchema;
