import express from 'express';
import {
  getFarmers,
  getFarmerById,
  getFarmerProducts,
  getFarmerDashboard,
  getFarmerEarnings,
  updateFarmerProfile
} from '../controllers/farmerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireFarmer } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Specific routes before param :id
router.get('/dashboard', protect, requireFarmer, getFarmerDashboard);
router.get('/earnings', protect, requireFarmer, getFarmerEarnings);
router.put('/profile', protect, requireFarmer, updateFarmerProfile);

// Public listings
router.get('/', getFarmers);
router.get('/:id', getFarmerById);
router.get('/:id/products', getFarmerProducts);

export default router;
