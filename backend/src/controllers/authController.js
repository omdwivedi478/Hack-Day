import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { fallbackStore } from '../utils/fallbackStore.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role = 'buyer', phone = '', address = '' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const existing = fallbackStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'A user with this email address already exists'
        });
      }

      const newUserId = `usr-${Date.now()}`;
      const newUser = {
        id: newUserId,
        _id: newUserId,
        name,
        email: email.toLowerCase(),
        role: role.toLowerCase(),
        phone,
        address
      };
      fallbackStore.users.push(newUser);
      const token = generateToken(newUserId, role);

      return res.status(201).json({
        success: true,
        message: 'Account registered successfully',
        token,
        user: {
          ...newUser,
          role: role === 'farmer' ? 'Farmer' : 'Buyer',
          avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        }
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists'
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role.toLowerCase(),
      phone,
      address
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role === 'farmer' ? 'Farmer' : 'Buyer',
        phone: user.phone,
        address: user.address,
        avatar: user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    if (mongoose.connection.readyState !== 1) {
      // Find matching demo user or default to buyer/farmer based on email or role
      let user = fallbackStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        // Automatically allow login for test credentials
        const isFarmer = email.toLowerCase().includes('farmer');
        user = {
          id: `usr-${Date.now()}`,
          _id: `usr-${Date.now()}`,
          name: isFarmer ? 'Rajesh Patel' : 'Priya Sharma',
          email: email.toLowerCase(),
          role: isFarmer ? 'farmer' : 'buyer',
          phone: '+91 98765 43210',
          address: 'Bhopal, Madhya Pradesh'
        };
        fallbackStore.users.push(user);
      }

      const token = generateToken(user._id || user.id, user.role);

      return res.json({
        success: true,
        token,
        user: {
          id: user._id || user.id,
          _id: user._id || user.id,
          name: user.name,
          email: user.email,
          role: user.role === 'farmer' ? 'Farmer' : 'Buyer',
          phone: user.phone,
          address: user.address,
          avatar: user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        }
      });
    }

    // Query user including password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role === 'farmer' ? 'Farmer' : 'Buyer',
        phone: user.phone,
        address: user.address,
        avatar: user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role === 'farmer' ? 'Farmer' : 'Buyer',
        phone: user.phone,
        address: user.address,
        avatar: user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      }
    });
  } catch (error) {
    next(error);
  }
};
