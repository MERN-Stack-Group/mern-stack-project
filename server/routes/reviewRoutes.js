const express = require('express');
const router = express.Router();
const { 
    createReview, 
    getMentorReviews, 
    updateReview, 
    deleteReview 
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Static Routes
router.post('/', protect, createReview);
router.get('/mentor/:mentorId', getMentorReviews);

// Dynamic Routes 
router.route('/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;