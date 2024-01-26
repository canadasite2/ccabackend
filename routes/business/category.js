import { Router } from "express";
const router = Router();
import {
  createCategory,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} from "../../controllers/business/category.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isMember } from "../../middlewares/isMember.js";

router.get("/", getAllCategories);
router.post("/", isAdmin, createCategory);
router.put("/:id", isAdmin, updateCategoryById);
router.delete("/:id", isAdmin, deleteCategoryById);

export default router;
