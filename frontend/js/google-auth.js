// Google OAuth Configuration
// ⚠️ QUAN TRỌNG: Thay YOUR_GOOGLE_CLIENT_ID bằng Client ID thật từ Google Cloud Console
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

const API_URL = 'http://localhost:3000/api';

// Khởi tạo Google Sign-In
function initGoogleSignIn() {
  if (typeof google === 'undefined') {
    console.log('Google API chưa load xong, thử lại sau 500ms...');
    setTimeout(initGoogleSignIn, 500);
    return;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleResponse,
    auto_select: false
  });

  // Render nút Google Sign-In
  const googleBtn = document.getElementById('googleBtn');
  if (googleBtn) {
    google.accounts.id.renderButton(googleBtn, {
      theme: 'outline',
      size: 'large',
      width: '100%',
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'center'
    });
  }
}

// Xử lý response từ Google
async function handleGoogleResponse(response) {
  try {
    // Decode JWT token từ Google
    const payload = decodeJwtPayload(response.credential);
    
    // Gửi thông tin đến backend
    const res = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture
      })
    });

    const data = await res.json();
    
    if (res.ok) {
      // Lưu token và user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      showNotification('Đăng nhập Google thành công!', 'success');
      
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1000);
    } else {
      showNotification(data.message || 'Đăng nhập Google thất bại', 'error');
    }
  } catch (error) {
    console.error('Google login error:', error);
    showNotification('Lỗi đăng nhập Google', 'error');
  }
}

// Decode JWT payload (không cần thư viện)
function decodeJwtPayload(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', initGoogleSignIn);
