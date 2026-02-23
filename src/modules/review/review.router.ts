import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = express.Router();

router.post("/",auth(UserRole.student), reviewController.createReview)
router.get("/",auth(UserRole.student),  reviewController.getAllReviews)
router.patch("/:id",auth(UserRole.student), reviewController.updateReview)
router.delete("/:id",auth(UserRole.student), reviewController.deleteReview)

export const reviewRouter = router;