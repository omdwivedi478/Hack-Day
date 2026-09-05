import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByFarmer
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireFarmer } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/farmer/:farmerId', getProductsByFarmer);
router.get('/:id', getProductById);

router.post('/', protect, requireFarmer, createProduct);
router.put('/:id', protect, requireFarmer, updateProduct);
router.delete('/:id', protect, requireFarmer, deleteProduct);

export default router;
