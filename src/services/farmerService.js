import { initialFarmers } from '../data/mockFarmers';
import { getStorage, setStorage } from '../utils/storage';

const FARMERS_KEY = 'farmdirect_farmers';

export const farmerService = {
  getFarmers: () => {
    return getStorage(FARMERS_KEY, initialFarmers);
  },

  getFarmerById: (id) => {
    const farmers = farmerService.getFarmers();
    return farmers.find(f => f.id === id) || null;
  },

  saveFarmers: (farmers) => {
    setStorage(FARMERS_KEY, farmers);
  },

  updateFarmerProfile: (id, updates) => {
    const farmers = farmerService.getFarmers();
    const updated = farmers.map(f => (f.id === id ? { ...f, ...updates } : f));
    farmerService.saveFarmers(updated);
    return updated.find(f => f.id === id);
  }
};
