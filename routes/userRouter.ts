import { Router } from 'express';
import { updateUser } from '../controllers/userController.js';

const router: Router = Router();

router.put('/', updateUser);

export default router;
