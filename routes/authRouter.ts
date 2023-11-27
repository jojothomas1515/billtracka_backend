import { Router } from 'express';
import {
  forgotPassword,
  refreshToken,
  resetPassword,
  signIn,
  signUpWithEmail,
  verifyUser,
} from '../controllers/authController.js';

const router: Router = Router();

router.post('/signup', signUpWithEmail);
router.post('/login', signIn);
router.put('/verify', verifyUser);
router.post('/forgot-password', forgotPassword);
router.post('/refresh-token', refreshToken);
router.put('/reset-password', resetPassword);

export default router;
