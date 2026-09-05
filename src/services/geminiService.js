// FarmDirect Gemini AI Service
// Handles client-side and backend-proxied communication with Google Gemini API

import { apiClient } from '../utils/apiClient';

const GEMINI_KEY_STORAGE = 'farmdirect_gemini_key';

export const geminiService = {
  getApiKey: () => {
    try {
      const stored = localStorage.getItem(GEMINI_KEY_STORAGE);
      if (stored && stored.trim()) return stored.trim();
    } catch {
      // Storage unavailable
    }
    return (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  },

  setApiKey: (key) => {
    try {
      if (key && key.trim()) {
        localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
      } else {
        localStorage.removeItem(GEMINI_KEY_STORAGE);
      }
    } catch (e) {
      console.warn('LocalStorage error saving Gemini key', e);
    }
  },

  hasApiKey: () => {
    const key = geminiService.getApiKey();
    return Boolean(key && key !== '<your_gemini_api_key>' && key !== 'YOUR_GEMINI_API_KEY');
  },

  sendMessage: async ({ message, history = [], userRole = 'Buyer', context = {} }) => {
    const apiKey = geminiService.getApiKey();

    // 1. Try sending to FarmDirect Backend AI proxy first
    try {
      const backendRes = await apiClient.post('/ai/chat', {
        message,
        history,
        userRole,
        apiKey,
        context
      });

      if (backendRes.success && backendRes.reply) {
        return {
          reply: backendRes.reply,
          model: backendRes.model || 'gemini-1.5-flash',
          poweredBy: backendRes.poweredBy || 'Google Gemini AI',
          isLocalFallback: Boolean(backendRes.isLocalFallback),
          requiresKeyNotice: backendRes.requiresKeyNotice
        };
      }
    } catch (err) {
      console.warn('[GeminiService] Backend proxy failed, attempting direct Gemini fetch:', err.message);
    }

    // 2. Direct browser fetch to Gemini if API key is present and backend is offline
    if (apiKey) {
      try {
        const directRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                ...history.slice(-4).map(h => ({
                  role: h.sender === 'user' ? 'user' : 'model',
                  parts: [{ text: h.text }]
                })),
                { role: 'user', parts: [{ text: message }] }
              ],
              systemInstruction: {
                parts: [
                  {
                    text: `You are FarmDirect AI, an agricultural and buyer-communication assistant for the FarmDirect marketplace in India.
Current User Role: ${userRole}. Help buyers find fresh produce, understand fair pricing (farmers get 80-90% directly), and communicate directly with verified growers.`
                  }
                ]
              }
            })
          }
        );

        if (directRes.ok) {
          const directData = await directRes.json();
          const replyText = directData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return {
              reply: replyText.trim(),
              model: 'gemini-1.5-flash',
              poweredBy: 'Google Gemini AI (Direct)',
              isLocalFallback: false
            };
          }
        }
      } catch (directErr) {
        console.warn('[GeminiService] Direct Gemini call failed:', directErr.message);
      }
    }

    // 3. Fallback agricultural advice
    return {
      reply: `**FarmDirect Agri-Assistant**:\n\nRegarding "${message}":\n\n- FarmDirect connects buyers directly with certified growers across India with zero middleman deductions.\n- All orders are secured by direct escrow until doorstep receipt.\n\n*Add your Gemini API key in chat settings or .env to activate live Google Gemini intelligence!*`,
      model: 'FarmDirect-LocalAgri',
      poweredBy: 'FarmDirect Knowledge Base',
      isLocalFallback: true,
      requiresKeyNotice: 'Add your Gemini API Key to enable live conversational intelligence.'
    };
  }
};
