import { Router } from 'express';

import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
import { isAuth } from '../middleware/isAuthenticated.js';

const router = Router();

router.use(isAuth);
router.post('/', createItem);
router.get('/', getItems);
router.get('/:itemId', getItem);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

export default router;
