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

const sampleFields = [
  {
    name: 'Sân bóng Trà Vinh Stadium',
    type: '11vs11',
    location: {
      address: 'Đường 30/4, Phường 1',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9347, lng: 106.3422 }
    },
    pricePerHour: 300000,
    images: ['https://via.placeholder.com/400x300?text=San+Tra+Vinh+Stadium'],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Nước uống'],
    status: 'active'
  },
  {
    name: 'Sân bóng Cầu Quan',
    type: '7vs7',
    location: {
      address: 'Đường Cầu Quan, Phường 4',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9380, lng: 106.3450 }
    },
    pricePerHour: 200000,
    images: ['https://via.placeholder.com/400x300?text=San+Cau+Quan'],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe'],
    status: 'active'
  },
  {
    name: 'Sân bóng Nguyễn Đáng',
    type: '5vs5',
    location: {
      address: 'Đường Nguyễn Đáng, Phường 7',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9420, lng: 106.3380 }
    },
    pricePerHour: 150000,
    images: ['https://via.placeholder.com/400x300?text=San+Nguyen+Dang'],
    amenities: ['Đèn chiếu sáng', 'Nước uống', 'Wifi'],
    status: 'active'
  },
  {
    name: 'Sân bóng Phạm Hùng',
    type: '7vs7',
    location: {
      address: 'Đường Phạm Hùng, Phường 3',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9300, lng: 106.3500 }
    },
    pricePerHour: 180000,
    images: ['https://via.placeholder.com/400x300?text=San+Pham+Hung'],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin'],
    status: 'active'
  },
  {
    name: 'Sân bóng Lê Lợi',
    type: '5vs5',
    location: {
      address: 'Đường Lê Lợi, Phường 2',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9360, lng: 106.3400 }
    },
    pricePerHour: 120000,
    images: ['https://via.placeholder.com/400x300?text=San+Le+Loi'],
    amenities: ['Đèn chiếu sáng', 'Nước uống'],
    status: 'active'
  },
  {
    name: 'Sân bóng Trường THPT Trà Vinh',
    type: '11vs11',
    location: {
      address: 'Đường Phạm Thái Bường, Phường 4',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9400, lng: 106.3470 }
    },
    pricePerHour: 250000,
    images: ['https://via.placeholder.com/400x300?text=San+THPT+Tra+Vinh'],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Khán đài'],
    status: 'active'
  },
  {
    name: 'Sân bóng Hùng Vương',
    type: '7vs7',
    location: {
      address: 'Đường Hùng Vương, Phường 1',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9330, lng: 106.3440 }
    },
    pricePerHour: 190000,
    images: ['https://via.placeholder.com/400x300?text=San+Hung+Vuong'],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Wifi', 'Nước uống'],
    status: 'active'
  },
  {
    name: 'Sân bóng Trần Phú',
    type: '5vs5',
    location: {
      address: 'Đường Trần Phú, Phường 5',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9370, lng: 106.3410 }
    },
    pricePerHour: 130000,
    images: ['https://via.placeholder.com/400x300?text=San+Tran+Phu'],
    amenities: ['Đèn chiếu sáng', 'Bãi đỗ xe'],
    status: 'active'
  }
];

const seedFields = async () => {
  try {
    await connectDB();
    
    // Xóa dữ liệu cũ
    await Field.deleteMany({});
    console.log('Đã xóa dữ liệu cũ');
    
    // Thêm dữ liệu mới
    await Field.insertMany(sampleFields);
    console.log('Đã thêm', sampleFields.length, 'sân bóng vào database');
    
    console.log('Seed data thành công!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi seed data:', error);
    process.exit(1);
  }
};

seedFields();
