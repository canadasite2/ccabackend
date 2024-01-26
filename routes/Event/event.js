import { Router } from "express";
const router = Router();

import { isAdmin } from "../../middlewares/isAdmin.js";
import {
  createEvent,
  deleteEventById,
  getAllEventsForAdmin,
  updateEventById,
  registerUserInEvent,
  getAllEvents,
  getAllEventsOfUserRegistered,
} from "../../controllers/Event/event.js";
import { isMember } from "../../middlewares/isMember.js";

router.get("/for-admin", isAdmin, getAllEventsForAdmin);
router.get("/", getAllEvents);
router.get("/user-event", isMember, getAllEventsOfUserRegistered);

router.post("/", isAdmin, createEvent);
router.put("/:id", isAdmin, updateEventById);
router.delete("/:id", isAdmin, deleteEventById);
router.post("/registerInEvent", isMember, registerUserInEvent);

export default router;
