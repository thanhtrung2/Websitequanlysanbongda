require('dotenv').config();
const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');

const sampleProducts = [
  // Đồ uống
  { name: 'Nước suối Aquafina 500ml', category: 'drink', price: 10000, stock: 100, minStock: 20, description: 'Nước suối tinh khiết' },
  { name: 'Coca Cola 330ml', category: 'drink', price: 15000, stock: 80, minStock: 15, description: 'Nước ngọt có gas' },
  { name: 'Pepsi 330ml', category: 'drink', price: 15000, stock: 75, minStock: 15, description: 'Nước ngọt có gas' },
  { name: 'Sting dâu 330ml', category: 'drink', price: 12000, stock: 60, minStock: 15, description: 'Nước tăng lực' },
  { name: 'Red Bull 250ml', category: 'drink', price: 20000, stock: 50, minStock: 10, description: 'Nước tăng lực' },
  { name: 'Trà xanh C2 500ml', category: 'drink', price: 12000, stock: 70, minStock: 15, description: 'Trà xanh đóng chai' },
  { name: 'Nước cam Twister 350ml', category: 'drink', price: 15000, stock: 45, minStock: 10, description: 'Nước cam ép' },
  { name: 'Revive 500ml', category: 'drink', price: 15000, stock: 55, minStock: 12, description: 'Nước uống bổ sung ion' },
  
  // Bóng
  { name: 'Bóng đá Động Lực số 5', category: 'ball', price: 250000, stock: 20, minStock: 5, description: 'Bóng đá tiêu chuẩn thi đấu' },
  { name: 'Bóng đá Mikasa số 5', category: 'ball', price: 350000, stock: 15, minStock: 3, description: 'Bóng đá cao cấp Nhật Bản' },
  { name: 'Bóng đá mini số 4', category: 'ball', price: 180000, stock: 25, minStock: 5, description: 'Bóng đá sân 5 người' },
  { name: 'Bóng đá Zocker', category: 'ball', price: 200000, stock: 18, minStock: 4, description: 'Bóng đá tập luyện' },
  
  // Thiết bị
  { name: 'Áo bib tập luyện', category: 'equipment', price: 30000, stock: 50, minStock: 10, description: 'Áo phân biệt đội, nhiều màu' },
  { name: 'Găng tay thủ môn', category: 'equipment', price: 150000, stock: 10, minStock: 3, description: 'Găng tay chuyên dụng' },
  { name: 'Bơm bóng tay', category: 'equipment', price: 50000, stock: 8, minStock: 2, description: 'Bơm tay mini' },
  { name: 'Lưới khung thành 5 người', category: 'equipment', price: 500000, stock: 4, minStock: 2, description: 'Lưới thay thế' },
  { name: 'Lưới khung thành 7 người', category: 'equipment', price: 700000, stock: 4, minStock: 2, description: 'Lưới thay thế' },
  { name: 'Cọc tập luyện', category: 'equipment', price: 80000, stock: 30, minStock: 5, description: 'Cọc nhựa tập rê bóng' },
  { name: 'Còi trọng tài', category: 'equipment', price: 25000, stock: 15, minStock: 3, description: 'Còi Fox 40' },
  { name: 'Thẻ vàng/đỏ trọng tài', category: 'equipment', price: 20000, stock: 10, minStock: 2, description: 'Bộ thẻ trọng tài' },
  
  // Khác
  { name: 'Khăn lạnh', category: 'other', price: 15000, stock: 40, minStock: 10, description: 'Khăn làm mát' },
  { name: 'Băng keo thể thao', category: 'other', price: 25000, stock: 20, minStock: 5, description: 'Băng keo y tế' },
  { name: 'Túi đá lạnh', category: 'other', price: 10000, stock: 30, minStock: 8, description: 'Túi chườm đá' },
  { name: 'Dầu nóng Salonpas', category: 'other', price: 35000, stock: 15, minStock: 5, description: 'Dầu xoa bóp' },
  { name: 'Bình xịt làm mát', category: 'other', price: 45000, stock: 12, minStock: 3, description: 'Xịt làm mát cơ thể' }
];

async function seedInventory() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối MongoDB');
    
    // Xóa dữ liệu cũ (tùy chọn)
    // await Inventory.deleteMany({});
    // console.log('Đã xóa dữ liệu cũ');
    
    // Thêm sản phẩm mới
    const result = await Inventory.insertMany(sampleProducts);
    console.log(`✅ Đã thêm ${result.length} sản phẩm vào kho!`);
    
    // Hiển thị thống kê
    const stats = await Inventory.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, totalStock: { $sum: '$stock' } } }
    ]);
    console.log('\n📊 Thống kê:');
    stats.forEach(s => {
      const catName = { drink: 'Đồ uống', ball: 'Bóng', equipment: 'Thiết bị', other: 'Khác' };
      console.log(`   ${catName[s._id]}: ${s.count} sản phẩm, ${s.totalStock} đơn vị`);
    });
    
    mongoose.connection.close();
    console.log('\n✅ Hoàn tất!');
  } catch (error) {
    console.error('Lỗi:', error.message);
    process.exit(1);
  }
}

seedInventory();
