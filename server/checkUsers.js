require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB đã kết nối thành công\n');
  } catch (error) {
    console.error('✗ Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

const checkUsers = async () => {
  try {
    await connectDB();
    
    // Lấy tất cả users
    const allUsers = await User.find({});
    
    console.log('📊 DANH SÁCH TẤT CẢ USERS TRONG DATABASE:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (allUsers.length === 0) {
      console.log('⚠️  Không có user nào trong database!');
    } else {
      allUsers.forEach((user, index) => {
        console.log(`\n${index + 1}. USER:`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Tên: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Phone: ${user.phone}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Ngày tạo: ${user.createdAt}`);
      });
      
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n📈 Tổng số users: ${allUsers.length}`);
      
      // Thống kê theo role
      const roleStats = {};
      allUsers.forEach(user => {
        roleStats[user.role] = (roleStats[user.role] || 0) + 1;
      });
      
      console.log('\n📊 Thống kê theo role:');
      Object.entries(roleStats).forEach(([role, count]) => {
        console.log(`   ${role}: ${count} user(s)`);
      });
    }
    
    console.log('\n✓ Hoàn tất!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi:', error.message);
    process.exit(1);
  }
};

checkUsers();
