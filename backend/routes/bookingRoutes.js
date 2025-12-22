const express = require('express');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  getFieldBookings,
  checkAvailability
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes - kiểm tra lịch trống
router.get('/field-bookings', getFieldBookings);
router.get('/check-availability', checkAvailability);

// Protected routes
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getUserBookings);
router.get('/', protect, authorize('admin', 'staff'), getAllBookings);
router.put('/:id/status', protect, authorize('admin', 'staff'), updateBookingStatus);

module.exports = router;
