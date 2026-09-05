export const suggestedQuestions = [
  "What should I grow next month?",
  "How should I price my tomatoes?",
  "What crops have high demand?",
  "How can I improve my earnings?"
];

export const aiKnowledgeBase = {
  "What should I grow next month?": {
    reply: `Based on your regional agro-climatic zone (Western/Central India) and current seasonal demand forecasts for June-July:\n\n1. **Hybrid Tomatoes**: Tomato prices in northern and central mandis are projected to spike by 24% due to early monsoon delays in the south. Staggered transplanting in late May or early June with raised beds and mulching will yield premium prices by July.\n\n2. **Tender Okra (Bhindi)**: Fast turnaround crop (45-50 days to first picking). Steady B2B hospitality demand at ₹35-₹42/kg.\n\n3. **Coriander & Leafy Greens**: Short 30-day crop during monsoon onset. Market prices typically surge to ₹80-₹120/kg when rain creates temporary supply shortages.\n\n**Recommendation**: Dedicate 60% of irrigated acreage to high-demand solanaceous crops (tomatoes/brinjals) and 40% to quick leafy rotations.`,
    tags: ['Crop Planning', 'Seasonal Advisory', 'Monsoon Sowing']
  },
  "How should I price my tomatoes?": {
    reply: `Here is the current FarmDirect Price Intelligence breakdown for Hybrid Tomatoes in your area:\n\n- **Current FarmDirect Benchmark**: ₹38/kg (You take home ₹30/kg clean net)\n- **Traditional APMC Mandi Rate**: ₹18 - ₹22/kg at farm gate\n- **Metro Retail Consumer Price**: ₹45 - ₹48/kg\n\n**Pricing Recommendation**: \nSet your listing price between **₹36/kg and ₹39/kg**. At ₹38/kg, your net proceeds (₹30/kg) are **+66.7% higher** than mandi traders offer, while buyers still save ₹7 to ₹10/kg over supermarket prices.\n\n*Pro-tip: Offer a 5% volume tier for bulk orders exceeding 500 kg to attract institutional food services.*`,
    tags: ['Price Strategy', 'Fair Value', 'Tomato Benchmark']
  },
  "What crops have high demand?": {
    reply: `Top 4 high-demand commodities currently tracked on the FarmDirect Exchange:\n\n1. **Tomatoes**: High Demand (+24% YoY). Unseasonal rains caused localized rot in conventional supply chains; direct-to-buyer quality demand is intense.\n2. **Red Carrots (Pusa Rudhira)**: High Demand (+31% YoY). Heavy demand from cold-pressed juice companies and metro cloud kitchens.\n3. **Green Peas (Export Grade)**: High Demand (+19% YoY). Strong institutional bookings ahead of season wind-down.\n4. **1121 Traditional Basmati Rice**: Steady Demand (+8% YoY). Stable domestic institutional demand combined with export shipments.\n\n*Would you like to list produce in one of these categories or view community buying pools?*`,
    tags: ['Market Demand', 'Trending Produce', 'Wholesale Inquiries']
  },
  "How can I improve my earnings?": {
    reply: `Here are 4 proven strategies for FarmDirect growers to maximize farm gate realization:\n\n1. **Bypass the 4-Tier Middleman Chain**: Traditional brokers and APMC intermediaries absorb 55-60% of the final consumer price. Selling directly on FarmDirect unlocks ₹30/kg on tomatoes vs ₹18/kg at the mandi.\n\n2. **Grade & Clean on Farm**: Crating Grade-1 produce with standard wash increases buyer willingness-to-pay by 18-22%.\n\n3. **Participate in Community Buying Pools**: Fulfilling pooled neighborhood orders guarantees 100% inventory absorption in a single pickup trip, eliminating post-harvest spoilage.\n\n4. **Get Certified & Highlight Organic Practices**: FarmDirect buyers pay an average 25% premium for PGS-India Green or NPOP certified pesticide-free vegetables.`,
    tags: ['Farmer Profitability', 'Direct Sales', 'Post-Harvest Optimization']
  }
};

export const defaultAiGreeting = {
  id: 'msg-welcome',
  sender: 'ai',
  text: `Hello! I'm **FarmDirect AI**, your intelligent farming assistant. I analyze live mandi market rates, seasonal weather trends, and supply chain data to help you optimize crop planning, set transparent prices, and grow your earnings.\n\nHow can I help you today?`,
  timestamp: new Date().toISOString()
};

export const getAiResponse = (query) => {
  const normalized = query.trim();
  // Exact match
  if (aiKnowledgeBase[normalized]) {
    return aiKnowledgeBase[normalized].reply;
  }
  // Keyword matching
  const lower = normalized.toLowerCase();
  if (lower.includes('grow') || lower.includes('plant') || lower.includes('crop') || lower.includes('month') || lower.includes('season')) {
    return aiKnowledgeBase["What should I grow next month?"].reply;
  }
  if (lower.includes('price') || lower.includes('tomato') || lower.includes('rate') || lower.includes('mandi') || lower.includes('cost')) {
    return aiKnowledgeBase["How should I price my tomatoes?"].reply;
  }
  if (lower.includes('demand') || lower.includes('trend') || lower.includes('popular') || lower.includes('need')) {
    return aiKnowledgeBase["What crops have high demand?"].reply;
  }
  if (lower.includes('earning') || lower.includes('profit') || lower.includes('money') || lower.includes('income') || lower.includes('save')) {
    return aiKnowledgeBase["How can I improve my earnings?"].reply;
  }

  return `Based on live agricultural telemetry and FarmDirect trading patterns for "${query}":\n\n- Direct farm procurement continues to deliver 35-50% higher profit margins to growers while saving retail consumers 15-20%.\n- Quality grading, pre-cooled crating, and direct buyer logistics reduce post-harvest shrinkage from 22% down to under 3%.\n\nYou can also explore the **Price Intelligence** or **Demand Insights** dashboards for detailed mandi comparisons and localized demand forecasts.`;
};
