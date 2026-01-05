# Website Quản Lý Sân Bóng Đá - Thành Trung M10

## 🛠️ Công nghệ & Công cụ sử dụng

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| HTML5 | - | Cấu trúc trang web |
| CSS3 | - | Styling và animations |
| Tailwind CSS | 3.x | Framework CSS utility-first |
| JavaScript | ES6+ | Logic và tương tác |
| Font Awesome | 6.x | Icon library |
| Google Fonts | - | Typography (Inter, Roboto) |

### Backend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| Node.js | 18.x+ | Runtime environment |
| Express.js | 4.x | Web framework |
| MongoDB | 6.x | NoSQL Database |
| Mongoose | 7.x | MongoDB ODM |
| JWT | - | Authentication tokens |
| bcryptjs | - | Password hashing |
| dotenv | - | Environment variables |
| cors | - | Cross-origin requests |

### Công cụ phát triển
| Công cụ | Mục đích |
|---------|----------|
| VS Code / Kiro | Code editor / AI IDE |
| Postman | API testing |
| MongoDB Compass | Database GUI |
| Git | Version control |
| npm | Package manager |
| nodemon | Auto-reload server |
| Live Server | Frontend development |

### Thiết kế & UI/UX
| Công cụ | Mục đích |
|---------|----------|
| Figma | UI/UX Design |
| Tailwind UI | Component library |
| Heroicons | Icon set |
| Unsplash | Stock images |

---

## � CLý thuyết & Code Examples

### 1. HTML5 - Ngôn ngữ đánh dấu siêu văn bản

**Lý thuyết:**
HTML5 (HyperText Markup Language 5) là phiên bản mới nhất của ngôn ngữ đánh dấu dùng để xây dựng cấu trúc trang web. HTML5 bổ sung nhiều thẻ semantic mới như `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>` giúp cấu trúc trang web rõ ràng hơn và tối ưu SEO.

**Đặc điểm chính:**
- Semantic tags: Thẻ có ý nghĩa rõ ràng
- Multimedia: Hỗ trợ `<video>`, `<audio>` không cần plugin
- Form controls: Input types mới (email, date, number...)
- Canvas & SVG: Vẽ đồ họa trực tiếp
- Local Storage: Lưu trữ dữ liệu trên trình duyệt

**Code Example:**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sân Bóng Thành Trung M10</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="font-inter bg-gray-50">
    <!-- Content -->
</body>
</html>
```

---

### 2. Tailwind CSS - Framework CSS Utility-First

**Lý thuyết:**
Tailwind CSS là một utility-first CSS framework, cho phép xây dựng giao diện bằng cách kết hợp các class nhỏ (utility classes) trực tiếp trong HTML. Thay vì viết CSS riêng, bạn sử dụng các class có sẵn như `bg-blue-500`, `text-center`, `p-4`.

**Ưu điểm:**
- Không cần đặt tên class CSS
- Responsive design dễ dàng với prefix (sm:, md:, lg:)
- Customizable thông qua config
- Purge CSS tự động loại bỏ class không dùng
- Hover, focus states với prefix (hover:, focus:)

**Code Example:**
```html
<!-- Button với gradient -->
<button class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl 
               hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 
               transition-all duration-300 shadow-lg hover:shadow-xl">
    Đặt Sân Ngay
</button>

<!-- Card sân bóng -->
<div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
    <img src="field.jpg" alt="Sân bóng" class="w-full h-48 object-cover">
    <div class="p-6">
        <h3 class="text-xl font-bold text-gray-800">Sân A1</h3>
        <p class="text-green-600 font-semibold">500.000đ/giờ</p>
    </div>
</div>
```

---

### 3. CSS3 - Cascading Style Sheets Level 3

**Lý thuyết:**
CSS3 là phiên bản mới nhất của CSS, bổ sung nhiều tính năng mạnh mẽ như animations, transitions, flexbox, grid layout, media queries. CSS3 cho phép tạo hiệu ứng động mà không cần JavaScript.

**Tính năng nổi bật:**
- Animations & Keyframes: Tạo hiệu ứng động
- Transitions: Chuyển đổi mượt mà giữa các trạng thái
- Flexbox & Grid: Layout linh hoạt
- Media Queries: Responsive design
- Gradients: Màu gradient tuyến tính và xuyên tâm
- Box Shadow & Border Radius: Hiệu ứng bóng và bo góc

**Code Example:**
```css
/* Fade in animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeInUp 0.6s ease-out forwards;
}

/* Gradient background animation */
@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.gradient-animate {
    background: linear-gradient(-45deg, #10b981, #059669, #047857, #065f46);
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
}
```

---

### 4. JavaScript ES6+ - ECMAScript 2015 trở lên

**Lý thuyết:**
JavaScript ES6+ là phiên bản hiện đại của JavaScript với nhiều cú pháp mới giúp code ngắn gọn và dễ đọc hơn. ES6 giới thiệu arrow functions, template literals, destructuring, modules, promises, async/await.

**Tính năng quan trọng:**
- Arrow Functions: `() => {}` - cú pháp ngắn gọn
- Async/Await: Xử lý bất đồng bộ dễ đọc
- Fetch API: Gọi HTTP requests
- Template Literals: String interpolation với backticks
- Destructuring: Trích xuất giá trị từ object/array
- Spread Operator: `...` để copy và merge
- Modules: Import/Export code

**Code Example:**
```javascript
// Đăng nhập user
async function login(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/';
        } else {
            showToast(data.message, 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
    }
}

// Lấy danh sách sân với token
async function getFields() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/fields', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
}
```

---

### 5. Node.js - JavaScript Runtime Environment

**Lý thuyết:**
Node.js là môi trường runtime cho phép chạy JavaScript phía server. Được xây dựng trên V8 engine của Chrome, Node.js sử dụng mô hình event-driven, non-blocking I/O giúp xử lý nhiều request đồng thời hiệu quả.

**Đặc điểm:**
- Single-threaded với Event Loop
- Non-blocking I/O: Không chờ đợi I/O operations
- NPM: Package manager lớn nhất thế giới
- Cross-platform: Chạy trên Windows, macOS, Linux
- Phù hợp cho: REST APIs, Real-time apps, Microservices

**Code Example:**
```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/fields', require('./routes/fieldRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Connect MongoDB & Start Server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error('MongoDB Error:', err));
```

---

### 6. MongoDB & Mongoose - NoSQL Database

**Lý thuyết:**
MongoDB là cơ sở dữ liệu NoSQL document-oriented, lưu trữ dữ liệu dạng JSON-like documents (BSON). Mongoose là ODM (Object Document Mapper) giúp tương tác với MongoDB dễ dàng hơn thông qua schemas và models.

**Đặc điểm MongoDB:**
- Document-based: Lưu trữ dạng JSON documents
- Schema-less: Linh hoạt cấu trúc dữ liệu
- Scalable: Horizontal scaling với sharding
- High Performance: Indexing và aggregation mạnh mẽ

**Mongoose Features:**
- Schema Definition: Định nghĩa cấu trúc document
- Validation: Kiểm tra dữ liệu trước khi lưu
- Middleware (Hooks): pre/post save, update, delete
- Virtual Properties: Computed fields
- Population: Join documents

**Code Example:**
```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: '' }
}, { timestamps: true });

// Hash password trước khi save
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// So sánh password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

---

### 7. JWT - JSON Web Token Authentication

**Lý thuyết:**
JWT (JSON Web Token) là tiêu chuẩn mở (RFC 7519) để truyền thông tin an toàn giữa các bên dưới dạng JSON object. JWT thường dùng cho authentication và authorization trong web applications.

**Cấu trúc JWT (3 phần):**
1. **Header**: Thuật toán mã hóa (HS256, RS256)
2. **Payload**: Dữ liệu (user id, role, expiration)
3. **Signature**: Chữ ký xác thực

**Quy trình:**
1. User đăng nhập → Server tạo JWT
2. Client lưu JWT (localStorage/cookie)
3. Client gửi JWT trong header mỗi request
4. Server verify JWT và xử lý request

**Code Example:**
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
    }
};

// Tạo token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = { protect, generateToken };
```

---

### 8. bcryptjs - Password Hashing

**Lý thuyết:**
bcryptjs là thư viện JavaScript để hash mật khẩu sử dụng thuật toán bcrypt. Bcrypt được thiết kế chậm có chủ đích để chống brute-force attacks, và tự động thêm salt để chống rainbow table attacks.

**Tại sao dùng bcrypt:**
- **Salt**: Tự động tạo salt ngẫu nhiên cho mỗi password
- **Cost Factor**: Điều chỉnh độ phức tạp (rounds)
- **One-way Hash**: Không thể giải mã ngược
- **Timing-safe**: Chống timing attacks

**Quy trình:**
1. User đăng ký → Hash password với salt
2. Lưu hashed password vào database
3. User đăng nhập → Compare input với hash
4. bcrypt.compare() trả về true/false

**Code Example:**
```javascript
// controllers/authController.js
const bcrypt = require('bcryptjs');

// Đăng ký
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    
    res.status(201).json({ success: true, user });
};

// Đăng nhập - So sánh password
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(401).json({ message: 'Email không tồn tại' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }
    
    const token = generateToken(user._id);
    res.json({ success: true, token, user });
};
```

---

### 9. Express.js Routes - RESTful API

**Lý thuyết:**
Express.js là web framework phổ biến nhất cho Node.js, cung cấp cách đơn giản để xây dựng web servers và APIs. Express Router cho phép tổ chức routes theo modules, giúp code clean và maintainable.

**RESTful API Conventions:**
| Method | Endpoint | Action |
|--------|----------|--------|
| GET | /api/users | Lấy danh sách |
| GET | /api/users/:id | Lấy chi tiết |
| POST | /api/users | Tạo mới |
| PUT | /api/users/:id | Cập nhật toàn bộ |
| PATCH | /api/users/:id | Cập nhật một phần |
| DELETE | /api/users/:id | Xóa |

**Middleware:**
- Xử lý request trước khi đến route handler
- Authentication, logging, validation, error handling

**Code Example:**
```javascript
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
```

---

### 10. Font Awesome - Icon Library

**Lý thuyết:**
Font Awesome là thư viện icon vector phổ biến nhất, cung cấp hàng nghìn icons miễn phí. Icons được render dưới dạng font hoặc SVG, dễ dàng tùy chỉnh kích thước, màu sắc thông qua CSS.

**Cách sử dụng:**
- **Solid icons**: `fas fa-icon-name` (filled)
- **Regular icons**: `far fa-icon-name` (outline)
- **Brands icons**: `fab fa-icon-name` (logos)

**Tùy chỉnh:**
- Size: `fa-xs`, `fa-sm`, `fa-lg`, `fa-2x`...`fa-10x`
- Animation: `fa-spin`, `fa-pulse`, `fa-beat`
- Rotation: `fa-rotate-90`, `fa-flip-horizontal`
- Color: Dùng CSS `color` property

**Code Example:**
```html
<!-- Các icon thường dùng -->
<i class="fas fa-futbol"></i>          <!-- Bóng đá -->
<i class="fas fa-user"></i>            <!-- User -->
<i class="fas fa-calendar-alt"></i>    <!-- Lịch -->
<i class="fas fa-shopping-cart"></i>   <!-- Giỏ hàng -->
<i class="fas fa-bell"></i>            <!-- Thông báo -->
<i class="fas fa-sign-out-alt"></i>    <!-- Đăng xuất -->
<i class="fas fa-check-circle"></i>    <!-- Check -->
<i class="fas fa-times-circle"></i>    <!-- Close -->
<i class="fas fa-spinner fa-spin"></i> <!-- Loading -->
```

---

### 11. CORS - Cross-Origin Resource Sharing

**Lý thuyết:**
CORS là cơ chế bảo mật của trình duyệt, kiểm soát việc chia sẻ tài nguyên giữa các domain khác nhau. Mặc định, trình duyệt chặn requests từ domain khác (Same-Origin Policy). CORS cho phép server chỉ định domain nào được phép truy cập.

**Khi nào cần CORS:**
- Frontend (localhost:5500) gọi API Backend (localhost:3000)
- Web app gọi API từ domain khác
- Microservices architecture

**CORS Headers:**
- `Access-Control-Allow-Origin`: Domain được phép
- `Access-Control-Allow-Methods`: HTTP methods cho phép
- `Access-Control-Allow-Headers`: Headers cho phép
- `Access-Control-Allow-Credentials`: Cho phép cookies

**Code Example:**
```javascript
// Cấu hình CORS chi tiết
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
```

---

### 12. dotenv - Environment Variables Management

**Lý thuyết:**
dotenv là module giúp load biến môi trường từ file `.env` vào `process.env`. Biến môi trường dùng để lưu trữ cấu hình nhạy cảm (API keys, database URLs, secrets) mà không commit vào source code.

**Tại sao dùng Environment Variables:**
- **Security**: Không lộ secrets trong code
- **Flexibility**: Thay đổi config không cần sửa code
- **Environment-specific**: Dev, staging, production khác nhau
- **12-Factor App**: Best practice cho cloud apps

**Best Practices:**
- Không commit file `.env` (thêm vào .gitignore)
- Tạo file `.env.example` làm template
- Validate required env vars khi khởi động
- Sử dụng default values cho optional vars

**Code Example:**
```javascript
// Load biến môi trường
require('dotenv').config();

// Sử dụng
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

// File .env
// PORT=3000
// MONGODB_URI=mongodb://localhost:27017/sanbongda
// JWT_SECRET=your_super_secret_key_here
```

---

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

**Lý thuyết:**
API (Application Programming Interface) là giao diện cho phép các ứng dụng giao tiếp với nhau. REST API sử dụng HTTP methods (GET, POST, PUT, DELETE) để thao tác với tài nguyên (resources) thông qua URL endpoints. Mỗi endpoint đại diện cho một tài nguyên hoặc hành động cụ thể trên server.

**Nguyên tắc REST:**
- **Stateless**: Mỗi request độc lập, server không lưu trạng thái client
- **Resource-based**: URL đại diện cho tài nguyên (nouns), không phải hành động (verbs)
- **HTTP Methods**: GET (đọc), POST (tạo), PUT/PATCH (cập nhật), DELETE (xóa)
- **JSON Format**: Dữ liệu trao đổi dạng JSON

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | /api/auth/register | Đăng ký tài khoản mới - Nhận name, email, password → Trả về token JWT |
| POST | /api/auth/login | Xác thực đăng nhập - Nhận email, password → Trả về token JWT và thông tin user |
| GET | /api/fields | Lấy danh sách tất cả sân bóng - Trả về array các sân với thông tin chi tiết |
| POST | /api/bookings | Tạo đơn đặt sân mới - Cần token xác thực, nhận field ID, date, time → Trả về booking info |
| GET | /api/users/profile | Lấy thông tin profile user đang đăng nhập - Cần token xác thực trong header |

---

## 🌐 API - Lý thuyết & Code Examples

### API là gì?

**Lý thuyết:**
API (Application Programming Interface) là giao diện lập trình ứng dụng, cho phép các phần mềm giao tiếp với nhau. Trong web development, REST API là kiến trúc phổ biến nhất để xây dựng web services.

**REST API Principles:**
- **Stateless**: Server không lưu trạng thái client
- **Client-Server**: Tách biệt frontend và backend
- **Uniform Interface**: Sử dụng HTTP methods chuẩn
- **Resource-based**: URL đại diện cho tài nguyên

**HTTP Methods:**
| Method | Mục đích | Ví dụ |
|--------|----------|-------|
| GET | Lấy dữ liệu | GET /api/fields |
| POST | Tạo mới | POST /api/bookings |
| PUT | Cập nhật toàn bộ | PUT /api/users/123 |
| PATCH | Cập nhật một phần | PATCH /api/users/123 |
| DELETE | Xóa | DELETE /api/fields/123 |

**HTTP Status Codes:**
| Code | Ý nghĩa |
|------|---------|
| 200 | OK - Thành công |
| 201 | Created - Tạo mới thành công |
| 400 | Bad Request - Request không hợp lệ |
| 401 | Unauthorized - Chưa xác thực |
| 403 | Forbidden - Không có quyền |
| 404 | Not Found - Không tìm thấy |
| 500 | Internal Server Error - Lỗi server |

---

### API Authentication - Đăng ký & Đăng nhập

**Lý thuyết:**
API xác thực người dùng gồm 3 chức năng chính:
- **Đăng ký**: Nhận thông tin từ người dùng, mã hóa mật khẩu bằng bcrypt để bảo mật, lưu vào cơ sở dữ liệu MongoDB, sau đó tạo mã token JWT gửi về cho người dùng.
- **Đăng nhập**: Kiểm tra email có tồn tại không, so sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong database. Nếu đúng thì tạo token JWT trả về.
- **Lấy thông tin**: Các trang cần đăng nhập sẽ kiểm tra token trong header request. Token hợp lệ thì cho phép truy cập.

**Đăng ký tài khoản:**
```javascript
// POST /api/auth/register
// Request:
{
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "password": "123456",
    "phone": "0901234567"
}
// Response (201):
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { "_id": "64abc123", "name": "Nguyễn Văn A", "email": "user@example.com", "role": "user" }
}
```

**Đăng nhập:**
```javascript
// POST /api/auth/login
// Request:
{ "email": "user@example.com", "password": "123456" }
// Response (200):
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { "_id": "64abc123", "name": "Nguyễn Văn A", "role": "user" }
}
// Error (401):
{ "success": false, "message": "Email hoặc mật khẩu không đúng" }
```

**Lấy Profile:**
```javascript
// GET /api/auth/profile
// Headers: Authorization: Bearer <token>
// Response (200):
{
    "success": true,
    "user": { "_id": "64abc123", "name": "Nguyễn Văn A", "email": "user@example.com", "phone": "0901234567", "role": "user" }
}
```

---

### API Fields - Quản lý Sân Bóng

**Lý thuyết:**
API quản lý thông tin sân bóng với các thao tác:
- **Xem danh sách/chi tiết sân**: Ai cũng có thể xem, không cần đăng nhập. Hỗ trợ lọc theo loại sân, trạng thái và phân trang.
- **Thêm/Sửa/Xóa sân**: Chỉ admin mới có quyền. Hệ thống kiểm tra quyền admin trước khi cho phép thao tác.

**Lấy danh sách sân:**
```javascript
// GET /api/fields?status=active&type=5-a-side
// Response (200):
{
    "success": true,
    "count": 10,
    "data": [
        { "_id": "64field001", "name": "Sân A1", "type": "5-a-side", "price": 500000, "status": "active", "amenities": ["Đèn", "Wifi"] },
        { "_id": "64field002", "name": "Sân B1", "type": "7-a-side", "price": 800000, "status": "active" }
    ]
}
```

**Lấy chi tiết sân:**
```javascript
// GET /api/fields/64field001
// Response (200):
{
    "success": true,
    "data": { "_id": "64field001", "name": "Sân A1", "type": "5-a-side", "price": 500000, "images": ["/uploads/field.jpg"], "openTime": "06:00", "closeTime": "23:00" }
}
```

**Tạo sân mới (Admin):**
```javascript
// POST /api/fields
// Headers: Authorization: Bearer <admin_token>
// Request:
{ "name": "Sân C1", "type": "5-a-side", "price": 600000, "description": "Sân mới", "amenities": ["Đèn", "Wifi"] }
// Response (201):
{ "success": true, "message": "Tạo sân thành công", "data": { "_id": "64field003", "name": "Sân C1", "price": 600000 } }
```

---

### API Bookings - Đặt Sân

**Lý thuyết:**
API xử lý việc đặt sân của khách hàng:
- **Đặt sân**: Kiểm tra sân có tồn tại và đang hoạt động không, kiểm tra khung giờ đã có người đặt chưa (tránh trùng lịch), tính tổng tiền = giá sân × số giờ đặt.
- **Xem lịch sử**: Người dùng chỉ xem được các đơn đặt sân của chính mình.
- **Hủy đặt sân**: Chỉ được hủy đơn của mình và đơn chưa bị hủy trước đó.

**Đặt sân mới:**
```javascript
// POST /api/bookings
// Headers: Authorization: Bearer <token>
// Request:
{ "field": "64field001", "date": "2024-12-25", "startTime": "18:00", "endTime": "20:00", "note": "Đặt cho công ty" }
// Response (201):
{
    "success": true,
    "message": "Đặt sân thành công",
    "data": { "_id": "64booking001", "field": { "name": "Sân A1", "price": 500000 }, "date": "2024-12-25", "totalPrice": 1000000, "status": "pending" }
}
```

**Lịch sử đặt sân:**
```javascript
// GET /api/bookings/my-bookings
// Headers: Authorization: Bearer <token>
// Response (200):
{
    "success": true,
    "count": 5,
    "data": [
        { "_id": "64booking001", "field": { "name": "Sân A1" }, "date": "2024-12-25", "totalPrice": 1000000, "status": "confirmed", "paymentStatus": "paid" }
    ]
}
```

**Hủy đặt sân:**
```javascript
// PUT /api/bookings/64booking001/cancel
// Headers: Authorization: Bearer <token>
// Response (200):
{ "success": true, "message": "Hủy đặt sân thành công", "data": { "_id": "64booking001", "status": "cancelled" } }
```

---

### API Community - Cộng đồng

**Lý thuyết:**
API cho phép người dùng tương tác trong cộng đồng:
- **Xem bài viết**: Hỗ trợ phân trang (mỗi trang 10 bài), lọc theo danh mục (tìm đội, tìm người chơi...).
- **Đăng bài**: Cần đăng nhập. Hệ thống tự động gán tên người đăng từ tài khoản.
- **Thích bài viết**: Nhấn lần 1 là thích, nhấn lần 2 là bỏ thích (toggle).

**Lấy danh sách bài viết:**
```javascript
// GET /api/community/posts?page=1&limit=10&category=find-team
// Response (200):
{
    "success": true,
    "count": 50,
    "pagination": { "page": 1, "limit": 10, "totalPages": 5 },
    "data": [
        { "_id": "64post001", "title": "Tìm đội giao lưu", "content": "Đội mình cần đối thủ...", "author": { "name": "Nguyễn Văn A" }, "likes": 15, "comments": 8 }
    ]
}
```

**Tạo bài viết:**
```javascript
// POST /api/community/posts
// Headers: Authorization: Bearer <token>
// Request:
{ "title": "Tìm thủ môn", "content": "Đội bóng cần tìm 1 thủ môn...", "category": "find-player" }
// Response (201):
{ "success": true, "message": "Đăng bài thành công", "data": { "_id": "64post002", "title": "Tìm thủ môn", "author": "64user001" } }
```

**Like/Unlike bài viết:**
```javascript
// POST /api/community/posts/64post001/like
// Headers: Authorization: Bearer <token>
// Response (200):
{ "success": true, "message": "Đã thích bài viết", "likes": 16 }
```

---

### API Shop - Cửa hàng

**Lý thuyết:**
API quản lý cửa hàng bán phụ kiện bóng đá:
- **Xem sản phẩm**: Hỗ trợ lọc theo danh mục (giày, áo, bóng...), khoảng giá (từ - đến), sắp xếp theo đánh giá hoặc giá.
- **Đặt hàng**: Kiểm tra số lượng tồn kho có đủ không, tính tổng tiền = giá × số lượng, trừ tồn kho sau khi đặt thành công.

**Lấy danh sách sản phẩm:**
```javascript
// GET /api/products?category=shoes&minPrice=100000&maxPrice=500000
// Response (200):
{
    "success": true,
    "count": 20,
    "data": [
        { "_id": "64prod001", "name": "Giày Nike Mercurial", "price": 2500000, "salePrice": 2000000, "category": "shoes", "stock": 15, "rating": 4.5 }
    ]
}
```

**Tạo đơn hàng:**
```javascript
// POST /api/orders
// Headers: Authorization: Bearer <token>
// Request:
{
    "items": [{ "product": "64prod001", "quantity": 1 }, { "product": "64prod002", "quantity": 2 }],
    "shippingAddress": { "fullName": "Nguyễn Văn A", "phone": "0901234567", "address": "123 ABC, Q1, HCM" },
    "paymentMethod": "cod"
}
// Response (201):
{ "success": true, "message": "Đặt hàng thành công", "data": { "_id": "64order001", "orderNumber": "ORD-20241225-001", "totalAmount": 2500000, "status": "pending" } }
```

---

### Frontend - Gọi API với Fetch

**Lý thuyết:**
Phía giao diện (Frontend) gọi API bằng hàm fetch() của JavaScript:
- **Hàm fetchAPI**: Hàm dùng chung để gọi tất cả API, tự động thêm token xác thực vào header, định dạng dữ liệu JSON.
- **localStorage**: Lưu token và thông tin user vào trình duyệt để giữ trạng thái đăng nhập khi tải lại trang.
- **async/await**: Cú pháp chờ kết quả từ server trước khi xử lý tiếp, giúp code dễ đọc hơn.

**Helper function:**
```javascript
// Hàm gọi API chung
async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api${endpoint}`, {
        ...options,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}` 
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}
```

**Ví dụ sử dụng:**
```javascript
// Đăng nhập
async function handleLogin(email, password) {
    const data = await fetchAPI('/auth/login', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }) 
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
}

// Lấy danh sách sân
const fields = await fetchAPI('/fields');

// Đặt sân
const booking = await fetchAPI('/bookings', { 
    method: 'POST', 
    body: JSON.stringify({ field: 'fieldId', date: '2024-12-25', startTime: '18:00', endTime: '20:00' }) 
});
```

---

## 📦 Cài đặt công cụ

### Yêu cầu hệ thống
- **Node.js** >= 18.0.0
- **MongoDB** >= 6.0 (local hoặc MongoDB Atlas)
- **npm** >= 9.0.0

### Cài đặt Node.js
```bash
# Windows - Tải từ https://nodejs.org/
# macOS
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Cài đặt MongoDB
```bash
# Windows - Tải từ https://www.mongodb.com/try/download/community
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu
sudo apt-get install -y mongodb
```

### Cài đặt Tailwind CSS (đã tích hợp qua CDN)
Dự án sử dụng Tailwind CSS qua CDN, không cần cài đặt thêm.

---

## 🔧 Biến môi trường

Tạo file `.env` trong thư mục `backend/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sanbongda
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

---

## 📱 Tính năng chính

### Người dùng
- ✅ Đăng ký / Đăng nhập
- ✅ Xem danh sách sân bóng
- ✅ Đặt sân trực tuyến
- ✅ Thanh toán đa phương thức (MoMo, ZaloPay, VNPay, Chuyển khoản, Tiền mặt)
- ✅ Quản lý hồ sơ cá nhân
- ✅ Đổi mật khẩu
- ✅ Mua sắm phụ kiện
- ✅ Cộng đồng & Bài viết
- ✅ Thông báo realtime

### Quản trị viên
- ✅ Quản lý sân bóng
- ✅ Quản lý đặt sân
- ✅ Quản lý khách hàng
- ✅ Quản lý nhân viên
- ✅ Quản lý cộng đồng
- ✅ Thống kê doanh thu

---

## 📊 Sơ đồ Use Case

### Sơ đồ Use Case - Người dùng (User)

```
                         ┌────────────────────────────────┐
                         │   HỆ THỐNG QUẢN LÝ SÂN BÓNG   │
                         │                                │
                         │  (Đăng ký)    (Đăng nhập)      │
                         │                                │
    ┌──────┐             │  (Xem sân)    (Đặt sân)        │
    │ USER │─────────────│                                │
    └──────┘             │  (Thanh toán) (Lịch sử đặt)    │
                         │                                │
                         │  (Mua phụ kiện) (Cộng đồng)    │
                         │                                │
                         │  (Profile)    (Thông báo)      │
                         └────────────────────────────────┘
```

### Mô tả Use Case - Người dùng

**Xác thực:** Người dùng đăng ký tài khoản mới hoặc đăng nhập bằng email/mật khẩu. Hệ thống mã hóa mật khẩu bằng bcrypt và cấp token JWT để xác thực các request tiếp theo.

**Quản lý sân bóng:** Người dùng xem danh sách sân với thông tin loại sân (5, 7, 11 người), giá thuê, tiện ích. Có thể lọc và tìm kiếm sân theo nhu cầu.

**Đặt sân & Thanh toán:** Chọn sân, ngày, khung giờ để đặt lịch. Hệ thống kiểm tra khung giờ trống, tính tiền và hỗ trợ thanh toán qua MoMo, ZaloPay, VNPay, chuyển khoản hoặc tiền mặt.

**Lịch sử & Hủy đặt:** Xem các đơn đặt sân đã thực hiện với trạng thái đơn và thanh toán. Có thể hủy đơn chưa diễn ra.

**Mua sắm:** Duyệt và mua phụ kiện bóng đá (giày, áo, bóng) từ cửa hàng trực tuyến, quản lý giỏ hàng.

**Cộng đồng:** Đăng bài tìm đội, tìm người chơi, tương tác bằng like và bình luận.

**Cá nhân:** Cập nhật thông tin profile, nhận thông báo về đơn đặt sân và khuyến mãi.

---

### Sơ đồ Use Case - Quản trị viên (Admin)

```
                         ┌────────────────────────────────┐
                         │      HỆ THỐNG QUẢN TRỊ         │
                         │                                │
                         │  (Đăng nhập)  (Quản lý sân)    │
                         │                                │
    ┌───────┐            │  (Quản lý đặt sân)             │
    │ ADMIN │────────────│                                │
    └───────┘            │  (Khách hàng) (Nhân viên)      │
                         │                                │
                         │  (Kho hàng)   (Cộng đồng)      │
                         │                                │
                         │  (Khuyến mãi) (Thống kê)       │
                         └────────────────────────────────┘
```

### Mô tả Use Case - Quản trị viên

**Xác thực:** Admin đăng nhập với tài khoản có quyền quản trị để truy cập trang admin.

**Quản lý sân bóng:** Xem danh sách sân, thêm sân mới, cập nhật thông tin (tên, giá, tiện ích, hình ảnh) và xóa sân không hoạt động.

**Quản lý đặt sân:** Xem tất cả đơn đặt sân, duyệt/xác nhận đơn mới hoặc từ chối đơn không hợp lệ. Hệ thống tự động thông báo cho khách hàng.

**Quản lý khách hàng:** Xem danh sách tài khoản khách hàng với lịch sử đặt sân, có thể khóa tài khoản vi phạm.

**Quản lý nhân viên:** Thêm, sửa, xóa thông tin nhân viên làm việc tại sân bóng.

**Quản lý kho hàng:** Theo dõi tồn kho phụ kiện, cập nhật số lượng khi nhập/xuất hàng.

**Quản lý cộng đồng:** Giám sát bài viết, kiểm duyệt nội dung và xóa bài vi phạm.

**Quản lý khuyến mãi:** Tạo, sửa, xóa chương trình khuyến mãi với mã giảm giá và thời hạn.

**Thống kê & Báo cáo:** Xem biểu đồ doanh thu theo ngày/tháng/năm, xuất báo cáo ra file Excel/PDF.

---

## 👨‍💻 Tác giả

**Thành Trung M10**

---

## 📄 License

MIT License - Sử dụng tự do cho mục đích học tập và phát triển.
