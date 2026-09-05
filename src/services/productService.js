import { initialProducts } from '../data/mockProducts';
import { getStorage, setStorage } from '../utils/storage';

const STORAGE_KEY = 'farmdirect_products';

export const productService = {
  getProducts: () => {
    return getStorage(STORAGE_KEY, initialProducts);
  },

  getProductById: (id) => {
    const products = productService.getProducts();
    return products.find(p => p.id === id) || null;
  },

  saveProducts: (products) => {
    setStorage(STORAGE_KEY, products);
  },

  addProduct: (productData) => {
    const products = productService.getProducts();
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      availableQty: Number(productData.availableQty) || 100,
      price: Number(productData.price) || 40,
      marketPrice: Math.round(Number(productData.price) * 1.25) || 50,
      farmerPrice: Math.round(Number(productData.price) * 0.8) || 32,
      logisticsFee: Math.round(Number(productData.price) * 0.1) || 4,
      platformFee: Math.round(Number(productData.price) * 0.1) || 4,
      traditionalSupplyChain: [
        { role: 'Farmer', price: Math.round(Number(productData.price) * 0.5) },
        { role: 'Trader', price: Math.round(Number(productData.price) * 0.7) },
        { role: 'Wholesaler', price: Math.round(Number(productData.price) * 0.9) },
        { role: 'Retailer', price: Math.round(Number(productData.price) * 1.15) },
        { role: 'Consumer', price: Math.round(Number(productData.price) * 1.25) },
      ]
    };
    const updated = [newProduct, ...products];
    productService.saveProducts(updated);
    return newProduct;
  },

  updateProduct: (id, updates) => {
    const products = productService.getProducts();
    const updated = products.map(p => (p.id === id ? { ...p, ...updates } : p));
    productService.saveProducts(updated);
    return updated.find(p => p.id === id);
  },

  deleteProduct: (id) => {
    const products = productService.getProducts();
    const updated = products.filter(p => p.id !== id);
    productService.saveProducts(updated);
    return true;
  }
};
