import { Router } from 'express';
import {
  createInvoice,
  getInvoicesByOwner,
  updateInvoice,
  getInvoiceById,
} from '../controllers/invoiceController.js';
import { isAuth } from '../middleware/isAuthenticated.js';

const router: Router = Router();

// TODO: Add auth middleware
router.get('/:id([\\w-]+)', getInvoiceById);
router.use(isAuth);
router.post('/', createInvoice);
router.get('/', getInvoicesByOwner);
router.put('/:id([\\w-]+)', updateInvoice);

export default router;
