import { Router } from "express";
const router = Router();
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isMember } from "../../middlewares/isMember.js";

import upload from "../../utils/multer.js";
import {
  changeMBlogAccess,
  createMBlogPost,
  deleteMBlogPostById,
  getAllMBlogPost,
  getAllMBlogPostForAdmin,
  getMBlogPostById,
  updateMBlogPostById,
} from "../../controllers/MediaBlog/mediaBlog.js";

router.post("/", upload.single("media"), isAdmin, createMBlogPost);
router.get("/for-admin", isAdmin, getAllMBlogPostForAdmin);
router.post("/all", getAllMBlogPost);
router.get("/:id", getMBlogPostById);
router.put("/:id", upload.single("media"), isAdmin, updateMBlogPostById);
router.delete("/:id", isAdmin, deleteMBlogPostById);
router.put("/:blogId/access", isAdmin, changeMBlogAccess);

export default router;
