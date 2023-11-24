import { Router } from 'express';
import { signIn, signUp, verifyUser } from '../controllers/authController.js';

const router: Router = Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.put('/verify', verifyUser);

export default router;
