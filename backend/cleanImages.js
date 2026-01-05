require('dotenv').config();
const mongoose = require('mongoose');
const Field = require('./models/Field');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB đã kết nối thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

const cleanImages = async () => {
  try {
    await connectDB();
    
    // Lấy tất cả sân
    const fields = await Field.find({});
    console.log(`Tìm thấy ${fields.length} sân`);
    
    let updatedCount = 0;
    
    for (const field of fields) {
      // Lọc bỏ ảnh placeholder, chỉ giữ ảnh từ /uploads
      const cleanedImages = (field.images || []).filter(img => 
        img && img.startsWith('/uploads')
      );
      
      // Nếu có thay đổi, cập nhật
      if (cleanedImages.length !== (field.images || []).length) {
        await Field.findByIdAndUpdate(field._id, { images: cleanedImages });
        console.log(`✓ Đã xóa ảnh placeholder của sân: ${field.name}`);
        updatedCount++;
      }
    }
    
    console.log(`\nHoàn thành! Đã cập nhật ${updatedCount} sân.`);
    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
};

cleanImages();
