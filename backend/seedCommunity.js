const mongoose = require('mongoose');
const CommunityPost = require('./models/CommunityPost');
const User = require('./models/User');
require('dotenv').config();

const samplePosts = [
  {
    type: 'find_match',
    title: 'Tìm đối giao lưu tối thứ 7 tuần này',
    content: 'Đội mình có 7 người, cần tìm đối giao lưu vui vẻ. Trình độ trung bình, chơi fair play. Ai có đội liên hệ nhé!',
    matchInfo: {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: '19:00',
      location: 'Sân Thành Trung M10',
      fieldType: '7vs7',
      skillLevel: 'intermediate',
      contactPhone: '0901234567'
    },
    status: 'active',
    moderationStatus: 'approved'
  },
  {
    type: 'find_match',
    title: 'Cần thêm 2 người cho đội sáng Chủ nhật',
    content: 'Đội mình thiếu 2 người cho trận sáng CN tuần này. Ai rảnh inbox mình nhé, không phân biệt trình độ!',
    matchInfo: {
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      time: '07:00',
      location: 'Sân Thành Trung M10',
      fieldType: '5vs5',
      skillLevel: 'any',
      contactPhone: '0912345678'
    },
    status: 'active',
    moderationStatus: 'approved'
  },
  {
    type: 'tournament',
    title: '🏆 Giải bóng đá mini Thành Trung Cup 2024',
    content: 'Thông báo tổ chức giải bóng đá mini Thành Trung Cup 2024!\n\n📅 Thời gian: Tháng 1/2025\n👥 Số đội: 8 đội\n💰 Giải thưởng: 5 triệu đồng\n📝 Đăng ký: Liên hệ fanpage hoặc hotline\n\nHạn đăng ký: 25/12/2024',
    matchInfo: {
      date: new Date('2025-01-15'),
      location: 'Sân Thành Trung M10',
      fieldType: '5vs5'
    },
    status: 'active',
    moderationStatus: 'approved'
  },
  {
    type: 'share',
    title: 'Review sân Thành Trung M10 - Sân đẹp, giá hợp lý',
    content: 'Mình vừa đá ở sân Thành Trung M10 tuần trước, chia sẻ với mọi người:\n\n✅ Ưu điểm:\n- Mặt cỏ nhân tạo mới, êm chân\n- Đèn sáng, đá tối ok\n- Có chỗ để xe rộng\n- Nhân viên nhiệt tình\n\n⚠️ Lưu ý:\n- Cuối tuần đông nên đặt sớm\n\nĐánh giá: 9/10 👍',
    status: 'active',
    moderationStatus: 'approved'
  },
  {
    type: 'share',
    title: 'Tips giữ form khi đá bóng phủi',
    content: 'Chia sẻ một số tips giữ form cho anh em đá phủi:\n\n1. Khởi động kỹ 10-15 phút trước khi đá\n2. Uống đủ nước, tránh uống nước đá lạnh\n3. Nghỉ ngơi đủ giấc trước ngày đá\n4. Ăn nhẹ 2 tiếng trước trận\n5. Giãn cơ sau khi đá\n\nAnh em có tips gì hay share thêm nhé!',
    status: 'active',
    moderationStatus: 'approved'
  }
];

async function seedCommunity() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/football-booking');
    console.log('Connected to MongoDB');

    // Tìm user đầu tiên làm author
    let user = await User.findOne();
    if (!user) {
      // Tạo user mẫu nếu chưa có
      user = await User.create({
        name: 'Nguyễn Văn A',
        email: 'user@example.com',
        password: '123456',
        phone: '0901234567',
        role: 'customer'
      });
      console.log('Created sample user');
    }

    // Xóa bài đăng cũ (tùy chọn)
    // await CommunityPost.deleteMany({});

    // Tạo bài đăng mẫu
    for (const postData of samplePosts) {
      const existingPost = await CommunityPost.findOne({ title: postData.title });
      if (!existingPost) {
        await CommunityPost.create({
          ...postData,
          author: user._id
        });
        console.log(`Created post: ${postData.title}`);
      } else {
        console.log(`Post already exists: ${postData.title}`);
      }
    }

    console.log('✅ Seed community posts completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedCommunity();
