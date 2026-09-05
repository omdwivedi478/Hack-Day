import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { fallbackStore } from '../utils/fallbackStore.js';

// Helper to find order by custom id, orderNumber, or Mongo ObjectId
const findOrderByIdOrNumber = async (idParam) => {
  if (!idParam) return null;
  if (mongoose.connection.readyState !== 1) {
    return fallbackStore.orders.find(o => o.id === idParam || o.orderNumber === idParam || o._id === idParam) || null;
  }
  let order = await Order.findOne({
    $or: [
      { id: idParam },
      { orderNumber: idParam }
    ]
  });
  if (!order && mongoose.isValidObjectId(idParam)) {
    order = await Order.findById(idParam);
  }
  return order;
};

// @desc    Create a new direct farmer order
// @route   POST /api/orders
// @access  Private / Optional Auth
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      paymentMethod = 'UPI',
      buyerName,
      buyerId,
      subtotal: rawSubtotal,
      deliveryFee: rawDeliveryFee,
      platformFee: rawPlatformFee,
      total: rawTotal
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    const calculatedSubtotal = items.reduce(
      (sum, item) => sum + (Number(item.price || item.unitPrice || 0) * Number(item.quantity || 1)),
      0
    );

    const subtotal = rawSubtotal !== undefined ? Number(rawSubtotal) : calculatedSubtotal;
    const deliveryFee = rawDeliveryFee !== undefined ? Number(rawDeliveryFee) : (subtotal > 500 ? 0 : 40);
    const platformFee = rawPlatformFee !== undefined ? Number(rawPlatformFee) : 5;
    const totalAmount = rawTotal !== undefined ? Number(rawTotal) : (subtotal + deliveryFee + platformFee);
    const farmerEarnings = Math.round(subtotal * 0.90); // 90% direct to farmer

    const orderNumber = `FD-${Math.floor(10000 + Math.random() * 90000)}`;

    const formattedItems = items.map(item => ({
      productId: item.productId || item.id || 'prod-custom',
      name: item.name,
      image: item.image || '',
      farmerName: item.farmerName || 'Verified Local Farmer',
      quantity: Number(item.quantity || 1),
      unit: item.unit || 'kg',
      unitPrice: Number(item.price || item.unitPrice || 0),
      total: Number(item.price || item.unitPrice || 0) * Number(item.quantity || 1)
    }));

    const timeline = [
      { step: 'Order Confirmed', time: 'Just now', completed: true, current: true, description: 'Order verified & payment held in escrow' },
      { step: 'Farmer Preparing', time: 'Awaiting farmer', completed: false, current: false, description: 'Harvesting, grading & crating produce' },
      { step: 'Picked Up', time: 'Pending', completed: false, current: false, description: 'Refrigerated agri-van pickup' },
      { step: 'Out for Delivery', time: 'Pending', completed: false, current: false, description: 'Direct doorstep dispatch' },
      { step: 'Delivered', time: 'Pending', completed: false, current: false, description: 'Handover complete & escrow released' }
    ];

    const newOrderObj = {
      id: orderNumber,
      _id: orderNumber,
      orderNumber,
      orderDate: new Date().toISOString(),
      buyerId: req.user?._id?.toString() || buyerId || 'buyer-guest',
      buyerName: req.user?.name || buyerName || 'FarmDirect Consumer',
      farmerId: items[0]?.farmerId || 'farmer-1',
      items: formattedItems,
      subtotal,
      deliveryFee,
      platformFee,
      totalAmount,
      total: totalAmount,
      farmerEarnings,
      status: 'Pending',
      deliveryAddress: typeof deliveryAddress === 'string'
        ? deliveryAddress
        : (deliveryAddress?.street ? `${deliveryAddress.street}, ${deliveryAddress.city}` : 'Bhopal, Madhya Pradesh'),
      paymentMethod,
      paymentStatus: 'Escrow Held',
      timeline
    };

    if (mongoose.connection.readyState !== 1) {
      fallbackStore.orders.unshift(newOrderObj);
      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrderObj
      });
    }

    const order = await Order.create(newOrderObj);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// @desc    Get user/farmer orders with optional status filters
// @route   GET /api/orders
// @access  Public / Private
export const getOrders = async (req, res) => {
  try {
    const { status, buyerId, farmerId, search } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let list = [...fallbackStore.orders];
      if (status && status !== 'All') {
        list = list.filter(o => o.status === status);
      }
      if (buyerId) {
        list = list.filter(o => o.buyerId === buyerId);
      }
      if (farmerId) {
        list = list.filter(o => o.farmerId === farmerId || o.items?.some(i => i.farmerId === farmerId));
      }
      return res.json({
        success: true,
        count: list.length,
        data: list
      });
    }

    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (buyerId) {
      query.buyerId = buyerId;
    }

    if (farmerId) {
      query.$or = [
        { farmerId },
        { 'items.farmerId': farmerId }
      ];
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { orderNumber: searchRegex },
        { 'items.name': searchRegex },
        { buyerName: searchRegex }
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// @desc    Get single order by ID or order number
// @route   GET /api/orders/:id
// @access  Public / Private
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await findOrderByIdOrNumber(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// @desc    Update order status and tracking timeline
// @route   PUT /api/orders/:id/status
// @access  Private
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Processing', 'In Transit', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = await findOrderByIdOrNumber(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;

    if (status === 'Delivered') {
      order.paymentStatus = 'Released';
    } else if (status === 'Cancelled') {
      order.paymentStatus = 'Refunded';
    }

    // Update timeline steps according to status
    if (order.timeline && order.timeline.length > 0) {
      order.timeline = order.timeline.map((step, idx) => {
        if (status === 'Pending') {
          return { ...step.toObject(), completed: idx === 0, current: idx === 0 };
        }
        if (status === 'Processing') {
          return { ...step.toObject(), completed: idx <= 1, current: idx === 1 };
        }
        if (status === 'In Transit') {
          return { ...step.toObject(), completed: idx <= 3, current: idx === 3 };
        }
        if (status === 'Delivered') {
          return { ...step.toObject(), completed: true, current: idx === 4 };
        }
        return step;
      });
    }

    await order.save();

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
};
