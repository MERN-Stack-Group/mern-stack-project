const Review = require('../models/review');
const Mentorship = require('../models/mentorship');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (Students only)
const createReview = async (req, res) => {
    try {
        const { mentorshipId, rating, content } = req.body;
        const reviewerId = req.user._id;

        if (!mentorshipId || !rating || !content) {
            return res.status(400).json({ message: 'Please provide mentorship ID, rating, and content' });
        }

        const mentorship = await Mentorship.findById(mentorshipId);
        if (!mentorship) {
            return res.status(404).json({ message: 'Mentorship program not found' });
        }

        if (!mentorship.students.includes(reviewerId)) {
            return res.status(403).json({ message: 'You can only review programs you are enrolled in' });
        }

        if (mentorship.stage !== 'completed') {
            return res.status(400).json({ message: 'You can only review completed mentorships' });
        }

        const review = await Review.create({
            mentorship: mentorshipId,
            reviewer: reviewerId,
            mentor: mentorship.alumni,
            rating,
            content
        });

        res.status(201).json(review);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this mentorship' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reviews for a specific mentor
// @route   GET /api/reviews/mentor/:mentorId
// @access  Public (Anyone should be able to see a mentor's reviews)
const getMentorReviews = async (req, res) => {
    try {
        const mentorId = req.params.mentorId;

        const reviews = await Review.find({ mentor: mentorId })
            .sort({ createdAt: -1 })
            .populate('reviewer', 'name profileImage') // Get student details
            .populate('mentorship', 'durationInWeeks'); // Get context about the program

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a review (rating and content)
// @route   PUT /api/reviews/:id
// @access  Private (Only the review author)
const updateReview = async (req, res) => {
    try {
        const { rating, content } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // SECURITY: Ensure the logged-in user is the one who wrote the review
        if (review.reviewer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this review' });
        }

        // Update fields if provided in the request
        if (rating) review.rating = rating;
        if (content) review.content = content;

        const updatedReview = await review.save();

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Only the review author)
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // SECURITY: Ensure the logged-in user is the one who wrote the review
        if (review.reviewer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        // Delete the document from the database
        await review.deleteOne();

        res.json({ message: 'Review deleted successfully', id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    createReview, 
    getMentorReviews,
    updateReview,
    deleteReview
};