import mongoose from 'mongoose';

const communityOrderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },
    productId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    variety: {
      type: String,
      default: ''
    },
    farmerName: {
      type: String,
      default: ''
    },
    farmLocation: {
      type: String,
      default: ''
    },
    hubLocation: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    targetKg: {
      type: Number,
      required: true
    },
    currentDemandKg: {
      type: Number,
      default: 0
    },
    currentPrice: {
      type: Number,
      required: true
    },
    unlockedPrice: {
      type: Number,
      required: true
    },
    superPrice: {
      type: Number,
      default: 0
    },
    superTargetKg: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: 'kg'
    },
    participantsCount: {
      type: Number,
      default: 1
    },
    endsInHours: {
      type: Number,
      default: 24
    },
    deliveryDate: {
      type: String,
      default: 'Tomorrow'
    },
    status: {
      type: String,
      enum: ['Active', 'Unlocked', 'Delivered', 'Closed'],
      default: 'Active'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret.id || ret._id.toString();
        return ret;
      }
    }
  }
);

export const CommunityOrder = mongoose.model('CommunityOrder', communityOrderSchema);
