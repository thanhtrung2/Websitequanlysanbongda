const express = require('express');
const { 
  getProfile, 
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// User routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin & Staff routes - xem danh sách users
router.get('/', protect, authorize('admin', 'staff'), getAllUsers);

// Admin only routes
router.post('/', protect, authorize('admin'), createUser);
router.get('/:id', protect, authorize('admin'), getUserById);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
