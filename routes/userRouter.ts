import { Router } from 'express';
import { updateUser, deleteUser } from '../controllers/userController.js';

const router: Router = Router();

router.put('/', updateUser);
router.delete('/:id([\\w-]+)', deleteUser);

export default router;
