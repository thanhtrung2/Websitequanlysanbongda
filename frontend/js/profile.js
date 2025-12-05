const API_URL = 'http://localhost:3000/api';

// Load user profile from database
async function loadProfile() {
  // Check if user is logged in
  if (!checkAuth()) {
    console.log('User not logged in, redirecting...');
    window.location.href = 'login.html';
    return;
  }

  console.log('Loading profile from API...');
  
  try {
    const token = getToken();
    console.log('Token:', token ? 'exists' : 'missing');
    
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.log('Unauthorized, clearing storage...');
        localStorage.clear();
        window.location.href = 'login.html';
        return;
      }
      throw new Error('Không thể tải thông tin người dùng');
    }

    const user = await response.json();
    console.log('User data loaded:', user);
    
    // Update localStorage with fresh data
    const currentUser = getUser();
    const updatedUser = { ...currentUser, ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update profile info
    if (document.getElementById('userName')) {
      document.getElementById('userName').textContent = user.name;
    }
    if (document.getElementById('profileName')) {
      document.getElementById('profileName').textContent = user.name;
    }
    if (document.getElementById('profileEmail')) {
      document.getElementById('profileEmail').textContent = user.email;
    }
    if (document.getElementById('profilePhone')) {
      document.getElementById('profilePhone').textContent = user.phone || 'Chưa cập nhật';
    }
    
    // Set user initial
    const initial = user.name.charAt(0).toUpperCase();
    if (document.getElementById('userInitial')) {
      document.getElementById('userInitial').textContent = initial;
    }
    
    // Set role
    const roleMap = {
      'customer': 'Khách hàng',
      'admin': 'Quản trị viên',
      'staff': 'Nhân viên'
    };
    const roleName = roleMap[user.role] || 'Khách hàng';
    if (document.getElementById('userRole')) {
      document.getElementById('userRole').textContent = roleName;
    }
    if (document.getElementById('profileRoleDetail')) {
      document.getElementById('profileRoleDetail').textContent = roleName;
    }
    
    // Set created date
    if (document.getElementById('profileCreatedAt')) {
      if (user.createdAt) {
        const date = new Date(user.createdAt);
        document.getElementById('profileCreatedAt').textContent = date.toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } else {
        document.getElementById('profileCreatedAt').textContent = 'Không rõ';
      }
    }

    console.log('Profile loaded successfully');
    
    // Load booking history
    loadBookingHistory();
  } catch (error) {
    console.error('Lỗi tải profile:', error);
    showNotification('Không thể tải thông tin người dùng. Vui lòng thử lại.', 'error');
  }
}

// Load booking history
async function loadBookingHistory() {
  try {
    const response = await fetch(`${API_URL}/bookings/my-bookings`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    if (response.ok) {
      const bookings = await response.json();
      const bookingHistory = document.getElementById('bookingHistory');
      
      if (bookings.length === 0) {
        bookingHistory.innerHTML = '<p class="text-gray-500 text-center py-4">Chưa có lịch đặt sân nào</p>';
      } else {
        bookingHistory.innerHTML = bookings.map(booking => {
          const statusMap = {
            'pending': { text: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' },
            'confirmed': { text: 'Đã xác nhận', color: 'bg-green-100 text-green-800' },
            'cancelled': { text: 'Đã hủy', color: 'bg-red-100 text-red-800' },
            'completed': { text: 'Hoàn thành', color: 'bg-blue-100 text-blue-800' }
          };
          const status = statusMap[booking.status] || statusMap['pending'];
          
          return `
            <div class="border rounded-lg p-4 hover:shadow-md transition">
              <div class="flex justify-between items-start">
                <div>
                  <h5 class="font-semibold">${booking.field?.name || 'Sân bóng'}</h5>
                  <p class="text-sm text-gray-600">
                    ${new Date(booking.date).toLocaleDateString('vi-VN')} | 
                    ${booking.startTime} - ${booking.endTime}
                  </p>
                  <p class="text-green-600 font-semibold mt-1">${booking.totalPrice.toLocaleString()}đ</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${status.color}">
                  ${status.text}
                </span>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  } catch (error) {
    console.error('Lỗi tải lịch sử đặt sân:', error);
  }
}

// Edit profile function
function editProfile() {
  const name = prompt('Nhập họ tên mới:', document.getElementById('profileName').textContent);
  if (!name) return;
  
  const phone = prompt('Nhập số điện thoại mới:', document.getElementById('profilePhone').textContent);
  if (!phone) return;

  updateProfile(name, phone);
}

// Update profile
async function updateProfile(name, phone) {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ name, phone })
    });

    if (response.ok) {
      const updatedUser = await response.json();
      
      // Update localStorage
      const currentUser = getUser();
      const newUser = { ...currentUser, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Show success notification
      showNotification('Cập nhật thông tin thành công!', 'success');
      
      // Reload profile
      loadProfile();
    } else {
      const data = await response.json();
      showNotification(data.message || 'Cập nhật thất bại', 'error');
    }
  } catch (error) {
    showNotification('Lỗi kết nối server', 'error');
  }
}

// Show notification (same as auth.js)
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-2xl">${type === 'success' ? '✓' : '✗'}</span>
      <span class="font-semibold">${message}</span>
    </div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Load profile on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, loading profile...');
  loadProfile();
});
