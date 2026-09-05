import { getStorage, setStorage } from '../utils/storage';

const CART_KEY = 'farmdirect_cart';

export const defaultCartItems = [
  {
    id: 'prod-1',
    name: 'Fresh Tomato',
    price: 38,
    unit: 'kg',
    quantity: 15,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80',
    farmerName: 'Rajesh Patel',
    farmerPrice: 30,
    marketPrice: 45,
    location: 'Bhopal, MP'
  },
  {
    id: 'prod-2',
    name: 'Potato (Jyoti)',
    price: 26,
    unit: 'kg',
    quantity: 20,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop&q=80',
    farmerName: 'Vikramaditya Rathore',
    farmerPrice: 20,
    marketPrice: 34,
    location: 'Indore, MP'
  }
];

export const cartService = {
  getStoredCart: () => {
    return getStorage(CART_KEY, defaultCartItems);
  },

  saveStoredCart: (items) => {
    setStorage(CART_KEY, items);
  },

  calculateCartTotals: (items) => {
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 1000 || items.length === 0 ? 0 : 80;
    const platformFee = items.length > 0 ? 30 : 0;
    const total = subtotal + deliveryFee + platformFee;

    const farmerReceives = items.reduce((acc, item) => acc + (item.farmerPrice * item.quantity), 0);
    const traditionalMarketCost = items.reduce((acc, item) => acc + (item.marketPrice * item.quantity), 0);
    const consumerSavings = Math.max(0, traditionalMarketCost - total);

    return {
      itemCount,
      subtotal,
      deliveryFee,
      platformFee,
      total,
      farmerReceives,
      traditionalMarketCost,
      consumerSavings
    };
  }
};
