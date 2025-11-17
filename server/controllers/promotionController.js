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
    
    if (!promotion.isValid()) {
      return res.status(400).json({ message: 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn' });
    }
    
    if (amount < promotion.minBookingAmount) {
      return res.status(400).json({ 
        message: `Giá trị đơn hàng tối thiểu: ${promotion.minBookingAmount.toLocaleString()}đ` 
      });
    }
    
    const discount = promotion.calculateDiscount(amount);
    
    res.json({
      valid: true,
      promotion: {
        id: promotion._id,
        name: promotion.name,
        code: promotion.code,
        type: promotion.type,
        value: promotion.value
      },
      discount,
      finalAmount: amount - discount
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
