import { Router } from 'express';
import { createInvoice } from '../controllers/invoiceController.js';

const router: Router = Router();

router.post('/', createInvoice);
