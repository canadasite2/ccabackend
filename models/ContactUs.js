import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const contactModel = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
    match: /^[0-9]{10}$/,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = model("ContactUs", contactModel);

export default Contact;
