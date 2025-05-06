const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) return res.status(403).json({ message: 'Token tidak ditemukan' });

  const token = bearer.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

module.exports = { verifyToken };
