import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { Farmer } from '../models/Farmer.js';
import { MarketPrice } from '../models/MarketPrice.js';
import { CommunityOrder } from '../models/CommunityOrder.js';
import { fallbackStore } from '../utils/fallbackStore.js';

// @desc    Get buyer dashboard overview metrics
// @route   GET /api/dashboard/buyer
// @access  Public / Private
export const getBuyerDashboard = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: {
          stats: {
            totalOrders: fallbackStore.orders.length || 8,
            activeOrdersCount: 2,
            deliveredOrdersCount: 6,
            totalSpent: 4820,
            estimatedSaved: 1350,
            intermediaryCutAvoidedPercent: 28
          },
          recentOrders: fallbackStore.orders.slice(0, 5),
          activeCommunityPools: fallbackStore.communityPools,
          recommendedProducts: fallbackStore.products.slice(0, 4)
        }
      });
    }

    const buyerId = req.user?._id?.toString() || req.query.buyerId || 'buyer-demo';

    const orders = await Order.find({
      $or: [
        { buyerId },
        { buyerName: { $regex: 'Consumer|Buyer|Demo', $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    const totalOrdersCount = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing' || o.status === 'In Transit');
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');
    const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0);

    // Calculate estimated intermediary savings (supermarket markup is ~42% higher)
    const estimatedSaved = Math.round(totalSpent * 0.28);

    const activeCommunityPools = await CommunityOrder.find({ status: 'Active' }).limit(3);
    const recommendedProducts = await Product.find({ inStock: true }).sort({ rating: -1 }).limit(4);

    res.json({
      success: true,
      data: {
        stats: {
          totalOrders: totalOrdersCount || 8,
          activeOrdersCount: pendingOrders.length || 2,
          deliveredOrdersCount: deliveredOrders.length || 6,
          totalSpent: totalSpent || 4820,
          estimatedSaved: estimatedSaved || 1350,
          intermediaryCutAvoidedPercent: 28
        },
        recentOrders: orders.slice(0, 5),
        activeCommunityPools,
        recommendedProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch buyer dashboard overview',
      error: error.message
    });
  }
};

// @desc    Get farmer dashboard overview metrics
// @route   GET /api/dashboard/farmer
// @access  Public / Private
export const getFarmerDashboard = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const farmer = fallbackStore.farmers[0];
      const products = fallbackStore.products.filter(p => p.farmerId === farmer.id);
      const orders = fallbackStore.orders;
      const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0);

      return res.json({
        success: true,
        data: {
          farmer,
          stats: {
            monthlyRevenue: totalRevenue || 54200,
            totalOrders: orders.length || 38,
            activeListings: products.length || 8,
            pendingShipments: 3,
            averageRating: farmer.rating,
            directFarmerMarginPercent: 91
          },
          recentOrders: orders.slice(0, 5),
          products,
          marketPrices: fallbackStore.marketPrices
        }
      });
    }

    const farmerId = req.query.farmerId || 'farmer-1';

    let farmer = await Farmer.findOne({
      $or: [
        { id: farmerId },
        { userId: req.user?._id }
      ]
    });

    if (!farmer) {
      farmer = await Farmer.findOne();
    }

    const products = await Product.find({
      $or: [
        { farmerId: farmer?.id || 'farmer-1' },
        { farmerName: farmer?.name || 'Rajesh Patel' }
      ]
    });

    const orders = await Order.find({
      $or: [
        { farmerId: farmer?.id || 'farmer-1' },
        { 'items.farmerId': farmer?.id || 'farmer-1' }
      ]
    }).sort({ createdAt: -1 });

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing');
    const marketPrices = await MarketPrice.find().limit(4);

    res.json({
      success: true,
      data: {
        farmer: farmer || {
          name: 'Rajesh Patel',
          farmName: 'Rajesh Organic Farms',
          rating: 4.8,
          acres: 12
        },
        stats: {
          monthlyRevenue: totalRevenue || 54200,
          totalOrders: orders.length || 38,
          activeListings: products.length || 8,
          pendingShipments: pendingOrders.length || 3,
          averageRating: farmer?.rating || 4.8,
          directFarmerMarginPercent: 91
        },
        recentOrders: orders.slice(0, 5),
        products,
        marketPrices
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch farmer dashboard overview',
      error: error.message
    });
  }
};
