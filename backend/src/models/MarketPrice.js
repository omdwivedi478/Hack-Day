import mongoose from 'mongoose';

const marketPriceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },
    commodity: {
      type: String,
      required: true,
      index: true
    },
    location: {
      type: String,
      required: true
    },
    mandiLocation: {
      type: String,
      required: true
    },
    marketAverage: {
      type: Number,
      required: true
    },
    farmDirectPrice: {
      type: Number,
      required: true
    },
    differencePercent: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: 'kg'
    },
    trend: {
      type: String,
      enum: ['up', 'down', 'stable'],
      default: 'stable'
    },
    recommendedRange: {
      type: String,
      default: ''
    },
    aiAdvisory: {
      type: String,
      default: ''
    },
    history: [
      {
        day: String,
        farmDirect: Number,
        mandi: Number
      }
    ],
    date: {
      type: Date,
      default: Date.now
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

export const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema);
