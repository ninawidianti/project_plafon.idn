const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public
router.get('/', wishlistController.getAllWishlist);
router.get('/user/:userId', wishlistController.getWishlistByUserId);

// Protected
router.post('/', verifyToken, wishlistController.createWishlist);
router.delete('/:id', verifyToken, wishlistController.deleteWishlist);

module.exports = router;
