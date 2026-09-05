// FarmDirect AI Controller powered by Google Gemini API
// Enables intelligent buyer-farmer communication, crop planning, price transparency explanation & order queries

const FARMS_SYSTEM_PROMPT = `
You are "FarmDirect AI", the official intelligent assistant for FarmDirect (an agricultural marketplace connecting farmers directly with consumers and B2B buyers in India).

Core Mission of FarmDirect:
"Multiple intermediaries reduce farmers' earnings and increase consumer prices."
FarmDirect removes the traditional 4-tier middleman supply chain (traders, commission agents, regional wholesalers, local retailers).

Key Platform Facts:
1. Transparency Engine: On FarmDirect, farmers take home 80% to 90% of the price (e.g. ₹30/kg for tomatoes) compared to just 30-45% (₹18/kg) in APMC Mandis. Consumers also save 15-25% compared to supermarkets.
2. Verified Farmers on Platform:
   - Rajesh Patel (Rajesh Organic Farms, Bhopal, MP): Cherry & Hybrid Tomatoes, Red Onions, Sharbati Wheat, Papaya. (NPOP / Jaivik Bharat certified).
   - Balwinder Singh (Singh Heritage Agri, Ludhiana, Punjab): Shimla Royal Apples, Moong Dal, Basmati Rice.
   - Ramesh Patil (Sahyadri Agro, Nashik, Maharashtra): Nashik Red Onion, Table Grapes, Pomegranate.
   - Ananya Roy (Brahmaputra Organics, Jorhat, Assam): Premium CTC Tea, Bhut Jolokia, Wildflower Honey.
   - Suresh Kumar (Cauvery Bio Farms, Coimbatore, TN): Coconut Oil, Bananas, Robusta Coffee.
   - Vikramaditya Rathore (Malwa Crops, Indore, MP): Jyoti Potatoes, Green Peas, Soybean.
3. Key Products & Pricing:
   - Fresh Tomato: ₹38/kg (Mandi Avg: ₹45/kg, Farmer gets ₹30/kg)
   - Jyoti Potato: ₹26/kg (Mandi Avg: ₹34/kg, Farmer gets ₹20/kg)
   - Shimla Royal Apple: ₹145/kg (Mandi Avg: ₹195/kg, Farmer gets ₹120/kg)
   - Nashik Red Onion: ₹28/kg (Mandi Avg: ₹38/kg, Farmer gets ₹21/kg)
   - Green Peas: ₹68/kg (Mandi Avg: ₹85/kg, Farmer gets ₹56/kg)
4. Payment & Escrow Security: All buyer payments are securely held in escrow and only released to the farmer upon verified delivery at the doorstep.
5. Community Buying Pools: Groups of neighbors pool orders together to unlock farm-gate wholesale rates when target volume (e.g., 100 kg or 200 kg) is met.

Tone and Capabilities:
- Assist buyers in finding fresh, seasonal, and organic produce from verified growers.
- Facilitate communication between users and buyers/farmers (e.g. drafting inquiries, asking about harvest dates, negotiating bulk crate purchases, explaining transport safety).
- Keep responses friendly, helpful, concise, well-formatted with markdown, and focused on agriculture and fair trade.
- Always use INR currency symbol (₹) where appropriate.
`;

export const handleAiChat = async (req, res) => {
  try {
    const { message, history = [], userRole = 'Buyer', apiKey: clientApiKey } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Message text is required'
      });
    }

    // Determine Gemini API Key priority: client provided > backend env > frontend env
    const apiKey = (
      clientApiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      ''
    ).trim();

    // If no API key is provided, return intelligent domain fallback
    if (!apiKey || apiKey === '<your_gemini_api_key>' || apiKey === 'YOUR_GEMINI_API_KEY') {
      return res.json({
        success: true,
        reply: generateLocalFallbackReply(message, userRole),
        model: 'FarmDirect-LocalAgri-Engine',
        poweredBy: 'FarmDirect Knowledge Base',
        isLocalFallback: true,
        requiresKeyNotice: 'To enable live Google Gemini 1.5 Flash AI, add your GEMINI_API_KEY in .env or the Chat settings.'
      });
    }

    // Format conversation history for Gemini API
    const contents = [];

    // Add prior turns if available
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-6).forEach(h => {
        if (h.sender && h.text) {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        }
      });
    }

    // Append latest user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents,
      systemInstruction: {
        parts: [
          {
            text: `${FARMS_SYSTEM_PROMPT}\n\nCurrent User Context: The current user interacting with you is a ${userRole}. Help them communicate and trade effectively.`
          }
        ]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('[Gemini API Warning]', data?.error?.message || response.statusText);
      // If error is related to API key or model, inform user gracefully
      return res.json({
        success: true,
        reply: `${generateLocalFallbackReply(message, userRole)}\n\n*(Note: Gemini API returned: "${data?.error?.message || 'Authentication error'}". Serving from FarmDirect Knowledge Base.)*`,
        model: 'FarmDirect-Fallback',
        poweredBy: 'FarmDirect Knowledge Base (Gemini Offline)',
        isLocalFallback: true,
        apiError: data?.error?.message
      });
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return res.json({
        success: true,
        reply: generateLocalFallbackReply(message, userRole),
        model: 'FarmDirect-Fallback',
        poweredBy: 'FarmDirect Knowledge Base',
        isLocalFallback: true
      });
    }

    return res.json({
      success: true,
      reply: aiText.trim(),
      model: 'gemini-1.5-flash',
      poweredBy: 'Google Gemini AI',
      isLocalFallback: false
    });
  } catch (error) {
    console.error('[AI Chat Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process AI chat message',
      error: error.message
    });
  }
};

// Intelligent fallback responses when no Gemini API key is configured
function generateLocalFallbackReply(query, _userRole) {
  const lower = query.toLowerCase();

  if (lower.includes('buyer') || lower.includes('talk') || lower.includes('contact') || lower.includes('communicate') || lower.includes('message')) {
    return `**Communicating with Buyers on FarmDirect**:\n\n1. **Direct Farm Inquiries**: Buyers can ask about harvest dates, chemical pesticide status, and crate sizes.\n2. **Custom Bulk Orders**: For orders over 50 kg, farmers can offer 5-10% volume discounts.\n3. **Delivery Assurance**: Mention that produce is packed in refrigerated crates and dispatched within 4 hours of picking.\n\n*Would you like me to draft a direct offer message to a buyer?*`;
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('tomato') || lower.includes('rate') || lower.includes('mandi')) {
    return `**FarmDirect Price Intelligence**:\n\n- **Fresh Tomatoes**: ₹38/kg (Mandi baseline is ₹18-22/kg; farmer takes home **₹30/kg** clean net).\n- **Jyoti Potatoes**: ₹26/kg (Supermarket price is ₹34/kg; buyers save **23.5%**).\n- **Nashik Red Onions**: ₹28/kg (Farmer gets ₹21/kg).\n\nFarmDirect eliminates the 4-tier middleman markup, ensuring farmers earn up to **80-90%** of the shelf price while buyers get dawn-harvested freshness.`;
  }

  if (lower.includes('escrow') || lower.includes('payment') || lower.includes('safe') || lower.includes('guarantee')) {
    return `**Escrow Protection Guarantee**:\n\nEvery order on FarmDirect is protected by direct escrow:\n- Buyer payment is held securely in the **FarmDirect Settlement Vault** at checkout.\n- The farmer receives notification to harvest and crate produce.\n- Only after delivery confirmation at your doorstep is payment released directly to the farmer's bank account (e.g. State Bank of India).`;
  }

  if (lower.includes('farmer') || lower.includes('rajesh') || lower.includes('balwinder') || lower.includes('ramesh')) {
    return `**Verified FarmDirect Producers**:\n\n- **Rajesh Patel** (Bhopal, MP): 15 years organic soil stewardship. Specializes in Cherry Tomatoes & Papayas.\n- **Balwinder Singh** (Ludhiana, Punjab): 4th generation grower. Extra fancy Shimla Royal Apples.\n- **Ramesh Patil** (Nashik, Maharashtra): Water-stewardship certified dark red onions and table grapes.\n\nYou can view their full profiles, certifications, and customer reviews in the **Farmers Directory**.`;
  }

  return `Hello! I'm your **FarmDirect AI Assistant**, powered by agricultural intelligence.\n\nI can help you:\n- **Communicate with buyers & farmers** regarding bulk orders, harvest quality, and pricing.\n- **Analyze APMC Mandi rates** vs. FarmDirect transparent pricing.\n- **Track your orders** and understand our direct escrow payment system.\n\nWhat would you like to know or communicate today?`;
}
