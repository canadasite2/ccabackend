import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const Admin = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const AdminAuth = model("admin", Admin);
export default AdminAuth;
