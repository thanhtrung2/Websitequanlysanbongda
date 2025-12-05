const express = require('express');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getUserBookings);
router.get('/', protect, authorize('admin', 'staff'), getAllBookings);
router.put('/:id/status', protect, authorize('admin', 'staff'), updateBookingStatus);

module.exports = router;
