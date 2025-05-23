const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public
router.get('/', reviewController.getAllReviews);
router.get('/cafe/:cafeId', reviewController.getReviewsByCafeId);

// Protected
router.post('/', verifyToken, reviewController.createReview);
router.delete('/:id', verifyToken, reviewController.deleteReview);


module.exports = router;
