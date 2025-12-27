/**
 * HỆ THỐNG LỌC NỘI DUNG KHÔNG PHÙ HỢP
 * Bao gồm: từ ngữ tục tĩu, spam, quảng cáo, thông tin nhạy cảm
 */

// Danh sách từ cấm (có thể mở rộng thêm)
const bannedWords = [
  // Từ tục tĩu tiếng Việt (viết tắt để tránh hiển thị trực tiếp)
  'đ.m', 'đ.má', 'đ.mẹ', 'đ.cha', 'đ.bố', 'v.l', 'v.lồn', 'c.c', 'c.ặc', 'l.n', 'l.ồn',
  'đ.ĩ', 'đ.ụ', 'đ.éo', 'c.ứt', 'd.m', 'dm', 'vcl', 'vl', 'cc', 'cl', 'clgt',
  'ngu', 'đần', 'khốn', 'chó', 'súc vật', 'con mẹ', 'thằng chó', 'con chó',
  'mày', 'tao', 'bố mày', 'mẹ mày', 'cha mày',
  // Mẫu spam
  'kiếm tiền online', 'làm giàu nhanh', 'thu nhập khủng', 'việc nhẹ lương cao',
  'đầu tư forex', 'đầu tư crypto', 'cá độ', 'cá cược', 'casino', 'slot game',
  // Nội dung người lớn
  'sex', 'xxx', 'porn', 'nude', 'khỏa thân', 'gái gọi', 'cave',
  // Lừa đảo
  'trúng thưởng', 'nhận quà', 'click link', 'chuyển khoản ngay'
];

// Các mẫu regex để phát hiện spam
const spamPatterns = [
  /\b(https?:\/\/[^\s]+){3,}/gi, // Nhiều link liên tiếp
  /(.)\1{5,}/g, // Ký tự lặp lại nhiều lần (aaaaaaa)
  /[A-Z]{10,}/g, // Viết hoa quá nhiều
  /\d{10,}/g, // Dãy số dài (có thể là số điện thoại spam)
  /zalo|telegram|viber/gi, // Yêu cầu liên hệ qua app khác
];

/**
 * Kiểm tra nội dung có chứa từ cấm không
 * @param {string} text - Nội dung cần kiểm tra
 * @returns {object} - { hasBanned: boolean, words: array }
 */
function containsBannedWords(text) {
  if (!text) return { hasBanned: false, words: [] };
  
  // Chuyển về chữ thường và bỏ dấu để so sánh
  const lowerText = text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  const foundWords = [];
  
  for (const word of bannedWords) {
    const normalizedWord = word.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    
    if (lowerText.includes(normalizedWord)) {
      foundWords.push(word);
    }
  }
  
  return {
    hasBanned: foundWords.length > 0,
    words: foundWords
  };
}

/**
 * Kiểm tra các mẫu spam
 * @param {string} text - Nội dung cần kiểm tra
 * @returns {object} - { isSpam: boolean, reasons: array }
 */
function checkSpamPatterns(text) {
  if (!text) return { isSpam: false, reasons: [] };
  
  const reasons = [];
  
  for (const pattern of spamPatterns) {
    if (pattern.test(text)) {
      reasons.push('Phát hiện mẫu spam');
      break;
    }
  }
  
  // Kiểm tra tỷ lệ emoji quá cao
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu;
  const emojis = text.match(emojiRegex) || [];
  if (emojis.length > text.length * 0.3) {
    reasons.push('Quá nhiều emoji');
  }
  
  // Kiểm tra nội dung quá ngắn nhưng có link
  if (text.length < 50 && /https?:\/\//.test(text)) {
    reasons.push('Nội dung ngắn kèm link đáng ngờ');
  }
  
  return {
    isSpam: reasons.length > 0,
    reasons
  };
}

/**
 * Tính điểm rủi ro của nội dung (0-100)
 * Điểm càng cao = nội dung càng có vấn đề
 * @param {string} title - Tiêu đề bài đăng
 * @param {string} content - Nội dung bài đăng
 * @returns {number} - Điểm rủi ro từ 0-100
 */
function calculateRiskScore(title, content) {
  let score = 0;
  const fullText = `${title} ${content}`;
  
  // Kiểm tra từ cấm (+40 điểm cơ bản, +10 mỗi từ)
  const bannedCheck = containsBannedWords(fullText);
  if (bannedCheck.hasBanned) {
    score += 40 + (bannedCheck.words.length * 10);
  }
  
  // Kiểm tra spam (+30 điểm)
  const spamCheck = checkSpamPatterns(fullText);
  if (spamCheck.isSpam) {
    score += 30;
  }
  
  // Kiểm tra viết hoa quá nhiều (+15 điểm)
  const upperCount = (fullText.match(/[A-Z]/g) || []).length;
  const letterCount = (fullText.match(/[a-zA-Z]/g) || []).length;
  if (letterCount > 0 && upperCount / letterCount > 0.5) {
    score += 15;
  }
  
  // Kiểm tra có nhiều số điện thoại không (+10 điểm)
  const phonePattern = /0\d{9,10}/g;
  const phones = fullText.match(phonePattern) || [];
  if (phones.length > 2) {
    score += 10;
  }
  
  return Math.min(score, 100);
}

/**
 * HÀM CHÍNH - Kiểm duyệt nội dung tự động
 * @param {string} title - Tiêu đề
 * @param {string} content - Nội dung
 * @returns {object} - Kết quả kiểm duyệt
 *   - status: 'approved' | 'pending' | 'rejected'
 *   - reason: Lý do (nếu có)
 *   - riskScore: Điểm rủi ro
 *   - details: Chi tiết phát hiện
 */
function moderateContent(title, content) {
  const bannedCheck = containsBannedWords(`${title} ${content}`);
  const spamCheck = checkSpamPatterns(`${title} ${content}`);
  const riskScore = calculateRiskScore(title, content);
  
  let status = 'approved'; // Mặc định: duyệt
  let reason = null;
  
  // Điểm >= 70: Từ chối ngay
  if (riskScore >= 70) {
    status = 'rejected';
    reason = 'Nội dung vi phạm nghiêm trọng quy định cộng đồng';
  } 
  // Điểm 40-69: Chờ admin duyệt
  else if (riskScore >= 40) {
    status = 'pending';
    reason = 'Nội dung cần được kiểm duyệt';
  }
  
  return {
    status,
    reason,
    riskScore,
    details: {
      bannedWords: bannedCheck.words,
      spamReasons: spamCheck.reasons,
      hasBannedWords: bannedCheck.hasBanned,
      isSpam: spamCheck.isSpam
    }
  };
}

/**
 * Làm sạch nội dung - thay từ cấm bằng ***
 * @param {string} text - Nội dung gốc
 * @returns {string} - Nội dung đã làm sạch
 */
function sanitizeContent(text) {
  if (!text) return text;
  
  let sanitized = text;
  
  for (const word of bannedWords) {
    const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    sanitized = sanitized.replace(regex, '*'.repeat(word.length));
  }
  
  return sanitized;
}

module.exports = {
  containsBannedWords,    // Kiểm tra từ cấm
  checkSpamPatterns,      // Kiểm tra spam
  calculateRiskScore,     // Tính điểm rủi ro
  moderateContent,        // Kiểm duyệt nội dung (hàm chính)
  sanitizeContent,        // Làm sạch nội dung
  bannedWords             // Danh sách từ cấm
};
