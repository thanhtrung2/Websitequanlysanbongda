const CommunityPost = require('../models/CommunityPost');
const User = require('../models/User');
const { createNotification } = require('./notificationController');
const { moderateContent, sanitizeContent, calculateRiskScore } = require('../utils/contentFilter');

// Lấy tất cả bài đăng (chỉ hiển thị bài đã được duyệt)
exports.getAllPosts = async (req, res) => {
  try {
    const { type, status = 'active', page = 1, limit = 10 } = req.query;
    
    // Chỉ lấy bài đăng đã được duyệt (approved) hoặc không cần duyệt
    const query = { 
      status,
      $or: [
        { moderationStatus: 'approved' },
        { moderationStatus: { $exists: false } }
      ]
    };
    if (type) query.type = type;
    
    const posts = await CommunityPost.find(query)
      .populate('author', 'name email phone')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await CommunityPost.countDocuments(query);
    
    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết bài đăng
exports.getPost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('author', 'name email phone')
      .populate('comments.user', 'name')
      .populate('interested.user', 'name phone');
    
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    // Tăng lượt xem
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo bài đăng mới (có kiểm duyệt tự động)
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Kiểm duyệt nội dung tự động
    const moderation = moderateContent(title, content);
    
    // Nếu nội dung bị từ chối ngay
    if (moderation.status === 'rejected') {
      // Tăng số lần vi phạm của user
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { violationCount: 1 }
      });
      
      return res.status(400).json({
        message: 'Nội dung vi phạm quy định cộng đồng',
        reason: moderation.reason,
        riskScore: moderation.riskScore
      });
    }
    
    const post = await CommunityPost.create({
      ...req.body,
      author: req.user._id,
      riskScore: moderation.riskScore,
      moderationStatus: moderation.status,
      status: moderation.status === 'pending' ? 'pending' : 'active',
      autoModerationDetails: {
        bannedWords: moderation.details.bannedWords,
        spamReasons: moderation.details.spamReasons,
        checkedAt: new Date()
      }
    });
    
    const populatedPost = await CommunityPost.findById(post._id)
      .populate('author', 'name email phone');
    
    // Nếu cần kiểm duyệt, thông báo cho user
    if (moderation.status === 'pending') {
      return res.status(201).json({
        ...populatedPost.toObject(),
        warning: 'Bài đăng của bạn đang chờ kiểm duyệt và sẽ hiển thị sau khi được phê duyệt.'
      });
    }
    
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật bài đăng
exports.updatePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    // Chỉ tác giả mới được sửa
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền chỉnh sửa' });
    }
    
    Object.assign(post, req.body);
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa bài đăng
exports.deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền xóa' });
    }
    
    post.status = 'deleted';
    await post.save();
    
    res.json({ message: 'Đã xóa bài đăng' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Unlike bài đăng
exports.toggleLike = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    const userId = req.user._id;
    const likeIndex = post.likes.indexOf(userId);
    const isLiking = likeIndex === -1;
    
    if (isLiking) {
      post.likes.push(userId);
      
      // Tạo thông báo cho chủ bài đăng (nếu không phải chính mình like)
      if (post.author.toString() !== req.user._id.toString()) {
        await createNotification({
          recipient: post.author,
          sender: req.user._id,
          type: 'like',
          title: 'Lượt thích mới',
          message: `${req.user.name} đã thích bài đăng "${post.title}"`,
          link: `/pages/community.html?post=${post._id}`,
          relatedPost: post._id
        });
      }
    } else {
      post.likes.splice(likeIndex, 1);
    }
    
    await post.save();
    res.json({ likes: post.likes.length, liked: isLiking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm comment (có kiểm duyệt)
exports.addComment = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    // Kiểm duyệt comment
    const moderation = moderateContent('', req.body.content);
    if (moderation.status === 'rejected') {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { violationCount: 1 }
      });
      return res.status(400).json({
        message: 'Bình luận vi phạm quy định cộng đồng'
      });
    }
    
    // Làm sạch nội dung nếu có từ nghi ngờ
    const sanitizedContent = moderation.riskScore > 20 
      ? sanitizeContent(req.body.content) 
      : req.body.content;
    
    post.comments.push({
      user: req.user._id,
      content: sanitizedContent
    });
    
    await post.save();
    
    // Tạo thông báo cho chủ bài đăng (nếu không phải chính mình comment)
    if (post.author.toString() !== req.user._id.toString()) {
      await createNotification({
        recipient: post.author,
        sender: req.user._id,
        type: 'comment',
        title: 'Bình luận mới',
        message: `${req.user.name} đã bình luận bài đăng "${post.title}"`,
        link: `/pages/community.html?post=${post._id}`,
        relatedPost: post._id
      });
    }
    
    const updatedPost = await CommunityPost.findById(post._id)
      .populate('comments.user', 'name');
    
    res.json(updatedPost.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng ký quan tâm (tìm đội/đối thủ)
exports.registerInterest = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    // Kiểm tra đã đăng ký chưa
    const alreadyRegistered = post.interested.find(
      i => i.user.toString() === req.user._id.toString()
    );
    
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Bạn đã đăng ký quan tâm rồi' });
    }
    
    post.interested.push({
      user: req.user._id,
      message: req.body.message,
      phone: req.body.phone
    });
    
    await post.save();
    res.json({ message: 'Đã đăng ký thành công', interested: post.interested.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy bài đăng của user
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find({ 
      author: req.user._id,
      status: { $ne: 'deleted' }
    })
      .sort('-createdAt');
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đóng bài đăng (đã tìm được đội/đối thủ)
exports.closePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Không có quyền' });
    }
    
    post.status = 'closed';
    await post.save();
    
    res.json({ message: 'Đã đóng bài đăng' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ========== ADMIN FUNCTIONS ==========

// Lấy tất cả bài đăng cho admin (kể cả pending, rejected)
exports.getAllPostsAdmin = async (req, res) => {
  try {
    const { status, type, hasReports, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (hasReports === 'true') {
      query['reports.status'] = 'pending';
    }
    
    const posts = await CommunityPost.find(query)
      .populate('author', 'name email phone')
      .populate('moderatedBy', 'name')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await CommunityPost.countDocuments(query);
    
    // Đếm số báo cáo pending
    const pendingReports = await CommunityPost.countDocuments({
      'reports.status': 'pending'
    });
    
    res.json({
      posts,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) },
      pendingReports
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kiểm duyệt bài đăng
exports.moderatePost = async (req, res) => {
  try {
    const { action, reason } = req.body; // action: 'approve' | 'reject'
    
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    if (action === 'approve') {
      post.moderationStatus = 'approved';
      post.status = 'active';
    } else if (action === 'reject') {
      post.moderationStatus = 'rejected';
      post.status = 'rejected';
      post.rejectionReason = reason || 'Vi phạm quy định cộng đồng';
    }
    
    post.moderatedBy = req.user._id;
    post.moderatedAt = new Date();
    
    await post.save();
    
    // Tạo thông báo cho tác giả
    await createNotification({
      recipient: post.author,
      sender: req.user._id,
      type: 'system',
      title: action === 'approve' ? 'Bài đăng được duyệt' : 'Bài đăng bị từ chối',
      message: action === 'approve' 
        ? `Bài đăng "${post.title}" đã được duyệt và hiển thị công khai.`
        : `Bài đăng "${post.title}" bị từ chối. Lý do: ${post.rejectionReason}`,
      relatedPost: post._id
    });
    
    res.json({ message: action === 'approve' ? 'Đã duyệt bài đăng' : 'Đã từ chối bài đăng', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa bài đăng (admin)
exports.adminDeletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    post.status = 'deleted';
    post.moderatedBy = req.user._id;
    post.moderatedAt = new Date();
    await post.save();
    
    // Thông báo cho tác giả
    await createNotification({
      recipient: post.author,
      sender: req.user._id,
      type: 'system',
      title: 'Bài đăng đã bị xóa',
      message: `Bài đăng "${post.title}" đã bị xóa bởi quản trị viên do vi phạm quy định.`,
      relatedPost: post._id
    });
    
    res.json({ message: 'Đã xóa bài đăng' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========== REPORT FUNCTIONS ==========

// Báo cáo bài đăng
exports.reportPost = async (req, res) => {
  try {
    const { reason, description } = req.body;
    
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    // Kiểm tra đã báo cáo chưa
    const alreadyReported = post.reports.find(
      r => r.user.toString() === req.user._id.toString() && r.status === 'pending'
    );
    
    if (alreadyReported) {
      return res.status(400).json({ message: 'Bạn đã báo cáo bài đăng này rồi' });
    }
    
    post.reports.push({
      user: req.user._id,
      reason,
      description
    });
    
    await post.save();
    
    res.json({ message: 'Đã gửi báo cáo. Cảm ơn bạn đã giúp cộng đồng!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xử lý báo cáo (admin)
exports.handleReport = async (req, res) => {
  try {
    const { reportId, action } = req.body; // action: 'dismiss' | 'delete_post'
    
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    
    const report = post.reports.id(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Không tìm thấy báo cáo' });
    }
    
    if (action === 'dismiss') {
      report.status = 'dismissed';
    } else if (action === 'delete_post') {
      report.status = 'reviewed';
      post.status = 'deleted';
      post.moderatedBy = req.user._id;
      post.moderatedAt = new Date();
      
      // Thông báo cho tác giả
      await createNotification({
        recipient: post.author,
        type: 'system',
        title: 'Bài đăng đã bị xóa',
        message: `Bài đăng "${post.title}" đã bị xóa do vi phạm quy định cộng đồng.`,
        relatedPost: post._id
      });
    }
    
    await post.save();
    
    res.json({ message: action === 'dismiss' ? 'Đã bỏ qua báo cáo' : 'Đã xóa bài đăng' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thống kê cho admin
exports.getCommunityStats = async (req, res) => {
  try {
    const totalPosts = await CommunityPost.countDocuments({ status: { $ne: 'deleted' } });
    const activePosts = await CommunityPost.countDocuments({ status: 'active' });
    const pendingPosts = await CommunityPost.countDocuments({ moderationStatus: 'pending' });
    const pendingReports = await CommunityPost.countDocuments({ 'reports.status': 'pending' });
    const rejectedPosts = await CommunityPost.countDocuments({ status: 'rejected' });
    
    // Bài có điểm rủi ro cao
    const highRiskPosts = await CommunityPost.countDocuments({ 
      riskScore: { $gte: 40 },
      status: { $ne: 'deleted' }
    });
    
    const postsByType = await CommunityPost.aggregate([
      { $match: { status: { $ne: 'deleted' } } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    // Thống kê báo cáo theo loại
    const reportsByReason = await CommunityPost.aggregate([
      { $unwind: '$reports' },
      { $match: { 'reports.status': 'pending' } },
      { $group: { _id: '$reports.reason', count: { $sum: 1 } } }
    ]);
    
    // Top người dùng vi phạm
    const topViolators = await User.find({ violationCount: { $gt: 0 } })
      .select('name email violationCount')
      .sort('-violationCount')
      .limit(10);
    
    res.json({
      totalPosts,
      activePosts,
      pendingPosts,
      pendingReports,
      rejectedPosts,
      highRiskPosts,
      postsByType,
      reportsByReason,
      topViolators
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách bài đăng chờ duyệt
exports.getPendingPosts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const posts = await CommunityPost.find({ moderationStatus: 'pending' })
      .populate('author', 'name email phone violationCount')
      .sort('-riskScore -createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await CommunityPost.countDocuments({ moderationStatus: 'pending' });
    
    res.json({
      posts,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Duyệt hàng loạt
exports.bulkModerate = async (req, res) => {
  try {
    const { postIds, action, reason } = req.body;
    
    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({ message: 'Vui lòng chọn bài đăng' });
    }
    
    const updateData = {
      moderatedBy: req.user._id,
      moderatedAt: new Date()
    };
    
    if (action === 'approve') {
      updateData.moderationStatus = 'approved';
      updateData.status = 'active';
    } else if (action === 'reject') {
      updateData.moderationStatus = 'rejected';
      updateData.status = 'rejected';
      updateData.rejectionReason = reason || 'Vi phạm quy định cộng đồng';
    }
    
    await CommunityPost.updateMany(
      { _id: { $in: postIds } },
      { $set: updateData }
    );
    
    // Gửi thông báo cho tác giả
    const posts = await CommunityPost.find({ _id: { $in: postIds } });
    for (const post of posts) {
      await createNotification({
        recipient: post.author,
        sender: req.user._id,
        type: 'system',
        title: action === 'approve' ? 'Bài đăng được duyệt' : 'Bài đăng bị từ chối',
        message: action === 'approve' 
          ? `Bài đăng "${post.title}" đã được duyệt.`
          : `Bài đăng "${post.title}" bị từ chối. Lý do: ${updateData.rejectionReason}`,
        relatedPost: post._id
      });
    }
    
    res.json({ message: `Đã ${action === 'approve' ? 'duyệt' : 'từ chối'} ${postIds.length} bài đăng` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cảnh báo người dùng
exports.warnUser = async (req, res) => {
  try {
    const { userId, reason, postId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    // Tăng số lần vi phạm
    user.violationCount = (user.violationCount || 0) + 1;
    
    // Nếu vi phạm quá 3 lần, khóa tài khoản
    if (user.violationCount >= 3) {
      user.isBlocked = true;
      user.blockedReason = 'Vi phạm quy định cộng đồng nhiều lần';
      user.blockedAt = new Date();
    }
    
    await user.save();
    
    // Gửi thông báo cảnh báo
    await createNotification({
      recipient: userId,
      sender: req.user._id,
      type: 'warning',
      title: user.violationCount >= 3 ? '⛔ Tài khoản bị khóa' : '⚠️ Cảnh báo vi phạm',
      message: user.violationCount >= 3 
        ? `Tài khoản của bạn đã bị khóa do vi phạm quy định cộng đồng ${user.violationCount} lần.`
        : `Bạn đã vi phạm quy định cộng đồng (${user.violationCount}/3 lần). Lý do: ${reason}`,
      relatedPost: postId
    });
    
    res.json({ 
      message: user.violationCount >= 3 ? 'Đã khóa tài khoản người dùng' : 'Đã gửi cảnh báo',
      violationCount: user.violationCount,
      isBlocked: user.isBlocked
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mở khóa người dùng
exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndUpdate(userId, {
      isBlocked: false,
      blockedReason: null,
      blockedAt: null,
      violationCount: 0
    }, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    await createNotification({
      recipient: userId,
      type: 'system',
      title: '✅ Tài khoản đã được mở khóa',
      message: 'Tài khoản của bạn đã được mở khóa. Vui lòng tuân thủ quy định cộng đồng.'
    });
    
    res.json({ message: 'Đã mở khóa tài khoản', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách người dùng bị khóa
exports.getBlockedUsers = async (req, res) => {
  try {
    const users = await User.find({ isBlocked: true })
      .select('name email phone violationCount blockedReason blockedAt')
      .sort('-blockedAt');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
