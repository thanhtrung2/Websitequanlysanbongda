const express = require('express');
const {
  getAllFields,
  getAllFieldsAdmin,
  getFieldById,
  createField,
  updateField,
  deleteField,
  uploadFieldImages,
  deleteFieldImage
} = require('../controllers/fieldController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getAllFields);
router.get('/:id', getFieldById);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllFieldsAdmin);
router.post('/', protect, authorize('admin'), createField);
router.put('/:id', protect, authorize('admin'), updateField);
router.delete('/:id', protect, authorize('admin'), deleteField);

// Upload ảnh - cho phép upload tối đa 5 ảnh cùng lúc
router.post('/:id/images', protect, authorize('admin'), upload.array('images', 5), uploadFieldImages);
router.delete('/:id/images/:imageIndex', protect, authorize('admin'), deleteFieldImage);

module.exports = router;
