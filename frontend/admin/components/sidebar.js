// Admin Sidebar Component với phân quyền
function renderAdminSidebar(activePage) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';
  const isStaff = user.role === 'staff';
  
  // Định nghĩa menu items với quyền truy cập
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', href: 'index.html', roles: ['admin', 'staff'] },
    { id: 'fields', icon: '⚽', label: 'Quản lý sân', href: 'fields.html', roles: ['admin'] },
    { id: 'bookings', icon: '📅', label: 'Lịch đặt sân', href: 'bookings.html', roles: ['admin', 'staff'] },
    { id: 'customers', icon: '👥', label: 'Khách hàng', href: 'customers.html', roles: ['admin', 'staff'] },
    { id: 'community', icon: '🏆', label: 'Cộng đồng', href: 'community.html', roles: ['admin'] },
  ];
  
  const managementItems = [
    { id: 'revenue', icon: '💰', label: 'Tài chính', href: 'revenue.html', roles: ['admin'] },
    { id: 'inventory', icon: '📦', label: 'Kho hàng', href: 'inventory.html', roles: ['admin', 'staff'] },
    { id: 'promotions', icon: '🎁', label: 'Khuyến mãi', href: 'promotions.html', roles: ['admin'] },
    { id: 'staff', icon: '👔', label: 'Nhân viên', href: 'staff.html', roles: ['admin'] },
    { id: 'reports', icon: '📈', label: 'Báo cáo', href: 'reports.html', roles: ['admin'] },
  ];
  
  // Lọc menu theo quyền
  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));
  const filteredManagement = managementItems.filter(item => item.roles.includes(user.role));
  
  const renderMenuItem = (item) => `
    <a href="${item.href}" class="sidebar-link ${activePage === item.id ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activePage === item.id ? '' : 'text-slate-300'}">
      <span>${item.icon}</span> ${item.label}
    </a>
  `;

  const sidebar = `
    <aside class="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white flex flex-col flex-shrink-0">
      <div class="p-5 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-xl">⚽</div>
          <div>
            <h1 class="font-bold text-lg">Thành Trung M10</h1>
            <p class="text-xs text-slate-400">${isAdmin ? 'Admin Panel' : 'Staff Panel'}</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        ${filteredMenu.map(renderMenuItem).join('')}
        ${filteredManagement.length > 0 ? `
          <div class="pt-2 mt-2 border-t border-white/10">
            <p class="px-4 py-2 text-xs text-slate-500 uppercase">Quản lý</p>
          </div>
          ${filteredManagement.map(renderMenuItem).join('')}
        ` : ''}
      </nav>
      <div class="p-3 border-t border-white/10">
        <div class="px-4 py-2 mb-2 bg-white/5 rounded-xl">
          <p class="text-xs text-slate-400">Đăng nhập với</p>
          <p class="text-sm font-semibold">${user.name || 'User'}</p>
          <span class="text-xs px-2 py-0.5 rounded-full ${isAdmin ? 'bg-purple-500/30 text-purple-300' : 'bg-green-500/30 text-green-300'}">
            ${isAdmin ? '👑 Admin' : '👤 Staff'}
          </span>
        </div>
        <a href="../index.html" class="sidebar-link flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-slate-400">
          <span>🏠</span> Về trang chủ
        </a>
        <button onclick="logout()" class="w-full sidebar-link flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/20">
          <span>🚪</span> Đăng xuất
        </button>
      </div>
    </aside>
  `;
  
  const sidebarContainer = document.getElementById('admin-sidebar');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = sidebar;
  }
}

// Admin Header Component
function renderAdminHeader(title, subtitle) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';
  
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
              <p class="font-semibold text-slate-800">${user.name || 'User'}</p>
              <p class="text-xs ${isAdmin ? 'text-purple-600' : 'text-green-600'}">${isAdmin ? 'Quản trị viên' : 'Nhân viên'}</p>
            </div>
            <div class="w-10 h-10 bg-gradient-to-br ${isAdmin ? 'from-purple-400 to-indigo-600' : 'from-green-400 to-emerald-600'} rounded-xl flex items-center justify-center text-white font-bold">
              ${(user.name || 'U')[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
  
  const headerContainer = document.getElementById('admin-header');
  if (headerContainer) {
    headerContainer.innerHTML = header;
  }
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

// Check Admin/Staff Auth - cho phép cả admin và staff
function checkAdminAuth(requiredRole = null) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    alert('Vui lòng đăng nhập!');
    window.location.href = 'login.html';
    return false;
  }
  
  // Nếu yêu cầu role cụ thể (admin only)
  if (requiredRole === 'admin' && user.role !== 'admin') {
    alert('Bạn không có quyền truy cập trang này!');
    window.location.href = 'index.html';
    return false;
  }
  
  // Cho phép admin và staff
  if (user.role !== 'admin' && user.role !== 'staff') {
    alert('Bạn không có quyền truy cập!');
    window.location.href = 'login.html';
    return false;
  }
  
  return true;
}

// Check if user is admin
function isAdmin() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin';
}

// Check if user is staff
function isStaff() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'staff';
}

function logout() {
  localStorage.clear();
  window.location.href = '../index.html';
}
