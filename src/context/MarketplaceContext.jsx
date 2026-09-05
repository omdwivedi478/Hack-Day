import React, { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { farmerService } from '../services/farmerService';
import { useToast } from './ToastContext';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const { showToast } = useToast();

  // Products
  const [products, setProducts] = useState(() => productService.getProducts());

  // Farmers
  const [farmers, setFarmers] = useState(() => farmerService.getFarmers());

  // Orders
  const [orders, setOrders] = useState(() => orderService.getOrders());

  // Transactions
  const [transactions, setTransactions] = useState(() => orderService.getTransactions());

  // Initial background sync from backend API
  useEffect(() => {
    let isMounted = true;

    const syncWithBackend = async () => {
      try {
        const [apiProducts, apiFarmers, apiOrders] = await Promise.allSettled([
          productService.fetchProductsFromAPI(),
          farmerService.fetchFarmersFromAPI(),
          orderService.fetchOrdersFromAPI()
        ]);

        if (!isMounted) return;

        if (apiProducts.status === 'fulfilled' && apiProducts.value?.length > 0) {
          setProducts(apiProducts.value);
        }
        if (apiFarmers.status === 'fulfilled' && apiFarmers.value?.length > 0) {
          setFarmers(apiFarmers.value);
        }
        if (apiOrders.status === 'fulfilled' && apiOrders.value?.length > 0) {
          setOrders(apiOrders.value);
        }
      } catch (err) {
        console.warn('[MarketplaceContext] Initial API sync failed, continuing with cached data:', err);
      }
    };

    syncWithBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync to services on state change
  useEffect(() => {
    productService.saveProducts(products);
  }, [products]);

  useEffect(() => {
    farmerService.saveFarmers(farmers);
  }, [farmers]);

  useEffect(() => {
    orderService.saveOrders(orders);
  }, [orders]);

  // Product Actions
  const addProduct = (newProductData) => {
    const created = productService.addProduct(newProductData);
    setProducts(prev => [created, ...prev]);
    showToast(`"${created.name}" published to FarmDirect Marketplace!`, 'success');
    return created;
  };

  const updateProduct = (id, updatedFields) => {
    productService.updateProduct(id, updatedFields);
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product inventory updated', 'success');
  };

  const deleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    productService.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Removed "${prod?.name || 'Product'}" from catalog`, 'info');
  };

  // Order Actions
  const createOrder = (orderData) => {
    const newOrder = orderService.createOrder(orderData);
    setOrders(prev => [newOrder, ...prev]);
    setTransactions(orderService.getTransactions());
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    orderService.updateOrderStatus(orderId, newStatus);
    setOrders(orderService.getOrders());
    showToast(`Order #${orderId} status updated to ${newStatus}`, 'info');
  };

  return (
    <MarketplaceContext.Provider value={{
      products,
      farmers,
      orders,
      transactions,
      addProduct,
      updateProduct,
      deleteProduct,
      createOrder,
      updateOrderStatus,
      setFarmers
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error('useMarketplace must be used within MarketplaceProvider');
  return context;
};
