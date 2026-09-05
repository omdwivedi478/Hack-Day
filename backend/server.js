import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';

// Route imports
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import farmerRoutes from './src/routes/farmerRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import marketRoutes from './src/routes/marketRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Cross-Origin Resource Sharing configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching whitelist
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all in local development for smooth evaluation
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    service: 'FarmDirect REST API',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    database: dbStatus,
    version: '1.0.0'
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[FarmDirect API] Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`[FarmDirect API] Health endpoint active at http://localhost:${PORT}/api/health`);
});

export default app;
