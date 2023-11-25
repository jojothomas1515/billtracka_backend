import { Router } from 'express';
import {
  createInvoice,
  getInvoicesByOwner,
  updateInvoice,
} from '../controllers/invoiceController.js';

const router: Router = Router();

router.post('/', createInvoice);
router.get('/', getInvoicesByOwner);
router.post('/:id(\\w+)', updateInvoice);

export default router;
