import express, { Router } from "express";
import { CourseController } from "./course.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.post("/",auth(UserRole.tutor), CourseController.createCourse)
router.get("/", CourseController.getAllCourses)
router.patch("/:id",auth(UserRole.tutor), CourseController.updateCourse)
router.delete("/:id",auth(UserRole.tutor), CourseController.deleteCourse)

export const courseRouter: Router = router;