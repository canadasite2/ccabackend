import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const businessModel = Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  logo: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  approvedByAdmin: {
    type: String,
    default: "pending",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "member-details",
  },
});

const Business = model("Business", businessModel);
export default Business;
