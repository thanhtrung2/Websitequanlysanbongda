const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['percent', 'fixed'],
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  minBookingAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  // Hiển thị trên banner trang chủ
  showOnBanner: {
    type: Boolean,
    default: false
  },
  bannerColor: {
    type: String,
    default: 'from-orange-500 via-red-500 to-pink-500' // Tailwind gradient classes
  }
}, {
  timestamps: true
});

promotionSchema.methods.isValid = function() {
  const now = new Date();
  return this.status === 'active' && 
         now >= this.startDate && 
         now <= this.endDate &&
         (this.usageLimit === null || this.usageCount < this.usageLimit);
};

promotionSchema.methods.calculateDiscount = function(amount) {
  if (!this.isValid() || amount < this.minBookingAmount) return 0;
  
  if (this.type === 'percent') {
    return Math.floor(amount * this.value / 100);
  }
  return this.value;
};

module.exports = mongoose.model('Promotion', promotionSchema);
