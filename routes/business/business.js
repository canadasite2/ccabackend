import { Router } from "express";
const router = Router();
import {
  createBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness,
  statusOfBusiness,
  getAllBusinessOfMember,
  getAllApprovedBusinesses,
  logoUploader,
} from "../../controllers/business/business.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isMember } from "../../middlewares/isMember.js";
import upload from "../../utils/multer.js";

router.get("/", isAdmin, getAllBusinesses);
router.get("/aprovedBusinesses", getAllApprovedBusinesses);
router.get("/ofmember", isMember, getAllBusinessOfMember);
router.post("/", isMember, createBusiness);
router.put("/:businessId", isMember, updateBusiness);
router.delete("/:businessId", deleteBusiness);
router.patch("/:businessId/status", isAdmin, statusOfBusiness);
router.post("/logoUpload", upload.single("logo"), logoUploader);

export default router;
