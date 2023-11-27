import { Router } from 'express';
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { isAuth } from '../middleware/isAuthenticated.js';

const router = Router();

router.use(isAuth);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router;
