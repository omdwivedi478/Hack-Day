import express from 'express';
import { handleAiChat } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', handleAiChat);

// GET /api/ai/status
router.get('/status', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);
  res.json({
    success: true,
    service: 'FarmDirect Gemini AI Service',
    configured: hasKey,
    defaultModel: 'gemini-1.5-flash'
  });
});

export default router;
