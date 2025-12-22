// Main JavaScript file
const API_URL = 'http://localhost:3000/api';

// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem('token');
  return !!token;
}

// Get auth token
function getToken() {
  return localStorage.getItem('token');
}

// Get user info
function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/index.html';
}

// Update navigation based on auth status
function updateNavigation() {
  const userMenu = document.getElementById('userMenu');
  if (!userMenu) return;

  if (checkAuth()) {
    const user = getUser();
    const profilePath = window.location.pathname.includes('/pages/') ? 'profile.html' : 'pages/profile.html';
    const initial = user.name.charAt(0).toUpperCase();
    userMenu.innerHTML = `
      <div class="flex items-center gap-3">
        <!-- Notification Bell -->
        <div class="relative" id="notificationBell">
          <button onclick="toggleNotificationDropdown()" class="relative p-2 hover:bg-green-700 rounded-full transition" title="Thông báo">
            <span class="text-xl">🔔</span>
            <span id="notificationBadge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          <!-- Dropdown -->
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
        
        <a href="${profilePath}" class="flex items-center gap-2 hover:bg-green-700 px-3 py-2 rounded transition" title="Xem profile">
          <div class="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">
            ${initial}
          </div>
          <span class="text-sm font-semibold">${user.name}</span>
        </a>
        <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-sm">
          Đăng xuất
        </button>
      </div>
    `;
    
    // Load notifications
    loadNotifications();
  } else {
    const loginPath = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
    userMenu.innerHTML = `
      <a href="${loginPath}" class="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-yellow-300 hover:text-green-800 transition font-semibold shadow-lg">
        Đăng nhập
      </a>
    `;
  }
}

// Notification functions
let notificationDropdownOpen = false;

function toggleNotificationDropdown() {
  const dropdown = document.getElementById('notificationDropdown');
  notificationDropdownOpen = !notificationDropdownOpen;
  dropdown.classList.toggle('hidden', !notificationDropdownOpen);
  
  if (notificationDropdownOpen) {
    loadNotifications();
  }
}

// Close dropdown when clicking outside
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
    
    // Update badge
    const badge = document.getElementById('notificationBadge');
    if (badge) {
      if (data.unreadCount > 0) {
        badge.textContent = data.unreadCount > 9 ? '9+' : data.unreadCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
    
    // Update list
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
    console.error('Error loading notifications:', error);
  }
}

function getNotificationIcon(type) {
  const icons = {
    comment: '💬',
    like: '❤️',
    interest: '🙋',
    booking: '📅',
    system: '📢'
  };
  return icons[type] || '🔔';
}

function getNotificationIconBg(type) {
  const colors = {
    comment: 'bg-blue-100',
    like: 'bg-red-100',
    interest: 'bg-green-100',
    booking: 'bg-purple-100',
    system: 'bg-yellow-100'
  };
  return colors[type] || 'bg-gray-100';
}

function formatTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return 'Vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
  return date.toLocaleDateString('vi-VN');
}

async function openNotification(id, link) {
  // Mark as read
  try {
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
  } catch (e) {}
  
  // Navigate if has link
  if (link) {
    window.location.href = link;
  } else {
    loadNotifications();
  }
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateNavigation);
