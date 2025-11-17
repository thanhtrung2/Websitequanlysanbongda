const express = require('express');
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  updateStock,
  getLowStock
} = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllItems);
router.get('/low-stock', protect, authorize('admin', 'staff'), getLowStock);
router.get('/:id', getItem);

// Admin/Staff routes
router.post('/', protect, authorize('admin', 'staff'), createItem);
router.put('/:id', protect, authorize('admin', 'staff'), updateItem);
router.delete('/:id', protect, authorize('admin'), deleteItem);
router.patch('/:id/stock', protect, authorize('admin', 'staff'), updateStock);

module.exports = router;
