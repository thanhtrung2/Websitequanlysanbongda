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
  } else {
    const loginPath = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
    userMenu.innerHTML = `
      <a href="${loginPath}" class="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-yellow-300 hover:text-green-800 transition font-semibold shadow-lg">
        Đăng nhập
      </a>
    `;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateNavigation);
