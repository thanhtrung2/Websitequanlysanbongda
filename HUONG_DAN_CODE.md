# Hướng Dẫn Code - Quản Lý Sân Bóng

## 1. Thêm Sân Mới

### Frontend (frontend/admin/fields.html)

Khi click nút "➕ Thêm sân mới", form sẽ hiện ra:

```javascript
// Mở modal thêm sân
function openAddModal() {
  document.getElementById('modalTitle').textContent = 'Thêm sân mới';
  document.getElementById('fieldForm').reset();  // Reset form
  document.getElementById('fieldId').value = '';  // Không có ID = thêm mới
  document.getElementById('fieldModal').classList.remove('hidden');
}
```

Khi submit form:

```javascript
document.getElementById('fieldForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('fieldId').value;
  
  // Thu thập dữ liệu từ form
  const data = {
    name: document.getElementById('fieldName').value,
    type: document.getElementById('fieldType').value,
    location: {
      address: document.getElementById('fieldAddress').value,
      city: 'Trà Vinh'
    },
    pricePerHour: parseInt(document.getElementById('fieldPrice').value),
    amenities: document.getElementById('fieldAmenities').value.split(',').map(a => a.trim()),
    status: document.getElementById('fieldStatus').value
  };

  // Gọi API
  const url = id ? `${API_URL}/fields/${id}` : `${API_URL}/fields`;  // Có ID = sửa, không có = thêm
  const method = id ? 'PUT' : 'POST';
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Cần token admin
    },
    body: JSON.stringify(data)
  });
});
```

### Backend (backend/controllers/fieldController.js)

```javascript
// API tạo sân mới
exports.createField = async (req, res) => {
  try {
    const field = await Field.create(req.body);  // Lưu vào MongoDB
    res.status(201).json(field);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Route (backend/routes/fieldRoutes.js)

```javascript
// POST /api/fields - Tạo sân mới (cần đăng nhập admin)
router.post('/', protect, authorize('admin'), createField);
```

---

## 2. Upload Ảnh Cho Sân

### Luồng hoạt động:

```
1. Admin click "📷 Ảnh" trên sân
2. Modal hiện ra với thông tin sân
3. Chọn file ảnh → Preview hiển thị
4. Click "Upload ảnh"
5. Frontend gửi FormData đến API
6. Backend lưu file vào thư mục uploads
7. Cập nhật đường dẫn ảnh vào database
```

### Frontend (frontend/admin/fields.html)

```javascript
// Mở modal quản lý ảnh
function openImageModal(id) {
  const field = allFields.find(f => f._id === id);
  
  // Hiển thị thông tin sân
  document.getElementById('imageFieldInfo').innerHTML = `
    <p class="font-bold">${field.name}</p>
    <p>${field.location?.address}</p>
  `;
  
  document.getElementById('imageFieldId').value = id;
  loadFieldImages(id);  // Load ảnh hiện có
  document.getElementById('imageModal').classList.remove('hidden');
}

// Upload ảnh
async function uploadImages() {
  const id = document.getElementById('imageFieldId').value;
  const input = document.getElementById('imageInput');
  
  // Tạo FormData để gửi file
  const formData = new FormData();
  for (let file of input.files) {
    formData.append('images', file);  // Key phải là 'images'
  }

  // Gọi API upload
  const response = await fetch(`${API_URL}/fields/${id}/images`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData  // Không set Content-Type, browser tự set
  });
}
```

### Backend - Middleware Upload (backend/middleware/upload.js)

```javascript
const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/uploads/fields'));
  },
  filename: function (req, file, cb) {
    // Tên file: field_timestamp_random.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'field_' + uniqueSuffix + ext);
  }
});

// Chỉ cho phép file ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép upload ảnh'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // Max 5MB
});

module.exports = upload;
```

### Backend - Controller (backend/controllers/fieldController.js)

```javascript
// Upload ảnh cho sân
exports.uploadFieldImages = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    
    // Tạo đường dẫn ảnh từ file đã upload
    const imagePaths = req.files.map(file => '/uploads/fields/' + file.filename);
    
    // Thêm vào mảng images của sân
    field.images = [...(field.images || []), ...imagePaths];
    await field.save();

    res.json({ 
      message: 'Upload thành công',
      images: field.images 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa một ảnh
exports.deleteFieldImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    const field = await Field.findById(id);
    
    // Xóa file vật lý
    const imgPath = path.join(__dirname, '../../frontend', field.images[imageIndex]);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    // Xóa khỏi database
    field.images.splice(imageIndex, 1);
    await field.save();

    res.json({ images: field.images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Backend - Route (backend/routes/fieldRoutes.js)

```javascript
const upload = require('../middleware/upload');

// POST /api/fields/:id/images - Upload ảnh (tối đa 5 ảnh)
router.post('/:id/images', protect, authorize('admin'), upload.array('images', 5), uploadFieldImages);

// DELETE /api/fields/:id/images/:imageIndex - Xóa ảnh
router.delete('/:id/images/:imageIndex', protect, authorize('admin'), deleteFieldImage);
```

---

## 3. Model Sân (backend/models/Field.js)

```javascript
const fieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['5vs5', '7vs7', '11vs11'], required: true },
  location: {
    address: String,
    city: String
  },
  pricePerHour: { type: Number, required: true },
  images: [String],  // Mảng chứa đường dẫn ảnh
  amenities: [String],
  status: { type: String, enum: ['active', 'maintenance', 'inactive'], default: 'active' }
});
```

---

## 4. Cấu Trúc Thư Mục Ảnh

```
frontend/
└── uploads/
    └── fields/
        ├── field_1234567890-123456789.jpg
        ├── field_1234567890-987654321.png
        └── ...
```

---

## 5. Hiển Thị Ảnh (frontend/san-bong.html)

```javascript
// Ưu tiên ảnh local (upload), nếu không có thì lấy ảnh đầu tiên
let displayImage = null;
if (f.images && f.images.length > 0) {
  displayImage = f.images.find(img => img.startsWith('/uploads')) || f.images[0];
}

// Hiển thị
${displayImage 
  ? `<img src="${displayImage}" alt="${f.name}">`
  : `<div>⚽</div>`  // Fallback nếu không có ảnh
}
```

---

## Tóm Tắt API

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | /api/fields | Lấy danh sách sân | Không |
| GET | /api/fields/:id | Lấy chi tiết sân | Không |
| POST | /api/fields | Tạo sân mới | Admin |
| PUT | /api/fields/:id | Cập nhật sân | Admin |
| DELETE | /api/fields/:id | Xóa sân | Admin |
| POST | /api/fields/:id/images | Upload ảnh | Admin |
| DELETE | /api/fields/:id/images/:index | Xóa ảnh | Admin |
