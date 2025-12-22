const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['find_match', 'tournament', 'share'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  // Điểm rủi ro nội dung (0-100)
  riskScore: {
    type: Number,
    default: 0
  },
  // Chi tiết kiểm duyệt tự động
  autoModerationDetails: {
    bannedWords: [String],
    spamReasons: [String],
    checkedAt: Date
  },
  // Thông tin chi tiết cho tìm đội/đối thủ
  matchInfo: {
    date: Date,
    time: String,
    location: String,
    fieldType: {
      type: String,
      enum: ['5vs5', '7vs7', '11vs11']
    },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'any']
    },
    contactPhone: String,
    maxPlayers: Number
  },
  // Tương tác
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Người quan tâm/đăng ký
  interested: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    phone: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'active', 'closed', 'rejected', 'deleted'],
    default: 'active'
  },
  // Kiểm duyệt
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved' // Mặc định approved, có thể đổi thành pending nếu muốn kiểm duyệt trước
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date,
  rejectionReason: String,
  // Báo cáo
  reports: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: {
      type: String,
      enum: ['spam', 'inappropriate', 'fake', 'harassment', 'other']
    },
    description: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'dismissed'],
      default: 'pending'
    }
  }],
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index để tìm kiếm nhanh
communityPostSchema.index({ type: 1, status: 1, createdAt: -1 });
communityPostSchema.index({ 'matchInfo.date': 1 });

module.exports = mongoose.model('CommunityPost', communityPostSchema);
