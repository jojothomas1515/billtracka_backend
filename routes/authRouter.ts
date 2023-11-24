import { Router } from 'express';
import { signUp } from '../controllers/authController.js';

const router: Router = Router();

router.post('/signup', signUp);

export default router;
