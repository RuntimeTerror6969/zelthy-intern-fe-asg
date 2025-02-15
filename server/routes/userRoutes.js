import express from "express";
import {
  registerOrLoginUser,
  getUserData,
  getAllUsers,
  addSlot,
  deleteSlot,
  updateSlot,
  copyAvailability,
  updateTimezone,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerOrLoginUser);
router.get("/:username", getUserData);
router.get("/", getAllUsers);
router.post("/:username/availability", addSlot);
router.delete("/:username/availability", deleteSlot);
router.put("/:username/availability", updateSlot);
router.post("/:username/availability/copy", copyAvailability);
router.put("/:username/timezone", updateTimezone);

export default router;
