const Field = require('../models/Field');

exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.find({ status: 'active' });
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
    res.json({ message: 'Đã xóa sân thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
