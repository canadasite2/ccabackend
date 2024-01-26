import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  getAllTransactionsOfUser,
} from "../../controllers/transaction/transaction.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isMember } from "../../middlewares/isMember.js";
const router = Router();

router.get("/", isAdmin, getAllTransactions);
router.get("/user", isMember, getAllTransactionsOfUser);
router.post("/", isMember, createTransaction);
router.put("/:id", isAdmin, updateTransaction);
router.delete("/:id", isAdmin, deleteTransaction);

export default router;
