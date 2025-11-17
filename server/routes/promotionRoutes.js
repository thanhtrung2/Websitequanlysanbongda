const express = require('express');
const {
  getAllPromotions,
  getActivePromotions,
  getPromotion,
  validateCode,
  createPromotion,
  updatePromotion,
  deletePromotion,
  applyPromotion
} = require('../controllers/promotionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/active', getActivePromotions);
router.post('/validate', validateCode);

// Admin routes
router.get('/', protect, authorize('admin', 'staff'), getAllPromotions);
router.get('/:id', protect, authorize('admin', 'staff'), getPromotion);
router.post('/', protect, authorize('admin'), createPromotion);
router.put('/:id', protect, authorize('admin'), updatePromotion);
router.delete('/:id', protect, authorize('admin'), deletePromotion);
router.post('/:id/apply', protect, applyPromotion);

module.exports = router;
