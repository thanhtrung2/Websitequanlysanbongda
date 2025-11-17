# 📁 DANH SÁCH TẤT CẢ CÁC TRANG WEBSITE

## 🏠 TRANG CHỦ & CHÍNH

### 1. Trang chủ
- **File**: `client/index.html`
- **URL**: http://localhost:3000
- **Mô tả**: Trang chủ với hero section, tính năng nổi bật
- **Trạng thái**: ✅ Hoạt động

---

## 👤 TRANG NGƯỜI DÙNG

### 2. Đăng ký
- **File**: `client/pages/register.html`
- **URL**: http://localhost:3000/pages/register.html
- **Mô tả**: Form đăng ký tài khoản mới
- **Chức năng**: Lưu user vào MongoDB Atlas
- **Trạng thái**: ✅ Hoạt động

### 3. Đăng nhập
- **File**: `client/pages/login.html`
- **URL**: http://localhost:3000/pages/login.html
- **Mô tả**: Form đăng nhập
- **Chức năng**: Nhận JWT token
- **Trạng thái**: ✅ Hoạt động

### 4. Profile (Phiên bản cũ)
- **File**: `client/pages/profile.html`
- **URL**: http://localhost:3000/pages/profile.html
- **Mô tả**: Trang thông tin cá nhân
- **Trạng thái**: ⚠️ Có thể bị lỗi cache

### 5. Profile
- **File**: `client/pages/profile.html`
- **URL**: http://localhost:3000/pages/profile.html
- **Mô tả**: Trang thông tin cá nhân
- **Chức năng**: Hiển thị thông tin user từ MongoDB
- **Trạng thái**: ✅ Hoạt động

---

## ⚽ TRANG SÂN BÓNG

### 6. Danh sách sân (Phiên bản 1)
- **File**: `client/pages/fields.html`
- **URL**: http://localhost:3000/pages/fields.html
- **Mô tả**: Danh sách sân với filter
- **Trạng thái**: ⚠️ Có thể bị lỗi cache

### 7. Danh sách sân (Phiên bản đơn giản)
- **File**: `client/pages/fields-simple.html`
- **URL**: http://localhost:3000/pages/fields-simple.html
- **Mô tả**: Danh sách sân đơn giản
- **Trạng thái**: ✅ Hoạt động

### 8. Danh sách sân (Phiên bản tốt nhất)
- **File**: `client/san-bong.html`
- **URL**: http://localhost:3000/san-bong.html
- **Mô tả**: Danh sách 8 sân bóng ở Trà Vinh
- **Chức năng**: Hiển thị sân từ MongoDB, link đến trang đặt sân
- **Trạng thái**: ✅ Hoạt động tốt

### 9. Đặt sân (MỚI)
- **File**: `client/pages/booking.html`
- **URL**: http://localhost:3000/pages/booking.html?fieldId=XXX
- **Mô tả**: Trang đặt sân với lịch trống/đã đặt
- **Chức năng**: 
  - Hiển thị thông tin chi tiết sân
  - Chọn ngày và giờ
  - Hiển thị lịch đã đặt
  - Xác nhận đặt sân
- **Trạng thái**: ✅ Mới tạo

---

## 🧪 TRANG TEST & DEBUG

### 10. Test API
- **File**: `client/test-api.html`
- **URL**: http://localhost:3000/test-api.html
- **Mô tả**: Test kết nối API fields
- **Trạng thái**: ✅ Hoạt động

### 11. Test Profile API
- **File**: `client/test-profile.html`
- **URL**: http://localhost:3000/test-profile.html
- **Mô tả**: Test API profile và kiểm tra token
- **Trạng thái**: ✅ Hoạt động

### 12. Xóa Cache
- **File**: `client/clear-cache.html`
- **URL**: http://localhost:3000/clear-cache.html
- **Mô tả**: Xóa localStorage và cache
- **Trạng thái**: ✅ Hoạt động

---

## 📂 CẤU TRÚC FOLDER ĐẦY ĐỦ

```
Website_Quanlysanbongda/
│
├── client/                          # Frontend
│   ├── pages/                       # Các trang HTML
│   │   ├── register.html           # Đăng ký
│   │   ├── login.html              # Đăng nhập
│   │   ├── profile.html            # Profile
│   │   ├── fields.html             # Danh sách sân (v1)
│   │   ├── fields-simple.html      # Danh sách sân (đơn giản)
│   │   └── booking.html            # Đặt sân (MỚI)
│   │
│   ├── js/                          # JavaScript files
│   │   ├── main.js                 # Functions chung
│   │   ├── auth.js                 # Xử lý đăng nhập/đăng ký
│   │   ├── fields.js               # Xử lý danh sách sân
│   │   └── profile.js              # Xử lý profile
│   │
│   ├── css/                         # CSS files
│   │   └── style.css               # Custom styles
│   │
│   ├── index.html                   # Trang chủ
│   ├── san-bong.html               # Danh sách sân (tốt nhất)
│   ├── test-api.html               # Test API
│   ├── test-profile.html           # Test Profile
│   └── clear-cache.html            # Xóa cache
│
├── server/                          # Backend
│   ├── config/                      # Cấu hình
│   │   └── database.js             # Kết nối MongoDB
│   │
│   ├── models/                      # MongoDB Models
│   │   ├── User.js                 # Model User
│   │   ├── Field.js                # Model Sân bóng
│   │   └── Booking.js              # Model Đặt sân
│   │
│   ├── controllers/                 # Business Logic
│   │   ├── authController.js       # Xử lý auth
│   │   ├── userController.js       # Xử lý user
│   │   ├── fieldController.js      # Xử lý sân
│   │   └── bookingController.js    # Xử lý đặt sân
│   │
│   ├── routes/                      # API Routes
│   │   ├── authRoutes.js           # Routes auth
│   │   ├── userRoutes.js           # Routes user
│   │   ├── fieldRoutes.js          # Routes sân
│   │   └── bookingRoutes.js        # Routes đặt sân
│   │
│   ├── middleware/                  # Middleware
│   │   └── auth.js                 # JWT authentication
│   │
│   ├── server.js                    # Entry point
│   └── seedData.js                 # Seed dữ liệu mẫu
│
├── .env                             # Environment variables
├── .gitignore                       # Git ignore
├── package.json                     # Dependencies
├── HUONG_DAN_SU_DUNG.md            # Hướng dẫn sử dụng
└── DANH_SACH_TRANG.md              # File này

```

---

## 🎯 TRANG NÀO NÊN DÙNG?

### ✅ KHUYẾN NGHỊ SỬ DỤNG:

1. **Trang chủ**: `index.html`
2. **Đăng ký**: `pages/register.html`
3. **Đăng nhập**: `pages/login.html`
4. **Danh sách sân**: `san-bong.html` ⭐ (TỐT NHẤT)
5. **Đặt sân**: `pages/booking.html` ⭐ (MỚI)
6. **Profile**: `pages/profile.html` ⭐

### ⚠️ TRANG CÓ THỂ BỊ LỖI CACHE:

- `pages/fields.html`
- `pages/profile.html`

### 🧪 TRANG DEBUG:

- `test-api.html`
- `test-profile.html`
- `clear-cache.html`

---

## 🚀 LUỒNG SỬ DỤNG CHUẨN

1. Mở trang chủ: http://localhost:3000
2. Đăng ký tài khoản: http://localhost:3000/pages/register.html
3. Đăng nhập: http://localhost:3000/pages/login.html
4. Xem danh sách sân: http://localhost:3000/san-bong.html
5. Click "Đặt sân" → Chuyển đến trang booking
6. Chọn ngày, giờ và xác nhận đặt sân
7. Xem profile: http://localhost:3000/pages/profile.html

---

## 📊 DATABASE

### MongoDB Atlas Collections:

1. **users** - Người dùng
2. **fields** - 8 sân bóng ở Trà Vinh
3. **bookings** - Lịch đặt sân

### Xem dữ liệu:
- Vào: https://cloud.mongodb.com/
- Project: Qlsbd
- Database: football_field_db

---

## 🔗 API ENDPOINTS

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Users
- GET `/api/users/profile` (cần token)
- PUT `/api/users/profile` (cần token)

### Fields
- GET `/api/fields`
- GET `/api/fields/:id`

### Bookings
- GET `/api/bookings` (query: fieldId, date)
- POST `/api/bookings` (cần token)
- GET `/api/bookings/my-bookings` (cần token)

---

## 💡 LƯU Ý

- Server chạy tại: http://localhost:3000
- MongoDB Atlas đã kết nối
- Tất cả API đều hoạt động
- Nếu trang bị lỗi, thử xóa cache hoặc dùng Incognito
