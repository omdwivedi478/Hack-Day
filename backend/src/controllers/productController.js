import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { fallbackStore } from '../utils/fallbackStore.js';

// @desc    Get all products with filtering & search
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      q,
      maxPrice,
      organicOnly,
      minRating,
      sort
    } = req.query;

    // Graceful offline fallback if MongoDB is not connected
    if (mongoose.connection.readyState !== 1) {
      let list = [...fallbackStore.products];
      if (category && category !== 'All') {
        if (category.toLowerCase() === 'organic') {
          list = list.filter(p => p.isOrganic);
        } else {
          list = list.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        }
      }
      if (organicOnly === 'true') {
        list = list.filter(p => p.isOrganic);
      }
      if (maxPrice) {
        list = list.filter(p => p.price <= Number(maxPrice));
      }
      if (minRating) {
        list = list.filter(p => p.rating >= Number(minRating));
      }
      if (q && q.trim()) {
        const term = q.trim().toLowerCase();
        list = list.filter(p =>
          p.name?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.farmerName?.toLowerCase().includes(term) ||
          p.location?.toLowerCase().includes(term)
        );
      }
      return res.json({
        success: true,
        count: list.length,
        data: list
      });
    }

    const filter = {};

    if (category && category !== 'All') {
      if (category.toLowerCase() === 'organic') {
        filter.organic = true;
      } else {
        filter.category = new RegExp(`^${category}$`, 'i');
      }
    }

    if (organicOnly === 'true') {
      filter.organic = true;
    }

    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    if (q && q.trim()) {
      const searchRegex = new RegExp(q.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { category: searchRegex },
        { farmerName: searchRegex },
        { location: searchRegex },
        { variety: searchRegex }
      ];
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === 'price_asc') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price_desc') {
      query = query.sort({ price: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const products = await query;

    // Map _id to id for seamless frontend consumption
    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString(),
      availableQty: p.stock,
      isOrganic: p.organic
    }));

    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = fallbackStore.products.find(
        p => p.id === req.params.id || p._id === req.params.id
      );
      if (!found) {
        return res.status(404).json({
          success: false,
          message: 'Produce listing not found'
        });
      }
      return res.json({
        success: true,
        data: found
      });
    }

    let product;

    // Check if valid ObjectId or query by custom ID
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.id);
    } else {
      product = await Product.findOne({
        $or: [{ _id: req.params.id }, { farmerId: req.params.id }]
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produce listing not found'
      });
    }

    const formatted = {
      ...product.toObject(),
      id: product._id.toString(),
      availableQty: product.stock,
      isOrganic: product.organic
    };

    res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product listing
// @route   POST /api/products
// @access  Private (Farmer / Admin)
export const createProduct = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const newId = `prod-${Date.now()}`;
      const newProduct = {
        id: newId,
        _id: newId,
        ...req.body,
        inStock: true,
        rating: 4.9,
        reviewsCount: 1
      };
      fallbackStore.products.unshift(newProduct);
      return res.status(201).json({
        success: true,
        message: 'Product listing created successfully',
        data: newProduct
      });
    }

    const {
      name,
      category,
      variety = 'Standard',
      grade = 'Grade A',
      qualityGrade,
      shelfLife = '5 - 7 Days',
      minOrderQty = '5 kg',
      minimumOrderQuantity,
      availableQty = 100,
      stock,
      unit = 'kg',
      price,
      location = 'Bhopal, Madhya Pradesh',
      state = 'Madhya Pradesh',
      description = '',
      isOrganic = false,
      organic,
      image = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      farmerName,
      farmName
    } = req.body;

    const numPrice = Number(price);
    const numStock = Number(availableQty || stock || 100);

    const product = await Product.create({
      farmerId: req.user?._id?.toString() || req.body.farmerId || 'farmer-1',
      farmerName: farmerName || req.user?.name || 'Verified Farmer',
      farmName: farmName || req.user?.farmName || 'Direct Farm',
      name,
      category: category || 'Vegetables',
      variety,
      qualityGrade: qualityGrade || grade,
      shelfLife,
      location,
      state,
      price: numPrice,
      unit,
      stock: numStock,
      minimumOrderQuantity: minimumOrderQuantity || minOrderQty,
      image,
      organic: organic !== undefined ? organic : isOrganic,
      description,
      marketPrice: Math.round(numPrice * 1.25),
      farmerPrice: Math.round(numPrice * 0.79),
      logisticsFee: 4,
      platformFee: 4,
      rating: 5.0,
      reviewsCount: 0
    });

    const formatted = {
      ...product.toObject(),
      id: product._id.toString(),
      availableQty: product.stock,
      isOrganic: product.organic
    };

    res.status(201).json({
      success: true,
      message: 'Produce published to marketplace successfully',
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product listing or stock
// @route   PUT /api/products/:id
// @access  Private (Farmer / Admin)
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produce listing not found'
      });
    }

    // Convert frontend field names if present
    const updates = { ...req.body };
    if (updates.availableQty !== undefined) {
      updates.stock = Number(updates.availableQty);
    }
    if (updates.isOrganic !== undefined) {
      updates.organic = updates.isOrganic;
    }
    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
      updates.farmerPrice = Math.round(updates.price * 0.79);
      updates.marketPrice = Math.round(updates.price * 1.25);
    }

    product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    const formatted = {
      ...product.toObject(),
      id: product._id.toString(),
      availableQty: product.stock,
      isOrganic: product.organic
    };

    res.json({
      success: true,
      message: 'Produce updated successfully',
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product listing
// @route   DELETE /api/products/:id
// @access  Private (Farmer / Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produce listing not found'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product removed from marketplace'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by farmer ID
// @route   GET /api/products/farmer/:farmerId
// @access  Public
export const getProductsByFarmer = async (req, res, next) => {
  try {
    const products = await Product.find({ farmerId: req.params.farmerId });

    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString(),
      availableQty: p.stock,
      isOrganic: p.organic
    }));

    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};
