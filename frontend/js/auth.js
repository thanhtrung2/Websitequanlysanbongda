// Sử dụng API_URL từ main.js nếu đã có
if (typeof API_URL === 'undefined') {
  var API_URL = 'http://localhost:3000/api';
}

// Show notification
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

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang đăng nhập...';

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        showNotification('Đăng nhập thành công! Đang chuyển hướng...', 'success');
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 1500);
      } else {
        showNotification(data.message || 'Đăng nhập thất bại', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Đăng nhập';
      }
    } catch (error) {
      showNotification('Lỗi kết nối server', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Đăng nhập';
    }
  });
}

// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang đăng ký...';

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await response.json();
      if (response.ok) {
        showNotification('Đăng ký thành công! Đang chuyển đến trang đăng nhập...', 'success');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        showNotification(data.message || 'Đăng ký thất bại', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Đăng ký';
      }
    } catch (error) {
      showNotification('Lỗi kết nối server', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Đăng ký';
    }
  });
}
