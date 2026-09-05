import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    time: {
      type: String,
      default: 'Just now'
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Notification = mongoose.model('Notification', notificationSchema);
