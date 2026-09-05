export const initialDemandInsights = {
  forecasts: [
    {
      commodity: 'Tomatoes',
      demandLevel: 'High', // 'High', 'Medium', 'Low'
      changePercent: 24,
      trend: 'up',
      projectedNeed: '18,500 MT',
      primaryDriver: 'Festive season & northern supply deficit',
      confidence: 94,
      color: '#16A34A'
    },
    {
      commodity: 'Onions',
      demandLevel: 'Medium',
      changePercent: 12,
      trend: 'up',
      projectedNeed: '24,000 MT',
      primaryDriver: 'Stable restaurant consumption & export quotas',
      confidence: 89,
      color: '#2563EB'
    },
    {
      commodity: 'Potatoes',
      demandLevel: 'Low',
      changePercent: -8,
      trend: 'down',
      projectedNeed: '31,000 MT',
      primaryDriver: 'High cold storage inventory discharge',
      confidence: 86,
      color: '#F59E0B'
    },
    {
      commodity: 'Carrots',
      demandLevel: 'High',
      changePercent: 31,
      trend: 'up',
      projectedNeed: '8,200 MT',
      primaryDriver: 'Juice processing plants & health food demand',
      confidence: 91,
      color: '#16A34A'
    },
    {
      commodity: 'Green Peas',
      demandLevel: 'High',
      changePercent: 19,
      trend: 'up',
      projectedNeed: '6,400 MT',
      primaryDriver: 'Quick freeze packers booking contracts',
      confidence: 88,
      color: '#16A34A'
    },
    {
      commodity: 'Basmati Rice',
      demandLevel: 'Medium',
      changePercent: 8,
      trend: 'up',
      projectedNeed: '45,000 MT',
      primaryDriver: 'Middle-east export demand and wedding season',
      confidence: 92,
      color: '#2563EB'
    }
  ],
  monthlyDemandTrends: [
    { month: 'Jan', tomatoes: 120, onions: 140, potatoes: 180 },
    { month: 'Feb', tomatoes: 135, onions: 145, potatoes: 175 },
    { month: 'Mar', tomatoes: 140, onions: 150, potatoes: 170 },
    { month: 'Apr', tomatoes: 160, onions: 155, potatoes: 160 },
    { month: 'May', tomatoes: 185, onions: 165, potatoes: 155 },
    { month: 'Jun', tomatoes: 210, onions: 175, potatoes: 150 },
    { month: 'Jul', tomatoes: 230, onions: 190, potatoes: 165 },
  ],
  aiRecommendations: [
    {
      title: 'High Tomato Demand Alert for June-July',
      description: 'Based on historical demand patterns and seasonal monsoon arrivals, central Indian tomato demand will outstrip local APMC supply by 28%. Farmers with drip irrigation are advised to prioritize staggered tomato transplanting now.',
      action: 'View Planting Schedule',
      urgency: 'Immediate'
    },
    {
      title: 'Hold Potato Cold Storage Release',
      description: 'Indore and Agra mandi potato arrivals are near multi-year highs. Holding stored tubers for 4 weeks will yield an estimated +18% price realization as current glut subsides.',
      action: 'Review Storage Strategy',
      urgency: 'Medium'
    },
    {
      title: 'Opportunity: Pre-book Export Quality Basmati',
      description: 'Punjab 1121 Basmati inquiries from GCC buyers have increased by 34% this week. Lock in advance contract procurement at ₹72/kg farm gate price.',
      action: 'Review Export Demand',
      urgency: 'High'
    }
  ]
};
