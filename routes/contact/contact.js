import { Router } from "express";
const router = Router();

import {
  getAllContacts,
  addContact,
  deleteContact,
} from "../../controllers/contactUs/contactUs.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

router.post("/", addContact);
router.get("/", isAdmin, getAllContacts);
router.delete("/:id", isAdmin, deleteContact);

export default router;
