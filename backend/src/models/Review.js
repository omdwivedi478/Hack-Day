import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true
    },
    buyerName: {
      type: String,
      default: 'Verified Buyer'
    },
    buyerRole: {
      type: String,
      default: 'Household Consumer'
    },
    farmerId: {
      type: String,
      required: true,
      index: true
    },
    productId: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Review = mongoose.model('Review', reviewSchema);
