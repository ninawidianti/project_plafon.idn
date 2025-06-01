const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek apakah header ada dan dimulai dengan "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token tidak ditemukan atau format salah' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi token dengan secret dari environment
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET tidak ditemukan di environment");
      return res.status(500).json({ message: 'Kesalahan server: secret tidak dikonfigurasi' });
    }

    const decoded = jwt.verify(token, secret);

    // Simpan data user dari token ke request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid', error: err.message });
  }
};

module.exports = { verifyToken };
