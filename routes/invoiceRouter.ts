import { Router } from 'express';
import {
  createInvoice,
  getInvoicesByOwner,
} from '../controllers/invoiceController.js';

const router: Router = Router();

router.post('/', createInvoice);
router.get('/', getInvoicesByOwner);

export default router;
