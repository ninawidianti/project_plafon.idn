const express = require("express");
const router = express.Router();
const cafeController = require("../controller/cafeController");
const { verifyToken } = require("../middleware/authMiddleware");
const { uploadCafe, handleFileUploadError } = require("../middleware/uploadMiddleware");

// Public Routes
router.get("/", cafeController.getAllCafes);
router.get("/:id", cafeController.getCafeById);
router.put("/:id", verifyToken, uploadCafe, handleFileUploadError, cafeController.updateCafe);


// Protected Routes (perlu login)

router.delete("/:id", verifyToken, cafeController.deleteCafe);

// Route untuk membuat cafe baru dengan upload file
router.post("/", uploadCafe, handleFileUploadError, cafeController.createCafe);

module.exports = router;
