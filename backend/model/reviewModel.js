const db = require('./db');

// Ambil semua review
const getAllReviews = callback => {
  db.query('SELECT * FROM review', callback);
};

// Ambil review berdasarkan id cafe
const getReviewsByCafeId = (cafeId, callback) => {
  db.query('SELECT * FROM review WHERE cafe_id = ?', [cafeId], callback);
};

// Tambah review baru
const createReview = (review, callback) => {
  const sql = 'INSERT INTO review (cafe_id, user_id, komentar, rating) VALUES (?, ?, ?, ?)';
  db.query(sql, [review.cafe_id, review.user_id, review.komentar, review.rating], callback);
};

// Hapus review
const deleteReview = (id, callback) => {
  db.query('DELETE FROM review WHERE id = ?', [id], callback);
};

module.exports = {
  getAllReviews,
  getReviewsByCafeId,
  createReview,
  deleteReview
};
