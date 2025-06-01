const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
router.get("/", verifyToken, userController.getUsers);
router.put("/:id", verifyToken, userController.updateUser);

module.exports = router;
