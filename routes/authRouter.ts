import { Router } from 'express';
import {
  forgotPassword,
  refreshToken,
  signIn,
  signUp,
  verifyUser,
} from '../controllers/authController.js';

const router: Router = Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.put('/verify', verifyUser);
router.post('/forgot-password', forgotPassword);
router.post('/refresh-token', refreshToken);

export default router;
