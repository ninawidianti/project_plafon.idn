const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Pastikan folder uploads ada
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // folder tujuan penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + "-" + file.fieldname + ext);
  },
});

// Filter hanya untuk file gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diperbolehkan!"), false);
  }
};

// Konfigurasi upload untuk form input cafe
const uploadCafe = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 2MB per file
}).fields([
  { name: "foto_cafe", maxCount: 5 },
  { name: "foto_menu", maxCount: 5 },
  { name: "galeri_foto", maxCount: 10 },
]);

// Middleware penanganan error upload
const handleFileUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(500).json({ message: "Terjadi kesalahan saat mengunggah file", error: err.message });
  }
  next();
};

module.exports = {
  uploadCafe,
  handleFileUploadError,
};
