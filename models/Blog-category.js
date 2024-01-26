import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const categoryModel = Schema(
  {
    name: {
      type: String,
    },
    totalBlogs: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Category = model("Blog-Categories", categoryModel);
export default Category;
