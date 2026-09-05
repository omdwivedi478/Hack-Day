import mongoose from 'mongoose';
import { MarketPrice } from '../models/MarketPrice.js';
import { CommunityOrder } from '../models/CommunityOrder.js';
import { fallbackStore } from '../utils/fallbackStore.js';

// Helper to find pool by custom id or Mongo ObjectId
const findPoolByIdOrCustomId = async (idParam) => {
  if (!idParam) return null;
  if (mongoose.connection.readyState !== 1) {
    return fallbackStore.communityPools.find(p => p.id === idParam || p._id === idParam) || null;
  }
  let pool = await CommunityOrder.findOne({ id: idParam });
  if (!pool && mongoose.isValidObjectId(idParam)) {
    pool = await CommunityOrder.findById(idParam);
  }
  return pool;
};

// @desc    Get APMC Mandi vs FarmDirect benchmark market prices
// @route   GET /api/market/prices
// @access  Public
export const getMarketPrices = async (req, res) => {
  try {
    const { commodity, location, trend } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let list = [...fallbackStore.marketPrices];
      if (commodity) {
        list = list.filter(p => p.commodity?.toLowerCase().includes(commodity.toLowerCase()));
      }
      if (location) {
        list = list.filter(p => p.location?.toLowerCase().includes(location.toLowerCase()));
      }
      if (trend) {
        list = list.filter(p => p.trend === trend);
      }
      return res.json({
        success: true,
        count: list.length,
        data: list
      });
    }

    let query = {};

    if (commodity) {
      query.commodity = new RegExp(commodity, 'i');
    }

    if (location) {
      query.location = new RegExp(location, 'i');
    }

    if (trend) {
      query.trend = trend;
    }

    const prices = await MarketPrice.find(query).sort({ commodity: 1 });

    res.json({
      success: true,
      count: prices.length,
      data: prices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch market prices',
      error: error.message
    });
  }
};

// @desc    Get single commodity price intelligence & history
// @route   GET /api/market/prices/:id
// @access  Public
export const getMarketPriceById = async (req, res) => {
  try {
    const { id } = req.params;
    let price = null;
    if (mongoose.connection.readyState !== 1) {
      price = fallbackStore.marketPrices.find(p => p.id === id || p._id === id);
    } else {
      price = await MarketPrice.findOne({ id });
      if (!price && mongoose.isValidObjectId(id)) {
        price = await MarketPrice.findById(id);
      }
    }

    if (!price) {
      return res.status(404).json({
        success: false,
        message: 'Commodity price intelligence not found'
      });
    }

    res.json({
      success: true,
      data: price
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch market price details',
      error: error.message
    });
  }
};

// @desc    Get active community buying pools
// @route   GET /api/market/community
// @access  Public
export const getCommunityPools = async (req, res) => {
  try {
    const { status } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let list = [...fallbackStore.communityPools];
      if (status && status !== 'All') {
        list = list.filter(p => p.status === status);
      }
      return res.json({
        success: true,
        count: list.length,
        data: list
      });
    }

    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const pools = await CommunityOrder.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: pools.length,
      data: pools
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch community buying pools',
      error: error.message
    });
  }
};

// @desc    Join a community buying pool with pledge kg
// @route   POST /api/market/community/:id/join
// @access  Public / Private
export const joinCommunityPool = async (req, res) => {
  try {
    const { id } = req.params;
    const { pledgeKg = 5 } = req.body;

    const pool = await findPoolByIdOrCustomId(id);
    if (!pool) {
      return res.status(404).json({
        success: false,
        message: 'Community pool not found'
      });
    }

    const addedKg = Number(pledgeKg) || 1;
    pool.currentDemandKg = (pool.currentDemandKg || 0) + addedKg;
    pool.participantsCount = (pool.participantsCount || 0) + 1;

    // Check if target unlocked
    if (pool.currentDemandKg >= pool.targetKg && pool.status === 'Active') {
      pool.status = 'Unlocked';
    }

    if (typeof pool.save === 'function') {
      await pool.save();
    }

    res.json({
      success: true,
      message: `Successfully pledged ${addedKg} kg to ${pool.productName} pool!`,
      data: pool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to join community pool',
      error: error.message
    });
  }
};

// @desc    Get high-level demand forecast insights
// @route   GET /api/market/insights
// @access  Public
export const getDemandInsights = async (req, res) => {
  try {
    const insights = [
      {
        id: 'dem-1',
        commodity: 'Red Onions',
        currentDemand: 'Very High (+38%)',
        recommendedAction: 'Hold for 4-5 days; mandi terminal arrivals dropping',
        predictedPeakDate: 'May 18, 2026',
        confidenceScore: 94
      },
      {
        id: 'dem-2',
        commodity: 'Green Capsicum',
        currentDemand: 'Moderate (+12%)',
        recommendedAction: 'Direct harvest dispatch recommended before weekend',
        predictedPeakDate: 'May 12, 2026',
        confidenceScore: 88
      },
      {
        id: 'dem-3',
        commodity: 'Cherry Tomatoes',
        currentDemand: 'Surging (+45%)',
        recommendedAction: 'List small crates (250g-1kg) for premium metro buyers',
        predictedPeakDate: 'May 14, 2026',
        confidenceScore: 96
      }
    ];

    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch demand insights',
      error: error.message
    });
  }
};
