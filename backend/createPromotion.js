require('dotenv').config();
const mongoose = require('mongoose');
const Promotion = require('./models/Promotion');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB đã kết nối thành công');
  } catch (error) {
    console.error('✗ Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

const createPromotions = async () => {
  try {
    await connectDB();
    
    // Xóa promotion cũ nếu có
    await Promotion.deleteMany({});
    console.log('✓ Đã xóa các promotion cũ');
    
    // Tạo các promotion mới
    const promotions = [
      {
        name: 'Khuyến mãi khách hàng mới',
        code: 'NEW20',
        type: 'percent',
        value: 20,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-12-31'),
        usageLimit: null, // Không giới hạn
        usageCount: 0,
        minBookingAmount: 0,
        status: 'active'
      },
      {
        name: 'Giảm giá cuối tuần',
        code: 'WEEKEND15',
        type: 'percent',
        value: 15,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-12-31'),
        usageLimit: null,
        usageCount: 0,
        minBookingAmount: 100000,
        status: 'active'
      },
      {
        name: 'Giảm 50k cho đơn từ 200k',
        code: 'SAVE50K',
        type: 'fixed',
        value: 50000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-12-31'),
        usageLimit: 100,
        usageCount: 0,
        minBookingAmount: 200000,
        status: 'active'
      }
    ];
    
    const created = await Promotion.insertMany(promotions);
    
    console.log('\n✓ Đã tạo các chương trình khuyến mãi thành công!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    created.forEach((promo, index) => {
      console.log(`\n${index + 1}. ${promo.name}`);
      console.log(`   📋 Mã: ${promo.code}`);
      console.log(`   💰 Giảm: ${promo.type === 'percent' ? promo.value + '%' : promo.value.toLocaleString() + 'đ'}`);
      console.log(`   📅 Từ: ${promo.startDate.toLocaleDateString('vi-VN')} → ${promo.endDate.toLocaleDateString('vi-VN')}`);
      console.log(`   💵 Đơn tối thiểu: ${promo.minBookingAmount.toLocaleString()}đ`);
      console.log(`   🎯 Giới hạn: ${promo.usageLimit || 'Không giới hạn'}`);
      console.log(`   ✅ Trạng thái: ${promo.status}`);
    });
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💡 Hướng dẫn sử dụng:');
    console.log('   - Khách hàng nhập mã khi đặt sân để được giảm giá');
    console.log('   - Admin có thể quản lý tại: /admin/promotions.html');
    console.log('   - API validate: POST /api/promotions/validate');
    console.log('\n✓ Hoàn tất!');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi:', error.message);
    process.exit(1);
  }
};

createPromotions();
