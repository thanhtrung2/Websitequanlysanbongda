/**
 * FILE JAVASCRIPT CHÍNH
 * Chứa các hàm dùng chung cho toàn bộ website
 */

// Địa chỉ API backend
const API_URL = 'http://localhost:3000/api';

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
 * - Nếu đã đăng nhập: Hiển thị avatar, tên, chuông thông báo, nút đăng xuất
 * - Nếu chưa đăng nhập: Hiển thị nút đăng nhập
 */
function updateNavigation() {
  const userMenu = document.getElementById('userMenu');
  if (!userMenu) return;

  if (checkAuth()) {
    const user = getUser();
    const profilePath = window.location.pathname.includes('/pages/') ? 'profile.html' : 'pages/profile.html';
    const initial = user.name.charAt(0).toUpperCase(); // Lấy chữ cái đầu của tên
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
              <p class="p-4 text-gray-500 text-center">Đang tải...</p>
            </div>
            <a href="${window.location.pathname.includes('/pages/') ? 'notifications.html' : 'pages/notifications.html'}" class="block text-center py-3 bg-gray-50 text-green-600 font-semibold hover:bg-gray-100 transition">
              Xem tất cả
            </a>
          </div>
        </div>
        
        <!-- Avatar và tên người dùng -->
        <a href="${profilePath}" class="flex items-center gap-2 hover:bg-green-700 px-3 py-2 rounded transition" title="Xem profile">
          <div class="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">
            ${initial}
          </div>
          <span class="text-sm font-semibold">${user.name}</span>
        </a>
        
        <!-- Nút đăng xuất -->
        <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-sm">
          Đăng xuất
        </button>
      </div>
    `;
    
    // Tải danh sách thông báo
    loadNotifications();
  } else {
    // Chưa đăng nhập - hiển thị nút đăng nhập
    const loginPath = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
    userMenu.innerHTML = `
      <a href="${loginPath}" class="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-yellow-300 hover:text-green-800 transition font-semibold shadow-lg">
        Đăng nhập
      </a>
    `;
  }
}

// ========== CÁC HÀM XỬ LÝ THÔNG BÁO ==========

let notificationDropdownOpen = false; // Trạng thái dropdown thông báo

/**
 * Bật/tắt dropdown thông báo
 */
function toggleNotificationDropdown() {
  const dropdown = document.getElementById('notificationDropdown');
  notificationDropdownOpen = !notificationDropdownOpen;
  dropdown.classList.toggle('hidden', !notificationDropdownOpen);
  
  if (notificationDropdownOpen) {
    loadNotifications(); // Tải lại thông báo khi mở
  }
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

/**
 * Tải danh sách thông báo từ server
 */
async function loadNotifications() {
  if (!checkAuth()) return;
  
  try {
    const response = await fetch(`${API_URL}/notifications?limit=10`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    
    if (!response.ok) return;
    
    const data = await response.json();
    
    // Cập nhật badge số thông báo chưa đọc
    const badge = document.getElementById('notificationBadge');
    if (badge) {
      if (data.unreadCount > 0) {
        badge.textContent = data.unreadCount > 9 ? '9+' : data.unreadCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
    
    // Cập nhật danh sách thông báo
    const list = document.getElementById('notificationList');
    if (list) {
      if (data.notifications.length === 0) {
        list.innerHTML = '<p class="p-4 text-gray-500 text-center">Không có thông báo</p>';
      } else {
        list.innerHTML = data.notifications.map(n => `
          <div class="p-3 border-b hover:bg-gray-50 cursor-pointer ${n.isRead ? '' : 'bg-blue-50'}" onclick="openNotification('${n._id}', '${n.link || ''}')">
            <div class="flex gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl ${getNotificationIconBg(n.type)}">
                ${getNotificationIcon(n.type)}
              </div>
              <div class="flex-1">
                <p class="font-semibold text-sm text-gray-800">${n.title}</p>
                <p class="text-xs text-gray-600 line-clamp-2">${n.message}</p>
                <p class="text-xs text-gray-400 mt-1">${formatTimeAgo(n.createdAt)}</p>
              </div>
              ${!n.isRead ? '<div class="w-2 h-2 bg-blue-500 rounded-full"></div>' : ''}
            </div>
          </div>
        `).join('');
      }
    }
  } catch (error) {
    console.error('Lỗi tải thông báo:', error);
  }
}

/**
 * Lấy icon cho từng loại thông báo
 */
function getNotificationIcon(type) {
  const icons = {
    comment: '💬',   // Bình luận
    like: '❤️',      // Thích
    interest: '🙋',  // Quan tâm
    booking: '📅',   // Đặt sân
    system: '📢',    // Hệ thống
    warning: '⚠️'    // Cảnh báo
  };
  return icons[type] || '🔔';
}

/**
 * Lấy màu nền cho icon thông báo
 */
function getNotificationIconBg(type) {
  const colors = {
    comment: 'bg-blue-100',
    like: 'bg-red-100',
    interest: 'bg-green-100',
    booking: 'bg-purple-100',
    system: 'bg-yellow-100',
    warning: 'bg-orange-100'
  };
  return colors[type] || 'bg-gray-100';
}

/**
 * Chuyển đổi thời gian thành dạng "X phút trước", "X giờ trước"...
 */
function formatTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // Số giây chênh lệch
  
  if (diff < 60) return 'Vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
  return date.toLocaleDateString('vi-VN');
}

/**
 * Mở thông báo - đánh dấu đã đọc và chuyển đến link
 */
async function openNotification(id, link) {
  // Đánh dấu đã đọc
  try {
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
  } catch (e) {}
  
  // Chuyển đến link nếu có
  if (link) {
    window.location.href = link;
  } else {
    loadNotifications(); // Tải lại danh sách
  }
}

/**
 * Đánh dấu tất cả thông báo đã đọc
 */
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
  const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  const notifPath = isInPages ? 'notifications.html' : 'pages/notifications.html';
  const profilePath = isInPages ? 'profile.html' : 'pages/profile.html';
  const loginPath = isInPages ? 'login.html' : 'pages/login.html';
  
  // Style khác nhau cho trang index (nền trắng) và các trang khác (nền xanh)
  const textClass = (isIndexPage && !isInPages) ? 'text-gray-600 hover:text-green-600' : 'text-white/80 hover:text-white';
  const btnClass = (isIndexPage && !isInPages) ? 'bg-green-600 text-white' : 'bg-white text-green-600';
  
  if (checkAuth()) {
    const user = getUser();
    mobileUserMenu.innerHTML = `
      <a href="${notifPath}" class="${textClass} transition flex items-center gap-2">
        🔔 Thông báo
        <span id="mobileNotifBadge" class="hidden bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"></span>
      </a>
      <a href="${profilePath}" class="${textClass} transition">👤 ${user.name}</a>
      <button onclick="logout()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-left w-full">
        🚪 Đăng xuất
      </button>
    `;
  } else {
    mobileUserMenu.innerHTML = `
      <a href="${loginPath}" class="${btnClass} px-4 py-2 rounded-lg font-semibold text-center block">
        Đăng nhập
      </a>
    `;
  }
}

// Cập nhật mobile menu khi trang tải
document.addEventListener('DOMContentLoaded', updateMobileUserMenu);
