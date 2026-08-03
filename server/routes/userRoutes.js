const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getMyProfile, 
    getUserProfileById 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Your own profile (Uses req.user from token)
router.get('/profile', protect, getMyProfile);

// Someone else's profile (Uses req.params from URL)
router.get('/profile/:userId', protect, getUserProfileById);

module.exports = router;