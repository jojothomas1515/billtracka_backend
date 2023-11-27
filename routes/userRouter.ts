import { Router } from 'express';
import {
  updateUser,
  deleteUser,
  changePassword,
} from '../controllers/userController.js';

const router: Router = Router();

router.put('/', updateUser);
router.delete('/:id([\\w-]+)', deleteUser);
router.put('/change-password', changePassword);

export default router;
