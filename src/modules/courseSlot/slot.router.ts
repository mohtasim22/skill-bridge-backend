import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { slotController } from "./slot.controller";

const router = express.Router();

router.post("/",auth(UserRole.tutor), slotController.createSlot)
router.get("/",auth(UserRole.tutor),  slotController.getAllSlots)
router.patch("/:id",auth(UserRole.tutor), slotController.updateSlot)
router.delete("/:id",auth(UserRole.tutor), slotController.deleteSlot)

export const courseSlotRouter = router;