import { initialMarketPrices } from '../data/mockMarketPrices';
import { initialDemandInsights } from '../data/mockDemandInsights';
import { initialCommunityPools } from '../data/mockCommunityPools';
import { getStorage, setStorage } from '../utils/storage';

const POOLS_KEY = 'farmdirect_community_pools';

export const marketService = {
  getMarketPrices: () => {
    return initialMarketPrices;
  },

  getDemandInsights: () => {
    return initialDemandInsights;
  },

  getCommunityPools: () => {
    return getStorage(POOLS_KEY, initialCommunityPools);
  },

  saveCommunityPools: (pools) => {
    setStorage(POOLS_KEY, pools);
  },

  joinCommunityPool: (poolId, pledgeKg) => {
    const pools = marketService.getCommunityPools();
    const updated = pools.map(p => {
      if (p.id === poolId) {
        return {
          ...p,
          currentDemandKg: Math.min(p.targetKg, p.currentDemandKg + pledgeKg),
          participantsCount: p.participantsCount + 1
        };
      }
      return p;
    });
    marketService.saveCommunityPools(updated);
    return updated.find(p => p.id === poolId);
  }
};
