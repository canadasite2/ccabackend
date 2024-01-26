import { Router } from "express";
const router = Router();
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../../controllers/package/package.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

router.get("/", getPackages);
router.post("/", isAdmin, createPackage);
router.put("/:packageId", isAdmin, updatePackage);
router.delete("/:packageId", isAdmin, deletePackage);

export default router;
