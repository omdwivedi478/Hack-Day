import { initialOrders } from '../data/mockOrders';
import { initialTransactions } from '../data/mockTransactions';
import { getStorage, setStorage } from '../utils/storage';
import { apiClient } from '../utils/apiClient';

const ORDERS_KEY = 'farmdirect_orders';
const TRANSACTIONS_KEY = 'farmdirect_transactions';

export const orderService = {
  getOrders: () => {
    return getStorage(ORDERS_KEY, initialOrders);
  },

  getOrderById: (id) => {
    const orders = orderService.getOrders();
    return orders.find(o => o.id === id || o.orderNumber === id || o._id === id) || null;
  },

  saveOrders: (orders) => {
    setStorage(ORDERS_KEY, orders);
  },

  // Async API sync with offline fallback
  fetchOrdersFromAPI: async () => {
    try {
      const response = await apiClient.get('/orders');
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        orderService.saveOrders(response.data);
        return response.data;
      }
    } catch (e) {
      console.warn('[OrderService] Backend offline, using cached/mock orders:', e.message);
    }
    return orderService.getOrders();
  },

  createOrder: (orderData) => {
    const orders = orderService.getOrders();
    const orderId = `FD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      orderDate: new Date().toISOString(),
      status: 'Pending',
      ...orderData,
      timeline: [
        { step: 'Order Confirmed', time: 'Just now', completed: true, current: true, description: 'Order verified & payment held in escrow' },
        { step: 'Farmer Preparing', time: 'Awaiting farmer', completed: false, current: false, description: 'Harvesting, grading & crating produce' },
        { step: 'Picked Up', time: 'Pending', completed: false, current: false, description: 'Refrigerated agri-van pickup' },
        { step: 'Out for Delivery', time: 'Pending', completed: false, current: false, description: 'Direct doorstep dispatch' },
        { step: 'Delivered', time: 'Pending', completed: false, current: false, description: 'Handover complete & escrow released' }
      ]
    };

    const updatedOrders = [newOrder, ...orders];
    orderService.saveOrders(updatedOrders);

    // Create corresponding transaction
    const transactions = orderService.getTransactions();
    const newTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      orderId: newOrder.id,
      date: new Date().toISOString(),
      description: `Order #${newOrder.id} (${newOrder.items.length} produce items)`,
      type: 'Debit',
      paymentMethod: newOrder.paymentMethod || 'UPI',
      amount: newOrder.total,
      status: 'Settled',
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerBeneficiary: 'FarmDirect Direct Farmer Escrow'
    };
    setStorage(TRANSACTIONS_KEY, [newTxn, ...transactions]);

    // Asynchronously notify backend
    apiClient.post('/orders', newOrder).catch(() => {});

    return newOrder;
  },

  updateOrderStatus: (orderId, newStatus) => {
    const orders = orderService.getOrders();
    const updated = orders.map(order => {
      if (order.id !== orderId && order.orderNumber !== orderId) return order;

      const updatedTimeline = order.timeline.map((step, idx) => {
        if (newStatus === 'Pending') {
          return { ...step, completed: idx === 0, current: idx === 0 };
        }
        if (newStatus === 'Processing') {
          return { ...step, completed: idx <= 1, current: idx === 1 };
        }
        if (newStatus === 'In Transit') {
          return { ...step, completed: idx <= 3, current: idx === 3 };
        }
        if (newStatus === 'Delivered') {
          return { ...step, completed: true, current: idx === 4 };
        }
        return step;
      });

      return {
        ...order,
        status: newStatus,
        timeline: updatedTimeline
      };
    });

    orderService.saveOrders(updated);

    // Asynchronously sync to backend
    apiClient.put(`/orders/${orderId}/status`, { status: newStatus }).catch(() => {});

    return updated.find(o => o.id === orderId || o.orderNumber === orderId);
  },

  getTransactions: () => {
    return getStorage(TRANSACTIONS_KEY, initialTransactions);
  }
};
