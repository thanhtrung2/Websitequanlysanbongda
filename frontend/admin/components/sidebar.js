// Admin Sidebar Component
function renderAdminSidebar(activePage) {
  const sidebar = `
    <aside class="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white flex flex-col flex-shrink-0">
      <div class="p-5 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-xl">⚽</div>
          <div>
            <h1 class="font-bold text-lg">Thành Trung M10</h1>
            <p class="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <a href="index.html" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'dashboard' ? '' : 'text-slate-300'}">
          <span>📊</span> Dashboard
        </a>
        <a href="fields.html" class="sidebar-link ${activePage === 'fields' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'fields' ? '' : 'text-slate-300'}">
          <span>⚽</span> Quản lý sân
        </a>
        <a href="bookings.html" class="sidebar-link ${activePage === 'bookings' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'bookings' ? '' : 'text-slate-300'}">
          <span>📅</span> Lịch đặt sân
        </a>
        <a href="customers.html" class="sidebar-link ${activePage === 'customers' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'customers' ? '' : 'text-slate-300'}">
          <span>👥</span> Khách hàng
        </a>
        <a href="community.html" class="sidebar-link ${activePage === 'community' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'community' ? '' : 'text-slate-300'}">
          <span>🏆</span> Cộng đồng
        </a>
        <div class="pt-2 mt-2 border-t border-white/10">
          <p class="px-4 py-2 text-xs text-slate-500 uppercase">Quản lý</p>
        </div>
        <a href="revenue.html" class="sidebar-link ${activePage === 'revenue' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'revenue' ? '' : 'text-slate-300'}">
          <span>💰</span> Tài chính
        </a>
        <a href="inventory.html" class="sidebar-link ${activePage === 'inventory' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'inventory' ? '' : 'text-slate-300'}">
          <span>📦</span> Kho hàng
        </a>
        <a href="promotions.html" class="sidebar-link ${activePage === 'promotions' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'promotions' ? '' : 'text-slate-300'}">
          <span>🎁</span> Khuyến mãi
        </a>
        <a href="staff.html" class="sidebar-link ${activePage === 'staff' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'staff' ? '' : 'text-slate-300'}">
          <span>👔</span> Nhân viên
        </a>
        <a href="reports.html" class="sidebar-link ${activePage === 'reports' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === 'reports' ? '' : 'text-slate-300'}">
          <span>📈</span> Báo cáo
        </a>
      </nav>
      <div class="p-3 border-t border-white/10">
        <a href="../index.html" class="sidebar-link flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-slate-400">
          <span>🏠</span> Về trang chủ
        </a>
        <button onclick="logout()" class="w-full sidebar-link flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/20">
          <span>🚪</span> Đăng xuất
        </button>
      </div>
    </aside>
  `;
  document.getElementById('admin-sidebar').innerHTML = sidebar;
}

// Admin Header Component
function renderAdminHeader(title, subtitle) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const header = `
    <header class="glass sticky top-0 z-10 border-b border-slate-200">
      <div class="flex justify-between items-center px-6 py-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800">${title}</h2>
          <p class="text-sm text-slate-500">${subtitle || ''}</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div class="text-right">
              <p class="font-semibold text-slate-800">${user.name || 'Admin'}</p>
              <p class="text-xs text-slate-500">Quản trị viên</p>
            </div>
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
              ${(user.name || 'A')[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
  document.getElementById('admin-header').innerHTML = header;
}

// Admin Styles
const adminStyles = `
  <style>
    .sidebar-link { transition: all 0.2s; }
    .sidebar-link:hover { background: rgba(255,255,255,0.1); transform: translateX(4px); }
    .sidebar-link.active { background: rgba(255,255,255,0.15); border-left: 3px solid #fbbf24; }
    .glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); }
    .stat-card { transition: all 0.3s; }
    .stat-card:hover { transform: translateY(-4px); }
  </style>
`;
document.head.insertAdjacentHTML('beforeend', adminStyles);

// Check Admin Auth
function checkAdminAuth() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token || user.role !== 'admin') {
    alert('Vui lòng đăng nhập với quyền admin!');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function logout() {
  localStorage.clear();
  window.location.href = '../index.html';
}
