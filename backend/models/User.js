const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password không bắt buộc nếu đăng nhập bằng Google
    }
  },
  phone: {
    type: String,
    required: function() {
      return !this.googleId; // Phone không bắt buộc nếu đăng nhập bằng Google
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Cho phép null/undefined
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'staff'],
    default: 'customer'
  },
  // Quản lý vi phạm
  violationCount: {
    type: Number,
    default: 0
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockedReason: String,
  blockedAt: Date,
  warnings: [{
    reason: String,
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommunityPost'
    },
    warnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
