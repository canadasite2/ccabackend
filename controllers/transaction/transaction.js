import Transaction from "../../models/Transaction.js";
import mongoose from "mongoose";

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ success: true, transaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error creating transaction" });
  }
};

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate(
      "userId",
      "primaryContact.firstName primaryContact.lastName"
    );
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching transactions" });
  }
};

export const getAllTransactionsOfUser = async (req, res) => {
  try {
    const { userId } = req;
    if (userId) {
      const transactions = await Transaction.find({
        userId: userId, // Use mongoose.Types.ObjectId
      }).populate("userId", "primaryContact.firstName primaryContact.lastName");
      res.status(200).json({ success: true, transactions });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching transactions" });
  }
};

// Get a specific transaction by ID
export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching transaction" });
  }
};

// Update a transaction by ID
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ success: true, transaction: updatedTransaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error updating transaction" });
  }
};

// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res
      .status(200)
      .json({ success: true, deleteTransactionId: deletedTransaction._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting transaction" });
  }
};
