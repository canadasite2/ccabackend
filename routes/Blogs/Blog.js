import { Router } from "express";
const router = Router();
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isMember } from "../../middlewares/isMember.js";
import {
  getBlogPostById,
  createBlogPost,
  getAllBlogPostForAdmin,
  updateBlogPostById,
  deleteBlogPostById,
  getAllBlogPost,
  changeBlogAccess,
  ImageUploader,
} from "../../controllers/blogs/blogs.js";
import upload from "../../utils/multer.js";

router.post("/", upload.single("image"), isAdmin, createBlogPost);
router.get("/for-admin", isAdmin, getAllBlogPostForAdmin);
router.post("/all", getAllBlogPost);
router.get("/:id", getBlogPostById);
router.put("/:id", upload.single("image"), isAdmin, updateBlogPostById);
router.delete("/:id", isAdmin, deleteBlogPostById);
router.put("/:blogId/access", isAdmin, changeBlogAccess);
router.post("/imageUpload", upload.single("image"), ImageUploader);

export default router;
