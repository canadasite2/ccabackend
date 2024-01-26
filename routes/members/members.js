import { Router } from "express";
const router = Router();
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
  memberLogin,
  memberProfile,
  changePassword,
  changeUserStatus,
  logoUploader,
  renewPackage,
} from "../../controllers/member/member.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isMember } from "../../middlewares/isMember.js";
import upload from "../../utils/multer.js";

router.get("/", isAdmin, getMembers);
router.post("/", addMember);
router.post("/login", memberLogin);
router.put("/:memberId", isAdmin, updateMember);
router.delete("/:memberId", isAdmin, deleteMember);
router.patch("/changePassword", isMember, changePassword);
router.patch("/changeStatus", isAdmin, changeUserStatus);
router.patch("/renew", isMember, renewPackage);

router.get("/profile", isMember, memberProfile);
router.post("/logoUpload", upload.single("logo"), logoUploader);

export default router;
