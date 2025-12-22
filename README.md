# Website Quản Lý Sân Bóng Đá - Thành Trung M10

## Cấu trúc dự án

```
📁 Website_Quanlysanbongda/
│
├── 📁 frontend/              ← GIAO DIỆN NGƯỜI DÙNG
│   ├── 📁 admin/             (trang quản trị)
│   ├── 📁 css/               (styles)
│   ├── 📁 js/                (JavaScript)
│   ├── 📁 pages/             (login, register, booking...)
│   ├── index.html            (trang chủ)
│   ├── san-bong.html         (danh sách sân)
│   └── package.json
│
├── 📁 backend/               ← API SERVER
│   ├── 📁 config/            (cấu hình database)
│   ├── 📁 controllers/       (xử lý logic)
│   ├── 📁 middleware/        (auth)
│   ├── 📁 models/            (MongoDB schemas)
│   ├── 📁 routes/            (API endpoints)
│   ├── server.js             (entry point)
│   ├── .env                  (biến môi trường)
│   └── package.json
│
└── README.md
```

## Cách chạy dự án

### Bước 1: Cài đặt dependencies

```bash
# Cài đặt cho backend
cd backend
npm install

# (Tùy chọn) Cài đặt cho frontend nếu muốn dùng live-server
cd ../frontend
npm install
```

### Bước 2: Chạy Backend Server

```bash
cd backend
npm start
```

### Bước 3: Truy cập website

Mở trình duyệt: **http://localhost:3000**

---

## Chạy Frontend riêng (tùy chọn)

Nếu muốn chạy frontend riêng với Live Server:

```bash
cd frontend
npm run dev
```

Truy cập: **http://localhost:5500**

⚠️ **Lưu ý:** Khi chạy frontend riêng, backend vẫn phải chạy để API hoạt động.

---

## Scripts hữu ích

```bash
# Tạo tài khoản admin
cd backend && npm run create-admin

# Thêm dữ liệu mẫu
cd backend && npm run seed

# Chạy với nodemon (auto-reload)
cd backend && npm run dev
```

---

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | /api/auth/register | Đăng ký |
| POST | /api/auth/login | Đăng nhập |
| GET | /api/fields | Danh sách sân |
| POST | /api/bookings | Đặt sân |
| GET | /api/users/profile | Thông tin user |
