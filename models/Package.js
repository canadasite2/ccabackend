import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const PackageModel = Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  tag: {
    type: String,
  },
});

const Package = model("package", PackageModel);
export default Package;
