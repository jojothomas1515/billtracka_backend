import { Router } from 'express';
import {
  createInvoice,
  getInvoicesByOwner,
  updateInvoice,
  getInvoiceById,
  deleteInvoiceById,
  invoicePaidById,
} from '../controllers/invoiceController.js';
import { isAuth } from '../middleware/isAuthenticated.js';
import { pay, verifyPayment } from '../controllers/paymentController.js';

const router: Router = Router();
const authenticated: Router = Router();

// TODO: Add auth middleware
router.get('/:id([\\w-]+)', getInvoiceById);
router.put('/:id([\\w-]+)/paid', invoicePaidById);
router.get('/:id([\\w-]+)/pay', pay);
router.post('/webhook', verifyPayment);
authenticated.use(isAuth);
authenticated.post('/', createInvoice);
authenticated.get('/', getInvoicesByOwner);
authenticated.put('/:id([\\w-]+)', updateInvoice);
authenticated.delete('/:id([\\w-]+)', deleteInvoiceById);

router.use(authenticated);

export default router;
