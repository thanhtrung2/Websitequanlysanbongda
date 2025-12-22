const express = require('express');
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  registerInterest,
  getMyPosts,
  closePost,
  getAllPostsAdmin,
  moderatePost,
  adminDeletePost,
  reportPost,
  handleReport,
  getCommunityStats,
  getPendingPosts,
  bulkModerate,
  warnUser,
  unblockUser,
  getBlockedUsers
} = require('../controllers/communityController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Admin routes - ĐẶT TRƯỚC các route có :id
router.get('/admin/all', protect, authorize('admin'), getAllPostsAdmin);
router.get('/admin/stats', protect, authorize('admin'), getCommunityStats);
router.get('/admin/pending', protect, authorize('admin'), getPendingPosts);
router.get('/admin/blocked-users', protect, authorize('admin'), getBlockedUsers);
router.post('/admin/bulk-moderate', protect, authorize('admin'), bulkModerate);
router.post('/admin/warn-user', protect, authorize('admin'), warnUser);
router.patch('/admin/unblock-user/:userId', protect, authorize('admin'), unblockUser);
router.patch('/admin/:id/moderate', protect, authorize('admin'), moderatePost);
router.delete('/admin/:id', protect, authorize('admin'), adminDeletePost);
router.patch('/admin/:id/report', protect, authorize('admin'), handleReport);

// User routes - đặt trước :id
router.get('/user/my-posts', protect, getMyPosts);

// Public routes
router.get('/', getAllPosts);

// Protected routes
router.post('/', protect, createPost);

// Routes có :id - ĐẶT SAU CÙNG
router.get('/:id', getPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);
router.post('/:id/interest', protect, registerInterest);
router.post('/:id/report', protect, reportPost);
router.patch('/:id/close', protect, closePost);

module.exports = router;
