const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    // Create user with specified role or default to 'customer'
    const userData = { name, email, password, phone };
    if (role && ['admin', 'staff', 'customer'].includes(role)) {
      userData.role = role;
    }

    const user = await User.create(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng nhập bằng Google
exports.googleLogin = async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ message: 'Thiếu thông tin Google' });
    }

    // Tìm user theo googleId hoặc email
    let user = await User.findOne({ 
      $or: [{ googleId }, { email }] 
    });

    if (user) {
      // Nếu user tồn tại nhưng chưa có googleId, cập nhật
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = avatar;
        await user.save();
      }
    } else {
      // Tạo user mới
      user = await User.create({
        googleId,
        email,
        name,
        avatar,
        role: 'customer'
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
