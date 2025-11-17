const express = require('express');
const {
  getAllFields,
  getFieldById,
  createField,
  updateField,
  deleteField
} = require('../controllers/fieldController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllFields);
router.get('/:id', getFieldById);
router.post('/', protect, authorize('admin'), createField);
router.put('/:id', protect, authorize('admin'), updateField);
router.delete('/:id', protect, authorize('admin'), deleteField);

module.exports = router;
