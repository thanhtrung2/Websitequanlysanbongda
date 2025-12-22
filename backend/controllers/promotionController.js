const Promotion = require('../models/Promotion');

// Get all promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().sort('-createdAt');
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active promotions
exports.getActivePromotions = async (req, res) => {
  try {
    const now = new Date();
    const promotions = await Promotion.find({
      status: 'active',
      startDate: { $lte: now },
      endDate: { $gte: now }
    });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single promotion
exports.getPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi' });
    }
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate promotion code
exports.validateCode = async (req, res) => {
  try {
    const { code, amount } = req.body;
    const promotion = await Promotion.findOne({ code: code.toUpperCase() });
    
    if (!promotion) {
      return res.status(404).json({ message: 'Mã khuyến mãi không tồn tại' });
    }
    
    const now = new Date();
    
    // Kiểm tra thời hạn
    if (now < promotion.startDate) {
      return res.status(400).json({ 
        message: `Mã khuyến mãi chưa có hiệu lực. Bắt đầu từ ${new Date(promotion.startDate).toLocaleDateString('vi-VN')}`
      });
    }
    
    if (now > promotion.endDate) {
      return res.status(400).json({ 
        message: `Mã khuyến mãi đã hết hạn từ ${new Date(promotion.endDate).toLocaleDateString('vi-VN')}`
      });
    }
    
    // Kiểm tra trạng thái
    if (promotion.status !== 'active') {
      return res.status(400).json({ message: 'Mã khuyến mãi đã bị vô hiệu hóa' });
    }
    
    // Kiểm tra giới hạn sử dụng
    if (promotion.usageLimit !== null && promotion.usageCount >= promotion.usageLimit) {
      return res.status(400).json({ 
        message: `Mã khuyến mãi đã hết lượt sử dụng (${promotion.usageLimit}/${promotion.usageLimit} lượt đã dùng)`,
        usageExhausted: true,
        usageLimit: promotion.usageLimit,
        usageCount: promotion.usageCount
      });
    }
    
    // Kiểm tra giá trị đơn hàng tối thiểu
    if (amount < promotion.minBookingAmount) {
      return res.status(400).json({ 
        message: `Giá trị đơn hàng tối thiểu: ${promotion.minBookingAmount.toLocaleString()}đ` 
      });
    }
    
    const discount = promotion.calculateDiscount(amount);
    
    // Tính số lượt còn lại
    const remainingUsage = promotion.usageLimit !== null 
      ? promotion.usageLimit - promotion.usageCount 
      : null;
    
    res.json({
      valid: true,
      promotion: {
        id: promotion._id,
        name: promotion.name,
        code: promotion.code,
        type: promotion.type,
        value: promotion.value,
        description: promotion.description
      },
      discount,
      finalAmount: amount - discount,
      // Thông tin giới hạn sử dụng
      usageInfo: {
        usageLimit: promotion.usageLimit,
        usageCount: promotion.usageCount,
        remainingUsage: remainingUsage,
        hasLimit: promotion.usageLimit !== null
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create promotion
exports.createPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.create(req.body);
    res.status(201).json(promotion);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Mã khuyến mãi đã tồn tại' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update promotion
exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi' });
    }
    
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete promotion
exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi' });
    }
    res.json({ message: 'Đã xóa khuyến mãi thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply promotion (increment usage count)
exports.applyPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi' });
    }
    
    if (!promotion.isValid()) {
      return res.status(400).json({ message: 'Mã khuyến mãi không hợp lệ' });
    }
    
    promotion.usageCount += 1;
    await promotion.save();
    
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy promotion hiển thị trên banner trang chủ
exports.getBannerPromotion = async (req, res) => {
  try {
    const now = new Date();
    const promotion = await Promotion.findOne({
      status: 'active',
      showOnBanner: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).sort('-createdAt');
    
    if (!promotion) {
      return res.json(null);
    }
    
    res.json({
      id: promotion._id,
      name: promotion.name,
      code: promotion.code,
      description: promotion.description,
      type: promotion.type,
      value: promotion.value,
      bannerColor: promotion.bannerColor,
      endDate: promotion.endDate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle hiển thị banner
exports.toggleBanner = async (req, res) => {
  try {
    const { showOnBanner, bannerColor } = req.body;
    
    // Nếu bật banner cho promotion này, tắt các promotion khác
    if (showOnBanner) {
      await Promotion.updateMany(
        { _id: { $ne: req.params.id } },
        { showOnBanner: false }
      );
    }
    
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      { showOnBanner, bannerColor: bannerColor || 'from-orange-500 via-red-500 to-pink-500' },
      { new: true }
    );
    
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi' });
    }
    
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
