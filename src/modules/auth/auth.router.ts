import express from 'express';
import { AuthController } from './auth.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post('/register',AuthController.createUser)
router.post('/login',AuthController.loginUser)
router.patch('/profile',auth(UserRole.student, UserRole.tutor) ,AuthController.updateUser)

export const AuthRoutes = router;