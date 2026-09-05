import express from 'express';
import {
  getMarketPrices,
  getMarketPriceById,
  getCommunityPools,
  joinCommunityPool,
  getDemandInsights
} from '../controllers/marketController.js';

const router = express.Router();

router.get('/prices', getMarketPrices);
router.get('/prices/:id', getMarketPriceById);
router.get('/community', getCommunityPools);
router.post('/community/:id/join', joinCommunityPool);
router.get('/insights', getDemandInsights);

export default router;
