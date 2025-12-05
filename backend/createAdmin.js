require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB đã kết nối thành công');
  } catch (error) {
    console.error('✗ Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    await connectDB();
    
    // Kiểm tra xem đã có admin chưa
    const existingAdmin = await User.findOne({ email: 'admin@travinh.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Tài khoản admin đã tồn tại!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      
      // Cập nhật role nếu chưa phải admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✓ Đã cập nhật role thành admin');
      }
    } else {
      // Tạo admin mới
      const admin = await User.create({
        name: 'Admin Trà Vinh',
        email: 'admin@travinh.com',
        password: 'admin123456',
        phone: '0123456789',
        role: 'admin'
      });
      
      console.log('✓ Đã tạo tài khoản admin thành công!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', admin.email);
      console.log('🔑 Password: admin123456');
      console.log('👤 Role:', admin.role);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
    
    // Hiển thị tất cả admin
    const allAdmins = await User.find({ role: 'admin' });
    console.log('\n📊 Danh sách Admin trong hệ thống:');
    allAdmins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.name} (${admin.email}) - Role: ${admin.role}`);
    });
    
    console.log('\n✓ Hoàn tất!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi:', error.message);
    process.exit(1);
  }
};

createAdmin();
