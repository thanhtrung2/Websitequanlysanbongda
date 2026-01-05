require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const communityRoutes = require('./routes/communityRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/notifications', notificationRoutes);

// Static files - serve frontend từ thư mục frontend
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

// Error handler - xử lý lỗi multer và các lỗi khác
const multer = require('multer');
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  
  // Lỗi multer
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File quá lớn. Giới hạn 5MB mỗi file.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: 'Chỉ được upload tối đa 5 file.' });
    }
    return res.status(400).json({ message: 'Lỗi upload: ' + err.message });
  }
  
  // Lỗi file type
  if (err.message && err.message.includes('Chỉ cho phép upload')) {
    return res.status(400).json({ message: err.message });
  }
  
  res.status(500).json({ message: 'Đã xảy ra lỗi server: ' + err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
