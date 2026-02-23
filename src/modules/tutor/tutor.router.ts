import express from "express";
import { tutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middlewares/auth";


const router = express.Router();
router.post("/", auth(UserRole.tutor), tutorController.createTutor);
router.get("/:id", tutorController.getTutor);
router.patch("/", auth(UserRole.tutor), tutorController.updateTutor)
router.delete("/:id", auth(UserRole.tutor), tutorController.deleteTutor)

export const tutorRouter = router;