const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB đã kết nối thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    console.log('Server vẫn chạy nhưng chức năng database sẽ không hoạt động');
    console.log('Vui lòng cài đặt và chạy MongoDB để sử dụng đầy đủ chức năng');
  }
};

module.exports = connectDB;
