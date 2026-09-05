import mongoose from 'mongoose';
import { Farmer } from '../models/Farmer.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { fallbackStore } from '../utils/fallbackStore.js';

// Helper to find farmer by custom id or Mongo ObjectId
const findFarmerByIdOrCustomId = async (idParam) => {
  if (!idParam) return null;
  if (mongoose.connection.readyState !== 1) {
    return fallbackStore.farmers.find(f => f.id === idParam || f._id === idParam) || null;
  }
  let farmer = await Farmer.findOne({ id: idParam });
  if (!farmer && mongoose.isValidObjectId(idParam)) {
    farmer = await Farmer.findById(idParam);
  }
  return farmer;
};

// @desc    Get all farmers with optional filtering
// @route   GET /api/farmers
// @access  Public
export const getFarmers = async (req, res) => {
  try {
    const { search, state, minRating, sort } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let list = [...fallbackStore.farmers];
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(f =>
          f.name?.toLowerCase().includes(s) ||
          f.farmName?.toLowerCase().includes(s) ||
          f.location?.toLowerCase().includes(s)
        );
      }
      if (state && state !== 'All') {
        list = list.filter(f => f.state?.toLowerCase().includes(state.toLowerCase()));
      }
      if (minRating) {
        list = list.filter(f => f.rating >= Number(minRating));
      }
      return res.json({
        success: true,
        count: list.length,
        data: list
      });
    }

    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { farmerName: searchRegex },
        { farmName: searchRegex },
        { location: searchRegex },
        { specialtyCrops: { $in: [searchRegex] } }
      ];
    }

    if (state && state !== 'All') {
      query.state = new RegExp(state, 'i');
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    let sortOptions = { rating: -1 };
    if (sort === 'orders') sortOptions = { ordersCount: -1 };
    if (sort === 'experience') sortOptions = { experienceYears: -1 };
    if (sort === 'distance') sortOptions = { distanceKm: 1 };
    if (sort === 'rating') sortOptions = { rating: -1 };

    const farmers = await Farmer.find(query).sort(sortOptions);

    res.json({
      success: true,
      count: farmers.length,
      data: farmers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch farmers',
      error: error.message
    });
  }
};

// @desc    Get single farmer details by ID
// @route   GET /api/farmers/:id
// @access  Public
export const getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await findFarmerByIdOrCustomId(id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    let products = [];
    if (mongoose.connection.readyState !== 1) {
      products = fallbackStore.products.filter(
        p => p.farmerId === farmer.id || p.farmerId === farmer._id || p.farmerName === farmer.name
      );
    } else {
      products = await Product.find({
        $or: [
          { farmerId: farmer.id },
          { farmerId: farmer._id.toString() },
          { farmerName: farmer.name }
        ]
      });
    }

    const farmerData = typeof farmer.toJSON === 'function' ? farmer.toJSON() : farmer;

    res.json({
      success: true,
      data: {
        ...farmerData,
        products
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch farmer profile',
      error: error.message
    });
  }
};

// @desc    Get products for a specific farmer
// @route   GET /api/farmers/:id/products
// @access  Public
export const getFarmerProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await findFarmerByIdOrCustomId(id);

    let products = [];
    if (mongoose.connection.readyState !== 1) {
      products = fallbackStore.products.filter(
        p => p.farmerId === id || (farmer && (p.farmerId === farmer.id || p.farmerName === farmer.name))
      );
    } else {
      const filter = farmer
        ? {
            $or: [
              { farmerId: farmer.id },
              { farmerId: farmer._id.toString() },
              { farmerName: farmer.name }
            ]
          }
        : { farmerId: id };

      products = await Product.find(filter);
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch farmer products',
      error: error.message
    });
  }
};

// @desc    Get authenticated farmer dashboard data
// @route   GET /api/farmers/dashboard
// @access  Private (Farmer)
export const getFarmerDashboard = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const farmer = fallbackStore.farmers[0];
      const products = fallbackStore.products.filter(p => p.farmerId === farmer.id);
      const orders = fallbackStore.orders;
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || order.total || 0), 0);

      return res.json({
        success: true,
        data: {
          farmer,
          stats: {
            totalRevenue: totalRevenue || 54200,
            totalOrders: orders.length || 38,
            activeListings: products.length || 4,
            pendingOrdersCount: 2,
            deliveredOrdersCount: 12,
            averageRating: farmer.rating
          },
          recentOrders: orders.slice(0, 5),
          products
        }
      });
    }

    const farmer = await Farmer.findOne({
      $or: [
        { userId: req.user?._id },
        { id: 'farmer-1' } // Fallback to primary demo farmer for testing
      ]
    });

    const farmerIdStr = farmer?.id || 'farmer-1';
    const products = await Product.find({
      $or: [
        { farmerId: farmerIdStr },
        { farmerName: farmer?.name || 'Rajesh Patel' }
      ]
    });

    const orders = await Order.find({
      $or: [
        { farmerId: farmerIdStr },
        { 'items.farmerId': farmerIdStr },
        { 'items.farmerName': farmer?.name || 'Rajesh Organic Farms' }
      ]
    }).sort({ createdAt: -1 });

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Placed');
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');

    res.json({
      success: true,
      data: {
        farmer: farmer || {
          name: req.user?.name || 'Rajesh Patel',
          farmName: 'Rajesh Organic Farms',
          rating: 4.8,
          acres: 12
        },
        stats: {
          totalRevenue,
          totalOrders: orders.length,
          activeListings: products.length,
          pendingOrdersCount: pendingOrders.length,
          deliveredOrdersCount: deliveredOrders.length,
          averageRating: farmer?.rating || 4.8
        },
        recentOrders: orders.slice(0, 5),
        products
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load farmer dashboard metrics',
      error: error.message
    });
  }
};

// @desc    Get farmer earnings & payout history
// @route   GET /api/farmers/earnings
// @access  Private (Farmer)
export const getFarmerEarnings = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: {
          totalEarned: 64200,
          pendingPayout: 3840,
          bankSettlement: 'State Bank of India (Ending in 4092)',
          settlements: [
            { id: 'SET-9821', date: '2026-03-01', amount: 14500, status: 'Settled', bankRef: 'NEFT-884920' },
            { id: 'SET-9820', date: '2026-02-22', amount: 19200, status: 'Settled', bankRef: 'NEFT-771239' },
            { id: 'SET-9819', date: '2026-02-15', amount: 8400, status: 'Settled', bankRef: 'NEFT-654921' }
          ]
        }
      });
    }

    const farmer = await Farmer.findOne({
      $or: [
        { userId: req.user?._id },
        { id: 'farmer-1' }
      ]
    });

    const farmerIdStr = farmer?.id || 'farmer-1';
    const orders = await Order.find({
      $or: [
        { farmerId: farmerIdStr },
        { 'items.farmerId': farmerIdStr }
      ]
    }).sort({ createdAt: -1 });

    const totalEarned = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingPayout = orders
      .filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    res.json({
      success: true,
      data: {
        totalEarned,
        pendingPayout,
        bankSettlement: farmer?.bankSettlement || 'State Bank of India (Ending in 4092)',
        settlements: [
          { id: 'SET-9821', date: '2026-03-01', amount: 14500, status: 'Settled', bankRef: 'NEFT-884920' },
          { id: 'SET-9820', date: '2026-02-22', amount: 19200, status: 'Settled', bankRef: 'NEFT-771239' },
          { id: 'SET-9819', date: '2026-02-15', amount: 8400, status: 'Settled', bankRef: 'NEFT-654921' }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch farmer earnings',
      error: error.message
    });
  }
};

// @desc    Update farmer profile
// @route   PUT /api/farmers/profile
// @access  Private (Farmer)
export const updateFarmerProfile = async (req, res) => {
  try {
    const updates = req.body;
    let farmer = await Farmer.findOne({
      $or: [
        { userId: req.user?._id },
        { id: req.body.id || 'farmer-1' }
      ]
    });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer profile not found'
      });
    }

    Object.assign(farmer, updates);
    await farmer.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: farmer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update farmer profile',
      error: error.message
    });
  }
};
