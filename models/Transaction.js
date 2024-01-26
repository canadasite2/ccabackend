import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const transactionSchema = Schema({
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member-details",
    required: true,
  },
  transactionId: {
    type: String,
  },
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
