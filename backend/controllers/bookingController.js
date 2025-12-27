const Booking = require('../models/Booking');
const Promotion = require('../models/Promotion');

exports.createBooking = async (req, res) => {
  try {
    const { field, date, startTime, endTime, promoCode } = req.body;
    
    // Kiểm tra trùng lịch đặt sân
    const existingBooking = await Booking.findOne({
      field: field,
      date: new Date(date),
      status: { $nin: ['cancelled'] },
      $or: [
        { startTime: { $lte: startTime }, endTime: { $gt: startTime } },
        { startTime: { $lt: endTime }, endTime: { $gte: endTime } },
        { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ 
        message: `Sân đã được đặt vào khung giờ ${existingBooking.startTime} - ${existingBooking.endTime}. Vui lòng chọn giờ khác!`
      });
    }

    // Nếu có mã khuyến mãi, tăng số lượt sử dụng
    if (promoCode) {
      const promotion = await Promotion.findOne({ code: promoCode.toUpperCase() });
      if (promotion) {
        if (promotion.usageLimit !== null && promotion.usageCount >= promotion.usageLimit) {
          return res.status(400).json({ message: 'Mã khuyến mãi đã hết lượt sử dụng!' });
        }
        promotion.usageCount = (promotion.usageCount || 0) + 1;
        await promotion.save();
      }
    }

    const booking = await Booking.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('field')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('field')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy đặt sân' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy các booking của một sân trong ngày
exports.getFieldBookings = async (req, res) => {
  try {
    const { fieldId, date } = req.query;
    
    if (!fieldId || !date) {
      return res.status(400).json({ message: 'Thiếu fieldId hoặc date' });
    }

    const bookings = await Booking.find({
      field: fieldId,
      date: new Date(date),
      status: { $nin: ['cancelled'] }
    }).select('startTime endTime status');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kiểm tra khung giờ có trống không
exports.checkAvailability = async (req, res) => {
  try {
    const { fieldId, date, startTime, endTime } = req.query;
    
    const existingBooking = await Booking.findOne({
      field: fieldId,
      date: new Date(date),
      status: { $nin: ['cancelled'] },
      $or: [
        { startTime: { $lte: startTime }, endTime: { $gt: startTime } },
        { startTime: { $lt: endTime }, endTime: { $gte: endTime } },
        { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
      ]
    });

    res.json({ 
      available: !existingBooking,
      conflictWith: existingBooking ? `${existingBooking.startTime} - ${existingBooking.endTime}` : null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
