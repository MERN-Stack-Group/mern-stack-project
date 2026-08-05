const express = require('express');
const router = express.Router();
const { 
    createReview, 
    getMentorReviews, 
    getMentorshipReviews,
    getMyReviewForMentorship,
    updateReview, 
    deleteReview 
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Static Routes
router.post('/', protect, createReview);
router.get('/mentor/:mentorId', getMentorReviews);
router.get('/mentorship/:mentorshipId', getMentorshipReviews);
router.get('/mentorship/:mentorshipId/my-review', protect, getMyReviewForMentorship);

// Dynamic Routes 
router.route('/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;