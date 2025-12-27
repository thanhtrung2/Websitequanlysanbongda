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
    name: 'Thành Trung M10 Stadium',
    type: '11vs11',
    location: {
      address: 'Đường 30/4, Phường 1',
      city: 'Trà Vinh',
      coordinates: { lat: 9.9347, lng: 106.3422 }
    },
    pricePerHour: 300000,
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    amenities: ['Đèn chiếu sáng', 'Nước uống'],
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
