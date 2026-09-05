import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  farmerName: {
    type: String,
    default: 'Verified Farmer'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit: {
    type: String,
    default: 'kg'
  },
  unitPrice: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const timelineStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  time: { type: String, required: true },
  completed: { type: Boolean, default: false },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    buyerId: {
      type: String,
      required: true,
      index: true
    },
    buyerName: {
      type: String,
      default: 'Consumer'
    },
    farmerId: {
      type: String,
      default: 'farmer-1',
      index: true
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    platformFee: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    total: {
      type: Number
    },
    farmerEarnings: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'In Transit', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      default: 'UPI'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Escrow Held', 'Released', 'Refunded'],
      default: 'Escrow Held'
    },
    timeline: [timelineStepSchema]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret.id || ret.orderNumber || ret._id.toString();
        ret.orderNumber = ret.orderNumber || ret.id;
        ret.total = ret.total ?? ret.totalAmount;
        ret.totalAmount = ret.totalAmount ?? ret.total;
        ret.orderDate = ret.orderDate || ret.createdAt;
        return ret;
      }
    }
  }
);

export const Order = mongoose.model('Order', orderSchema);
