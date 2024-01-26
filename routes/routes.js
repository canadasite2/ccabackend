import { Router } from "express";
const router = Router();
import memberRoute from "../routes/members/members.js";
import adminRoute from "../routes/admin/admin.js";
import BusinessRoute from "../routes/business/business.js";
import PackageRoute from "../routes/package/package.js";
import ContactRoute from "../routes/contact/contact.js";
import CategoryRoute from "../routes/business/category.js";
import DashbaordRoute from "../routes/Dashboard/dashboard.js";
import BlogRoute from "../routes/Blogs/Blog.js";
import BlogCategoriesRoutes from "../routes/Blogs/Blog-categories.js";
import MediaBlogRoute from "../routes/Blogs/MediaBlog.js";
import TransactionRoute from "../routes/transactions/transaction.js";
import EventRoute from "../routes/Event/event.js";

router.use("/admin", adminRoute);

router.use("/members", memberRoute);
router.use("/business", BusinessRoute);
router.use("/package", PackageRoute);
router.use("/contact", ContactRoute);
router.use("/category", CategoryRoute);
router.use("/dashboard", DashbaordRoute);
router.use("/blogs", BlogRoute);
router.use("/blogs-categories", BlogCategoriesRoutes);
// router.use("/mediablogs", MediaBlogRoute);
router.use("/transaction", TransactionRoute);
router.use("/event", EventRoute);

export default router;
