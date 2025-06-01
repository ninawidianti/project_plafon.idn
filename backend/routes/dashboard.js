const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controller/dashboardController");

// Jika pakai authMiddleware, tambahkan di sini
// const authMiddleware = require("../middlewares/authMiddleware");
// router.get("/stats", authMiddleware, getDashboardStats);

router.get("/stats", getDashboardStats);

module.exports = router;
