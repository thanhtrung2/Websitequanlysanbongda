const API_URL = 'http://localhost:3000/api';
let allFields = [];

async function loadFields() {
  console.log('Starting loadFields...');
  try {
    const loading = document.getElementById('loading');
    const fieldsList = document.getElementById('fieldsList');
    const noResults = document.getElementById('noResults');

    console.log('Elements found:', { loading, fieldsList, noResults });

    if (loading) loading.classList.remove('hidden');
    if (fieldsList) fieldsList.classList.add('hidden');
    if (noResults) noResults.classList.add('hidden');

    console.log('Fetching from:', `${API_URL}/fields`);
    const response = await fetch(`${API_URL}/fields`);
    console.log('Response status:', response.status);
    
    allFields = await response.json();
    console.log('Fields loaded:', allFields.length, 'fields');
    
    if (loading) loading.classList.add('hidden');
    displayFields(allFields);
  } catch (error) {
    console.error('Lỗi tải danh sách sân:', error);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.innerHTML = '<p class="text-red-600">Lỗi tải dữ liệu: ' + error.message + '</p>';
    }
  }
}

function displayFields(fields) {
  console.log('Displaying fields:', fields.length);
  const fieldsList = document.getElementById('fieldsList');
  const noResults = document.getElementById('noResults');

  if (!fieldsList || !noResults) {
    console.error('Elements not found!');
    return;
  }

  if (fields.length === 0) {
    fieldsList.classList.add('hidden');
    noResults.classList.remove('hidden');
    return;
  }

  fieldsList.classList.remove('hidden');
  noResults.classList.add('hidden');

  const typeMap = {
    '5vs5': 'Sân 5 người',
    '7vs7': 'Sân 7 người',
    '11vs11': 'Sân 11 người'
  };

  fieldsList.innerHTML = fields.map(field => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
      <div class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center relative">
        <span class="text-6xl">⚽</span>
        <div class="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-600">
          ${typeMap[field.type]}
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-xl font-bold mb-2 text-gray-800">${field.name}</h3>
        <div class="space-y-2 mb-4">
          <p class="text-gray-600 text-sm flex items-center gap-2">
            <span>📍</span> ${field.location.address}
          </p>
          <p class="text-green-600 font-bold text-lg">
            ${field.pricePerHour.toLocaleString()}đ/giờ
          </p>
          ${field.amenities && field.amenities.length > 0 ? `
            <div class="flex flex-wrap gap-1 mt-2">
              ${field.amenities.slice(0, 3).map(amenity => `
                <span class="text-xs bg-gray-100 px-2 py-1 rounded">${amenity}</span>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <button onclick="bookField('${field._id}')" 
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold">
          Đặt sân ngay
        </button>
      </div>
    </div>
  `).join('');
}

function bookField(fieldId) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Vui lòng đăng nhập để đặt sân');
    window.location.href = 'login.html';
    return;
  }
  alert('Chức năng đặt sân đang được phát triển!');
  // window.location.href = `booking.html?fieldId=${fieldId}`;
}

// Filter functions
document.addEventListener('DOMContentLoaded', () => {
  loadFields();

  document.getElementById('filterType')?.addEventListener('change', filterFields);
  document.getElementById('filterPrice')?.addEventListener('change', filterFields);
});

function filterFields() {
  const typeFilter = document.getElementById('filterType').value;
  const priceFilter = document.getElementById('filterPrice').value;

  let filtered = allFields;

  if (typeFilter) {
    filtered = filtered.filter(field => field.type === typeFilter);
  }

  if (priceFilter) {
    const [min, max] = priceFilter.split('-').map(Number);
    filtered = filtered.filter(field => {
      return field.pricePerHour >= min && field.pricePerHour <= max;
    });
  }

  displayFields(filtered);
}
