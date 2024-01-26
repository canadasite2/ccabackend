import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const mediaBlogPostSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  media: {
    type: String,
  },
  forPremiumUser: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MediaBlogs = model("Media-Blogs", mediaBlogPostSchema);

export default MediaBlogs;
