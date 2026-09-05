import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';
import { optionalProtect, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(optionalProtect, createOrder)
  .get(getOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/status')
  .put(protect, updateOrderStatus);

export default router;
