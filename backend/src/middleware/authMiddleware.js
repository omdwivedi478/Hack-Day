import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'farmdirect_jwt_secret_dev_key_2026';
      const decoded = jwt.verify(token, secret);

      // Attempt to load from DB if available
      try {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          req.user = user;
          return next();
        }
      } catch {
        // Fallback for mocked/token payload user if DB unavailable
      }

      req.user = {
        _id: decoded.id,
        id: decoded.id,
        role: decoded.role || 'buyer'
      };
      return next();
    } catch {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no authorization token provided'
    });
  }
};

export const optionalProtect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'farmdirect_jwt_secret_dev_key_2026';
      const decoded = jwt.verify(token, secret);

      try {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          req.user = user;
          return next();
        }
      } catch {
        // Fallback for mocked/token payload
      }

      req.user = {
        _id: decoded.id,
        id: decoded.id,
        role: decoded.role || 'buyer'
      };
      return next();
    } catch {
      // Continue unauthenticated on invalid token
      return next();
    }
  }
  next();
};

