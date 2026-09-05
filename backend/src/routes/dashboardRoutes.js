import express from 'express';
import { getBuyerDashboard, getFarmerDashboard } from '../controllers/dashboardController.js';
import { optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/buyer', optionalProtect, getBuyerDashboard);
router.get('/farmer', optionalProtect, getFarmerDashboard);

export default router;
