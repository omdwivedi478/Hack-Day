import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState(() => cartService.getStoredCart());

  useEffect(() => {
    cartService.saveStoredCart(items);
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, Number(quantity));
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showToast(`Updated ${product.name} quantity (+${qty} ${product.unit || 'kg'})`, 'success');
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        showToast(`Added ${product.name} to cart`, 'success');
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit || 'kg',
            quantity: qty,
            image: product.image,
            farmerName: product.farmerName,
            farmerPrice: product.farmerPrice || Math.round(product.price * 0.78),
            marketPrice: product.marketPrice || Math.round(product.price * 1.25),
            location: product.location
          }
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    const item = items.find(i => i.id === productId);
    if (item) {
      showToast(`Removed ${item.name} from cart`, 'info');
    }
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    const qty = Math.max(1, Number(newQty));
    setItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations from cartService
  const totals = cartService.calculateCartTotals(items);

  return (
    <CartContext.Provider value={{
      items,
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      platformFee: totals.platformFee,
      total: totals.total,
      farmerReceives: totals.farmerReceives,
      traditionalMarketCost: totals.traditionalMarketCost,
      consumerSavings: totals.consumerSavings,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
