/**
 * FILE JAVASCRIPT CHÍNH
 * Chứa các hàm dùng chung cho toàn bộ website
 */

// Địa chỉ API backend
var API_URL = 'http://localhost:3000/api';

/**
 * Kiểm tra người dùng đã đăng nhập chưa
 * @returns {boolean} - true nếu đã đăng nhập
 */
function checkAuth() {
  const token = localStorage.getItem('token');
  return !!token;
}

/**
 * Lấy token xác thực
 * @returns {string|null} - Token hoặc null
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Lấy thông tin người dùng đang đăng nhập
 * @returns {object|null} - Thông tin user hoặc null
 */
function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Đăng xuất - Xóa token và chuyển về trang chủ
 */
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Kiểm tra đường dẫn hiện tại để redirect đúng
  if (window.location.pathname.includes('/pages/')) {
    window.location.href = '../index.html';
  } else {
    window.location.href = 'index.html';
  }
}

/**
 * Cập nhật thanh điều hướng dựa trên trạng thái đăng nhập
 * - Nếu đã đăng nhập: Hiển thị avatar, tên, nút đăng xuất
 * - Nếu chưa đăng nhập: Hiển thị nút đăng nhập
 */
function updateNavigation() {
  const userMenu = document.getElementById('userMenu');
  if (!userMenu) return;

  if (checkAuth()) {
    const user = getUser();
    if (!user || !user.name) {
      // Nếu user không hợp lệ, xóa và hiển thị nút đăng nhập
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const loginPath = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
      userMenu.innerHTML = `
        <a href="${loginPath}" class="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-yellow-300 hover:text-green-800 transition font-semibold shadow-lg">
          Đăng nhập
        </a>
      `;
      return;
    }
    
    const profilePath = window.location.pathname.includes('/pages/') ? 'profile.html' : 'pages/profile.html';
    const notifPath = window.location.pathname.includes('/pages/') ? 'notifications.html' : 'pages/notifications.html';
    const adminPath = window.location.pathname.includes('/pages/') ? '../admin/index.html' : 'admin/index.html';
    const initial = user.name.charAt(0).toUpperCase();
    
    // Kiểm tra nếu là admin hoặc staff thì hiển thị nút quản lý
    const isAdminOrStaff = user.role === 'admin' || user.role === 'staff';
    const adminButton = isAdminOrStaff ? `
      <a href="${adminPath}" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition text-sm font-medium text-white flex items-center gap-1" title="${user.role === 'admin' ? 'Trang Admin' : 'Trang Nhân viên'}">
        ${user.role === 'admin' ? '👑' : '📋'} Quản lý
      </a>
    ` : '';
    
    userMenu.innerHTML = `
      <div class="flex items-center gap-3">
        <!-- Chuông thông báo -->
        <div class="relative" id="notificationBell">
          <button onclick="toggleNotificationDropdown()" class="relative p-2 hover:bg-green-700 rounded-full transition" title="Thông báo">
            <span class="text-xl">🔔</span>
            <span id="notificationBadge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          <!-- Dropdown thông báo -->
          <div id="notificationDropdown" class="hidden absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
            <div class="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
              <span class="font-bold">🔔 Thông báo</span>
              <button onclick="markAllNotificationsRead()" class="text-xs hover:underline">Đánh dấu đã đọc</button>
            </div>
            <div id="notificationList" class="max-h-80 overflow-y-auto">
              <p class="p-4 text-gray-500 text-center">Không có thông báo</p>
            </div>
            <a href="${notifPath}" class="block text-center py-3 bg-gray-50 text-green-600 font-semibold hover:bg-gray-100 transition">
              Xem tất cả
            </a>
          </div>
        </div>
        
        ${adminButton}
        
        <!-- Avatar và tên người dùng -->
        <a href="${profilePath}" class="flex items-center gap-2 hover:bg-green-700 px-3 py-2 rounded-lg transition" title="Xem profile">
          <div class="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
            ${initial}
          </div>
          <span class="text-sm font-semibold hidden sm:inline">${user.name}</span>
        </a>
        
        <!-- Nút đăng xuất -->
        <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition text-sm font-medium">
          Đăng xuất
        </button>
      </div>
    `;
    
    // Load thông báo
    loadNotifications();
  } else {
    // Chưa đăng nhập - hiển thị nút đăng nhập và đăng ký
    const loginPath = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
    const registerPath = window.location.pathname.includes('/pages/') ? 'register.html' : 'pages/register.html';
    userMenu.innerHTML = `
      <div class="flex items-center gap-2">
        <a href="${loginPath}" class="bg-white text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 transition font-semibold text-sm">
          Đăng nhập
        </a>
        <a href="${registerPath}" class="bg-yellow-400 text-green-800 px-5 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold text-sm hidden sm:inline-block">
          Đăng ký
        </a>
      </div>
    `;
  }
}

// ========== CÁC HÀM XỬ LÝ THÔNG BÁO ==========

let notificationDropdownOpen = false;

function toggleNotificationDropdown() {
  const dropdown = document.getElementById('notificationDropdown');
  if (!dropdown) return;
  notificationDropdownOpen = !notificationDropdownOpen;
  dropdown.classList.toggle('hidden', !notificationDropdownOpen);
  if (notificationDropdownOpen) loadNotifications();
}

// Đóng dropdown khi click ra ngoài
document.addEventListener('click', (e) => {
  const bell = document.getElementById('notificationBell');
  if (bell && !bell.contains(e.target)) {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
      notificationDropdownOpen = false;
    }
  }
});

async function loadNotifications() {
  if (!checkAuth()) return;
  try {
    const response = await fetch(`${API_URL}/notifications?limit=10`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!response.ok) return;
    const data = await response.json();
    
    const badge = document.getElementById('notificationBadge');
    if (badge) {
      if (data.unreadCount > 0) {
        badge.textContent = data.unreadCount > 9 ? '9+' : data.unreadCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
    
    const list = document.getElementById('notificationList');
    if (list) {
      if (!data.notifications || data.notifications.length === 0) {
        list.innerHTML = '<p class="p-4 text-gray-500 text-center">Không có thông báo</p>';
      } else {
        list.innerHTML = data.notifications.map(n => `
          <div class="p-3 border-b hover:bg-gray-50 cursor-pointer ${n.isRead ? '' : 'bg-blue-50'}" onclick="openNotification('${n._id}', '${n.link || ''}')">
            <p class="font-semibold text-sm text-gray-800">${n.title}</p>
            <p class="text-xs text-gray-600">${n.message}</p>
            <p class="text-xs text-gray-400 mt-1">${new Date(n.createdAt).toLocaleDateString('vi-VN')}</p>
          </div>
        `).join('');
      }
    }
  } catch (error) {
    console.error('Lỗi tải thông báo:', error);
  }
}

async function openNotification(id, link) {
  try {
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
  } catch (e) {}
  if (link) window.location.href = link;
  else loadNotifications();
}

async function markAllNotificationsRead() {
  try {
    await fetch(`${API_URL}/notifications/read-all`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    loadNotifications();
  } catch (e) {}
}

// ========== KHỞI TẠO KHI TRANG TẢI XONG ==========
document.addEventListener('DOMContentLoaded', updateNavigation);

// ========== MOBILE MENU ==========

/**
 * Bật/tắt menu mobile
 */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

/**
 * Cập nhật menu mobile với thông tin user
 */
function updateMobileUserMenu() {
  const mobileUserMenu = document.getElementById('mobileUserMenu');
  if (!mobileUserMenu) return;
  
  const isInPages = window.location.pathname.includes('/pages/');
  const profilePath = isInPages ? 'profile.html' : 'pages/profile.html';
  const loginPath = isInPages ? 'login.html' : 'pages/login.html';
  const registerPath = isInPages ? 'register.html' : 'pages/register.html';
  const adminPath = isInPages ? '../admin/index.html' : 'admin/index.html';
  
  if (checkAuth()) {
    const user = getUser();
    if (!user || !user.name) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      mobileUserMenu.innerHTML = `
        <a href="${loginPath}" class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center block">
          Đăng nhập
        </a>
      `;
      return;
    }
    
    // Kiểm tra nếu là admin hoặc staff thì hiển thị nút quản lý
    const isAdminOrStaff = user.role === 'admin' || user.role === 'staff';
    const adminButton = isAdminOrStaff ? `
      <a href="${adminPath}" class="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-center block">
        ${user.role === 'admin' ? '👑 Trang Admin' : '📋 Trang Nhân viên'}
      </a>
    ` : '';
    
    mobileUserMenu.innerHTML = `
      <a href="${profilePath}" class="text-gray-600 hover:text-green-600 transition flex items-center gap-2">
        👤 ${user.name}
      </a>
      ${adminButton}
      <button onclick="logout()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-left w-full">
        🚪 Đăng xuất
      </button>
    `;
  } else {
    mobileUserMenu.innerHTML = `
      <a href="${loginPath}" class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center block">
        Đăng nhập
      </a>
      <a href="${registerPath}" class="bg-yellow-400 text-green-800 px-4 py-2 rounded-lg font-semibold text-center block">
        Đăng ký
      </a>
    `;
  }
}

// Cập nhật mobile menu khi trang tải
document.addEventListener('DOMContentLoaded', updateMobileUserMenu);

// ========== FOOTER COMPONENT ==========

/**
 * Render footer cho tất cả các trang
 * Gọi hàm này trong các trang cần footer
 */
function renderFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;
  
  // Xác định đường dẫn dựa trên vị trí trang
  const isInPages = window.location.pathname.includes('/pages/');
  const basePath = isInPages ? '../' : '';
  const pagesPath = isInPages ? '' : 'pages/';
  
  footerContainer.innerHTML = `
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                  <span class="text-xl">⚽</span>
                </div>
                <h4 class="text-lg font-bold">Thành Trung M10</h4>
              </div>
              <p class="text-gray-400 text-sm mb-4">Hệ thống quản lý sân bóng hiện đại và chuyên nghiệp tại Trà Vinh</p>
              <div class="flex gap-3">
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">📘</a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition">📷</a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">▶️</a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition">💬</a>
              </div>
            </div>
            <div>
              <h5 class="font-bold mb-4 text-lg">Liên kết nhanh</h5>
              <ul class="space-y-3 text-gray-400">
                <li><a href="${basePath}san-bong.html" class="hover:text-white transition flex items-center gap-2"><span>→</span> Sân bóng</a></li>
                <li><a href="${basePath}${pagesPath}shop.html" class="hover:text-white transition flex items-center gap-2"><span>→</span> Cửa hàng</a></li>
                <li><a href="${basePath}${pagesPath}about.html" class="hover:text-white transition flex items-center gap-2"><span>→</span> Giới thiệu</a></li>
                <li><a href="${basePath}${pagesPath}contact.html" class="hover:text-white transition flex items-center gap-2"><span>→</span> Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-bold mb-4 text-lg">Liên hệ</h5>
              <ul class="space-y-3 text-gray-400">
                <li class="flex items-center gap-2">📍 Trà Vinh, Việt Nam</li>
                <li class="flex items-center gap-2">📞 0123 456 789</li>
                <li class="flex items-center gap-2">✉️ contact@thanhtrungm10.vn</li>
                <li class="flex items-center gap-2">⏰ 6:00 - 22:00 hàng ngày</li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-400 text-sm">&copy; 2024 Thành Trung M10. All rights reserved.</p>
            <div class="flex gap-6 text-gray-400 text-sm">
              <a href="#" class="hover:text-white transition">Điều khoản</a>
              <a href="#" class="hover:text-white transition">Chính sách</a>
              <a href="#" class="hover:text-white transition">Hỗ trợ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Tự động render footer khi trang tải
document.addEventListener('DOMContentLoaded', renderFooter);
