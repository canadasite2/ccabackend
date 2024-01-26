import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const categoryModel = Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = model("Category", categoryModel);
export default Category;
