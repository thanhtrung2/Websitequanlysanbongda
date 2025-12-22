require('dotenv').config();
const mongoose = require('mongoose');
const Promotion = require('./models/Promotion');

const samplePromotions = [
  {
    name: 'FLASH SALE Sáng sớm',
    code: 'MORNING30',
    description: 'Giảm 30% khung giờ 6:00-8:00 sáng',
    type: 'percent',
    value: 30,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 ngày
    usageLimit: 100,
    minBookingAmount: 100000,
    status: 'active',
    showOnBanner: true,
    bannerColor: 'from-orange-500 via-red-500 to-pink-500'
  },
  {
    name: 'Khách hàng mới',
    code: 'NEW20',
    description: 'Giảm 20% cho khách hàng đăng ký mới',
    type: 'percent',
    value: 20,
    startDate: new Date(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 ngày
    usageLimit: 500,
    minBookingAmount: 0,
    status: 'active',
    showOnBanner: false
  },
  {
    name: 'Giảm 50K',
    code: 'GIAM50K',
    description: 'Giảm 50.000đ cho đơn từ 200K',
    type: 'fixed',
    value: 50000,
    startDate: new Date(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 ngày
    usageLimit: 50,
    minBookingAmount: 200000,
    status: 'active',
    showOnBanner: false
  },
  {
    name: 'Cuối tuần vui vẻ',
    code: 'WEEKEND15',
    description: 'Giảm 15% vào cuối tuần',
    type: 'percent',
    value: 15,
    startDate: new Date(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 ngày
    usageLimit: null, // Không giới hạn
    minBookingAmount: 150000,
    status: 'active',
    showOnBanner: false
  }
];

async function seedPromotions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối MongoDB');
    
    // Xóa dữ liệu cũ
    await Promotion.deleteMany({});
    console.log('Đã xóa khuyến mãi cũ');
    
    // Thêm mới
    const result = await Promotion.insertMany(samplePromotions);
    console.log(`✅ Đã thêm ${result.length} mã khuyến mãi!`);
    
    result.forEach(p => {
      console.log(`   - ${p.code}: ${p.name} ${p.showOnBanner ? '(Hiển thị trên banner)' : ''}`);
    });
    
    mongoose.connection.close();
    console.log('\n✅ Hoàn tất!');
  } catch (error) {
    console.error('Lỗi:', error.message);
    process.exit(1);
  }
}

seedPromotions();
