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
    images: [
      'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&q=80',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'
    ],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Nước uống'],
    subFields: [
      { name: 'Sân A', type: '7vs7', pricePerHour: 200000, status: 'active' },
      { name: 'Sân B', type: '5vs5', pricePerHour: 150000, status: 'active' }
    ],
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
    images: [
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800&q=80',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80'
    ],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe'],
    subFields: [
      { name: 'Sân 1', type: '7vs7', pricePerHour: 200000, status: 'active' },
      { name: 'Sân 2', type: '5vs5', pricePerHour: 150000, status: 'active' },
      { name: 'Sân 3', type: '5vs5', pricePerHour: 120000, status: 'maintenance' }
    ],
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
    images: [
      'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80',
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80'
    ],
    amenities: ['Đèn chiếu sáng', 'Nước uống', 'Wifi'],
    subFields: [
      { name: 'Sân 1', type: '5vs5', pricePerHour: 150000, status: 'active' },
      { name: 'Sân 2', type: '5vs5', pricePerHour: 130000, status: 'active' }
    ],
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
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
      'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80'
    ],
    amenities: ['Đèn chiếu sáng', 'Phòng thay đồ', 'Bãi đỗ xe', 'Căng tin'],
    subFields: [
      { name: 'Sân 1', type: '7vs7', pricePerHour: 180000, status: 'active' },
      { name: 'Sân 2', type: '5vs5', pricePerHour: 140000, status: 'active' }
    ],
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
    images: [
      'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=800&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
      'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?w=800&q=80'
    ],
    amenities: ['Đèn chiếu sáng', 'Nước uống'],
    subFields: [
      { name: 'Sân 1', type: '5vs5', pricePerHour: 120000, status: 'active' },
      { name: 'Sân 2', type: '7vs7', pricePerHour: 160000, status: 'active' },
      { name: 'Sân 3', type: '5vs5', pricePerHour: 100000, status: 'active' }
    ],
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
