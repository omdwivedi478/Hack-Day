import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    name: {
      type: String,
      required: [true, 'Please provide farmer name'],
      trim: true
    },
    farmerName: {
      type: String,
      trim: true
    },
    farmName: {
      type: String,
      required: [true, 'Please provide farm name'],
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    district: {
      type: String,
      default: ''
    },
    acres: {
      type: Number,
      default: 5
    },
    experienceYears: {
      type: Number,
      default: 5
    },
    yearsFarming: {
      type: Number,
      default: 5
    },
    bio: {
      type: String,
      default: ''
    },
    story: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    establishedYear: {
      type: Number,
      default: 2015
    },
    verified: {
      type: Boolean,
      default: true
    },
    ordersCount: {
      type: Number,
      default: 0
    },
    certifications: {
      type: [String],
      default: []
    },
    specialtyCrops: {
      type: [String],
      default: []
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
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    },
    profileImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80'
    },
    bankSettlement: {
      type: String,
      default: 'State Bank of India (Ending in 4092)'
    },
    distanceKm: {
      type: Number,
      default: 10
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret.id || ret._id.toString();
        ret.name = ret.name || ret.farmerName;
        ret.farmerName = ret.farmerName || ret.name;
        ret.avatar = ret.avatar || ret.profileImage;
        ret.profileImage = ret.profileImage || ret.avatar;
        ret.bio = ret.bio || ret.story;
        ret.story = ret.story || ret.bio;
        ret.experienceYears = ret.experienceYears ?? ret.yearsFarming ?? 5;
        ret.yearsFarming = ret.yearsFarming ?? ret.experienceYears ?? 5;
        return ret;
      }
    }
  }
);

export const Farmer = mongoose.model('Farmer', farmerSchema);
