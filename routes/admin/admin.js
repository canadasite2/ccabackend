import { Router } from "express";
const router = Router();
import {
  addAdmin,
  adminLogin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
  changePassword,
  getAdminProfile,
} from "../../controllers/admin/admin.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

router.post("/", addAdmin);
router.get("/", getAdmins);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.patch("/changePassword", changePassword);

router.post("/login", adminLogin);
router.get("/profile", isAdmin, getAdminProfile);

export default router;
