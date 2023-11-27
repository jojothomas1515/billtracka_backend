import { Router } from 'express';
import {
  updateUser,
  deleteUser,
  changePassword,
} from '../controllers/userController.js';
import { isAuth } from '../middleware/isAuthenticated.js';

const router: Router = Router();

router.use(isAuth);
router.put('/', updateUser);
router.delete('/:id([\\w-]+)', deleteUser);
router.put('/change-password', changePassword);

export default router;
