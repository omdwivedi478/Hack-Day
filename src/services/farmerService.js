import { initialFarmers } from '../data/mockFarmers';
import { getStorage, setStorage } from '../utils/storage';
import { apiClient } from '../utils/apiClient';

const FARMERS_KEY = 'farmdirect_farmers';

export const farmerService = {
  getFarmers: () => {
    return getStorage(FARMERS_KEY, initialFarmers);
  },

  getFarmerById: (id) => {
    const farmers = farmerService.getFarmers();
    return farmers.find(f => f.id === id || f._id === id) || null;
  },

  saveFarmers: (farmers) => {
    setStorage(FARMERS_KEY, farmers);
  },

  // Async API sync with offline fallback
  fetchFarmersFromAPI: async () => {
    try {
      const response = await apiClient.get('/farmers');
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        farmerService.saveFarmers(response.data);
        return response.data;
      }
    } catch (e) {
      console.warn('[FarmerService] Backend offline, using cached/mock farmers:', e.message);
    }
    return farmerService.getFarmers();
  },

  updateFarmerProfile: (id, updates) => {
    const farmers = farmerService.getFarmers();
    const updated = farmers.map(f => (f.id === id || f._id === id ? { ...f, ...updates } : f));
    farmerService.saveFarmers(updated);

    // Asynchronously notify backend
    apiClient.put('/farmers/profile', { id, ...updates }).catch(() => {});

    return updated.find(f => f.id === id || f._id === id);
  }
};
