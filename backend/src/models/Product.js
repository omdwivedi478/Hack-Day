import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true,
      index: true
    },
    farmerName: {
      type: String,
      default: 'Verified Farmer'
    },
    farmName: {
      type: String,
      default: 'Direct Farm'
    },
    farmerAvatar: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: [true, 'Please enter produce name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please specify category'],
      enum: ['Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy', 'Organic'],
      default: 'Vegetables'
    },
    description: {
      type: String,
      default: ''
    },
    variety: {
      type: String,
      default: 'Standard'
    },
    qualityGrade: {
      type: String,
      default: 'Grade A'
    },
    shelfLife: {
      type: String,
      default: '5 - 7 Days'
    },
    location: {
      type: String,
      default: 'Pune, Maharashtra'
    },
    state: {
      type: String,
      default: 'Maharashtra'
    },
    price: {
      type: Number,
      required: [true, 'Please enter consumer price'],
      min: 1
    },
    unit: {
      type: String,
      default: 'kg'
    },
    stock: {
      type: Number,
      default: 100,
      min: 0
    },
    minimumOrderQuantity: {
      type: String,
      default: '5 kg'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    },
    organic: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['Active', 'Low Stock', 'Out of Stock'],
      default: 'Active'
    },
    marketPrice: {
      type: Number,
      default: null
    },
    farmerPrice: {
      type: Number,
      default: null
    },
    logisticsFee: {
      type: Number,
      default: 4
    },
    platformFee: {
      type: Number,
      default: 4
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    isPopular: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model('Product', productSchema);
