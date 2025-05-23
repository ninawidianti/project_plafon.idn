const db = require('./db');

// Ambil semua review
const getAllReviews = callback => {
  db.query('SELECT * FROM review', callback);
};

// Ambil review berdasarkan id cafe
const getReviewsByCafeId = (cafeId, callback) => {
  const sql = `
    SELECT review.*, user.name AS name
    FROM review 
    JOIN user ON review.id_user = user.id 
    WHERE review.id_cafe = ?`;
  db.query(sql, [cafeId], callback);
};


// Tambah review baru
const createReview = (review, callback) => {
  const sql = 'INSERT INTO review (id_cafe, id_user, komentar, rating) VALUES (?, ?, ?, ?)';
  db.query(sql, [review.id_cafe, review.id_user, review.komentar, review.rating], callback);
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
