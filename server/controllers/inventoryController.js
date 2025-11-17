const Inventory = require('../models/Inventory');

// Get all inventory items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find().sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single item
exports.getItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create item
exports.createItem = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update stock
exports.updateStock = async (req, res) => {
  try {
    const { quantity, type } = req.body; // type: 'add' or 'subtract'
    const item = await Inventory.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    
    if (type === 'add') {
      item.stock += quantity;
    } else if (type === 'subtract') {
      if (item.stock < quantity) {
        return res.status(400).json({ message: 'Không đủ hàng trong kho' });
      }
      item.stock -= quantity;
      item.sold += quantity;
    }
    
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get low stock items
exports.getLowStock = async (req, res) => {
  try {
    const items = await Inventory.find({
      $expr: { $lte: ['$stock', '$minStock'] }
    }).sort('stock');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
