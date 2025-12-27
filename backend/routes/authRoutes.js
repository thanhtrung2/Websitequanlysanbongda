const express = require('express');
const { register, login, googleLogin, changePassword, forgotPassword, verifyReset, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.put('/change-password', protect, changePassword);

// Quên mật khẩu
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset', verifyReset);
router.post('/reset-password', resetPassword);

module.exports = router;
