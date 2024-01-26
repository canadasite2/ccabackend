import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const blogPostSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tags: [{ type: String }],
  category: {
    type: String,
  },
  forPremiumUser: {
    type: Boolean,
    default: false,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blogs = model("Blogs", blogPostSchema);

export default Blogs;
