const express = require('express');
const {
  getAllPromotions,
  getActivePromotions,
  getPromotion,
  validateCode,
  createPromotion,
  updatePromotion,
  deletePromotion,
  applyPromotion,
  getBannerPromotion,
  toggleBanner
} = require('../controllers/promotionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/active', getActivePromotions);
router.get('/banner', getBannerPromotion); // Lấy promotion hiển thị trên banner
router.post('/validate', validateCode);

// Admin routes
router.get('/', protect, authorize('admin', 'staff'), getAllPromotions);
router.get('/:id', protect, authorize('admin', 'staff'), getPromotion);
router.post('/', protect, authorize('admin'), createPromotion);
router.put('/:id', protect, authorize('admin'), updatePromotion);
router.delete('/:id', protect, authorize('admin'), deletePromotion);
router.post('/:id/apply', protect, applyPromotion);
router.patch('/:id/banner', protect, authorize('admin'), toggleBanner); // Toggle banner

module.exports = router;
