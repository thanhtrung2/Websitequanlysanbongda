const mongoose = require('mongoose');

// Schema cho sân con (sân 1, sân 2...)
const subFieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    // Loại sân con (5 người hoặc 7 người)
    type: {
      type: String,
      enum: ['5vs5', '7vs7', '11vs11'],
      default: '5vs5'
    },
    // Giá riêng cho sân con (nếu không có sẽ dùng giá sân chính)
    pricePerHour: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'inactive'],
      default: 'active'
    }
  },
  { _id: true }
);

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['5vs5', '7vs7', '11vs11'],
    required: true
  },
  location: {
    address: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  images: [String],
  amenities: [String],
  // Danh sách sân con (sân 1, sân 2...)
  subFields: {
    type: [subFieldSchema],
    default: []
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Field', fieldSchema);
