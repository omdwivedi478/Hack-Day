import { initialMarketPrices } from '../data/mockMarketPrices';
import { initialDemandInsights } from '../data/mockDemandInsights';
import { initialCommunityPools } from '../data/mockCommunityPools';
import { getStorage, setStorage } from '../utils/storage';
import { apiClient } from '../utils/apiClient';

const POOLS_KEY = 'farmdirect_community_pools';
const PRICES_KEY = 'farmdirect_market_prices';

export const marketService = {
  getMarketPrices: () => {
    return getStorage(PRICES_KEY, initialMarketPrices);
  },

  fetchMarketPricesFromAPI: async () => {
    try {
      const response = await apiClient.get('/market/prices');
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        setStorage(PRICES_KEY, response.data);
        return response.data;
      }
    } catch (e) {
      console.warn('[MarketService] Backend offline, using cached market prices:', e.message);
    }
    return marketService.getMarketPrices();
  },

  getDemandInsights: () => {
    return initialDemandInsights;
  },

  getCommunityPools: () => {
    return getStorage(POOLS_KEY, initialCommunityPools);
  },

  fetchCommunityPoolsFromAPI: async () => {
    try {
      const response = await apiClient.get('/market/community');
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        marketService.saveCommunityPools(response.data);
        return response.data;
      }
    } catch (e) {
      console.warn('[MarketService] Backend offline, using cached community pools:', e.message);
    }
    return marketService.getCommunityPools();
  },

  saveCommunityPools: (pools) => {
    setStorage(POOLS_KEY, pools);
  },

  joinCommunityPool: (poolId, pledgeKg) => {
    const pools = marketService.getCommunityPools();
    const updated = pools.map(p => {
      if (p.id === poolId || p._id === poolId) {
        return {
          ...p,
          currentDemandKg: Math.min(p.targetKg, (p.currentDemandKg || 0) + pledgeKg),
          participantsCount: (p.participantsCount || 0) + 1
        };
      }
      return p;
    });
    marketService.saveCommunityPools(updated);

    // Asynchronously notify backend
    apiClient.post(`/market/community/${poolId}/join`, { pledgeKg }).catch(() => {});

    return updated.find(p => p.id === poolId || p._id === poolId);
  }
};
