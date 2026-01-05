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

const createStaff = async () => {
  try {
    await connectDB();
    
    // Tạo nhân viên mẫu
    const staffData = [
      {
        name: 'Nhân viên 1',
        email: 'staff1@travinh.com',
        password: 'staff123456',
        phone: '0901234567',
        role: 'staff'
      },
      {
        name: 'Nhân viên 2', 
        email: 'staff2@travinh.com',
        password: 'staff123456',
        phone: '0901234568',
        role: 'staff'
      }
    ];
    
    console.log('\n📋 Tạo tài khoản nhân viên...\n');
    
    for (const data of staffData) {
      const existing = await User.findOne({ email: data.email });
      
      if (existing) {
        console.log(`⚠️  ${data.email} đã tồn tại`);
        // Cập nhật role nếu cần
        if (existing.role !== 'staff') {
          existing.role = 'staff';
          await existing.save();
          console.log(`   → Đã cập nhật role thành staff`);
        }
      } else {
        await User.create(data);
        console.log(`✓ Đã tạo: ${data.name} (${data.email})`);
      }
    }
    
    // Hiển thị tất cả staff
    const allStaff = await User.find({ role: { $in: ['admin', 'staff'] } }).select('-password');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 DANH SÁCH TÀI KHOẢN ADMIN/STAFF:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    allStaff.forEach((user, index) => {
      const roleIcon = user.role === 'admin' ? '👑' : '👤';
      console.log(`${index + 1}. ${roleIcon} ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔑 Password: ${user.role === 'admin' ? 'admin123456' : 'staff123456'}`);
      console.log(`   📱 Phone: ${user.phone || 'N/A'}`);
      console.log(`   🏷️  Role: ${user.role.toUpperCase()}`);
      console.log('');
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📌 PHÂN QUYỀN:');
    console.log('   👑 ADMIN: Toàn quyền quản lý hệ thống');
    console.log('   👤 STAFF: Dashboard, Đặt sân, Khách hàng, Cộng đồng, Kho hàng');
    console.log('\n✓ Hoàn tất!');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi:', error.message);
    process.exit(1);
  }
};

createStaff();
