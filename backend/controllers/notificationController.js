const Notification = require('../models/Notification');

// Lấy thông báo của user
exports.getMyNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    const query = { recipient: req.user._id };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }
    
    const notifications = await Notification.find(query)
      .populate('sender', 'name')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });
    
    res.json({
      notifications,
      unreadCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đánh dấu đã đọc
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }
    
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đánh dấu tất cả đã đọc
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );
    
    res.json({ message: 'Đã đánh dấu tất cả là đã đọc' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa thông báo
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id
    });
    
    res.json({ message: 'Đã xóa thông báo' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đếm thông báo chưa đọc
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });
    
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function để tạo thông báo (dùng trong các controller khác)
exports.createNotification = async (data) => {
  try {
    const notification = await Notification.create(data);
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};
