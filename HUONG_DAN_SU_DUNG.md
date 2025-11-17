# HƯỚNG DẪN SỬ DỤNG WEBSITE QUẢN LÝ SÂN BÓNG

## 🚀 Khởi động dự án

Server đang chạy tại: **http://localhost:3000**

## ✅ Các trang hoạt động

### 1. Trang chủ
- URL: http://localhost:3000
- Trạng thái: ✅ Hoạt động

### 2. Đăng ký
- URL: http://localhost:3000/pages/register.html
- Trạng thái: ✅ Hoạt động
- Dữ liệu lưu vào MongoDB Atlas

### 3. Đăng nhập
- URL: http://localhost:3000/pages/login.html
- Trạng thái: ✅ Hoạt động
- Nhận token từ server

### 4. Danh sách sân (Đơn giản)
- URL: http://localhost:3000/san-bong.html
- Trạng thái: ✅ Hoạt động
- Hiển thị 8 sân bóng ở Trà Vinh

### 5. Test API
- URL: http://localhost:3000/test-api.html
- Kiểm tra kết nối API

### 6. Test Profile
- URL: http://localhost:3000/test-profile.html
- Kiểm tra API profile và token

## ⚠️ Vấn đề hiện tại

### Trang Profile không hiển thị dữ liệu
**Nguyên nhân có thể:**
1. JavaScript bị block bởi trình duyệt
2. Cache trình duyệt
3. Token hết hạn

**Giải pháp:**

### Bước 1: Xóa cache trình duyệt
1. Nhấn `Ctrl + Shift + Delete`
2. Chọn "Cached images and files"
3. Click "Clear data"

### Bước 2: Mở Console để debug
1. Nhấn `F12` để mở Developer Tools
2. Chọn tab "Console"
3. Refresh trang (F5)
4. Xem có lỗi màu đỏ không

### Bước 3: Kiểm tra token
1. Mở http://localhost:3000/test-profile.html
2. Xem có token không
3. Nếu không có hoặc lỗi 401 → Đăng nhập lại

### Bước 4: Thử trình duyệt khác
- Chrome
- Edge
- Firefox
- Hoặc chế độ Incognito

## 📊 Dữ liệu trong MongoDB Atlas

### Database: football_field_db

### Collections:
1. **users** - Người dùng (đăng ký/đăng nhập)
2. **fields** - 8 sân bóng ở Trà Vinh
3. **bookings** - Lịch đặt sân (chưa có)

### Xem dữ liệu:
1. Vào https://cloud.mongodb.com/
2. Chọn project "Qlsbd"
3. Click "Browse Collections"
4. Xem các collection

## 🔧 API Endpoints

### Authentication
- POST `/api/auth/register` - Đăng ký
- POST `/api/auth/login` - Đăng nhập

### Users
- GET `/api/users/profile` - Lấy thông tin user (cần token)
- PUT `/api/users/profile` - Cập nhật thông tin (cần token)

### Fields
- GET `/api/fields` - Lấy danh sách sân

### Bookings
- GET `/api/bookings/my-bookings` - Lịch đặt của user (cần token)
- POST `/api/bookings` - Tạo đặt sân mới (cần token)

## 🐛 Debug

### Kiểm tra server
```bash
curl http://localhost:3000/api/fields
```

### Kiểm tra profile API (cần token)
```bash
curl http://localhost:3000/api/users/profile -H "Authorization: Bearer YOUR_TOKEN"
```

## 📝 Ghi chú

- Server chạy với nodemon, tự động restart khi code thay đổi
- MongoDB Atlas đã kết nối thành công
- CORS đã được cấu hình
- Tất cả API đều hoạt động tốt

## 🎯 Các trang đơn giản (chắc chắn hoạt động)

1. **san-bong.html** - Danh sách sân (không cần đăng nhập)
2. **test-api.html** - Test API fields
3. **test-profile.html** - Test API profile (cần đăng nhập)

Nếu các trang phức tạp không hoạt động, hãy dùng các trang đơn giản này!
