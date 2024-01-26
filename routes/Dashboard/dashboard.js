import { Router } from "express";
const router = Router();

import { isAdmin } from "../../middlewares/isAdmin.js";
import { FetchDashboard } from "../../controllers/Dashboard/dashboard.js";
import { isMember } from "../../middlewares/isMember.js";
import { FetchUserDashboard } from "../../controllers/Dashboard/userDashboard.js";

router.get("/", isAdmin, FetchDashboard);
router.get("/user", isMember, FetchUserDashboard);

export default router;
