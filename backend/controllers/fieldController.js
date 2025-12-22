const Field = require('../models/Field');
const fs = require('fs');
const path = require('path');

exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.find({ status: 'active' });
    res.json(fields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả sân (kể cả không active) - cho admin
exports.getAllFieldsAdmin = async (req, res) => {
  try {
    const fields = await Field.find();
    res.json(fields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFieldById = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân' });
    }
    res.json(field);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createField = async (req, res) => {
  try {
    const field = await Field.create(req.body);
    res.status(201).json(field);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateField = async (req, res) => {
  try {
    const field = await Field.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân' });
    }
    res.json(field);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id);
    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân' });
    }
    
    // Xóa ảnh cũ nếu có
    if (field.images && field.images.length > 0) {
      field.images.forEach(img => {
        const imgPath = path.join(__dirname, '../../frontend', img);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });
    }
    
    res.json({ message: 'Đã xóa sân thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload ảnh cho sân
exports.uploadFieldImages = async (req, res) => {
  try {
    console.log('Upload request for field:', req.params.id);
    console.log('Files received:', req.files ? req.files.length : 0);
    
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Vui lòng chọn ảnh để upload' });
    }

    // Tạo đường dẫn ảnh
    const imagePaths = req.files.map(file => '/uploads/fields/' + file.filename);
    console.log('Image paths:', imagePaths);
    
    // Thêm vào mảng images
    field.images = [...(field.images || []), ...imagePaths];
    await field.save();

    console.log('Upload success, total images:', field.images.length);
    res.json({ 
      message: 'Upload ảnh thành công',
      images: field.images 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Xóa một ảnh của sân
exports.deleteFieldImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    
    const field = await Field.findById(id);
    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân' });
    }

    const index = parseInt(imageIndex);
    if (index < 0 || index >= field.images.length) {
      return res.status(400).json({ message: 'Index ảnh không hợp lệ' });
    }

    // Xóa file ảnh
    const imgPath = path.join(__dirname, '../../frontend', field.images[index]);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    // Xóa khỏi mảng
    field.images.splice(index, 1);
    await field.save();

    res.json({ 
      message: 'Xóa ảnh thành công',
      images: field.images 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
