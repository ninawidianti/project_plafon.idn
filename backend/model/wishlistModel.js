const db = require('./db');

// Ambil semua wishlist
const getAllWishlist = callback => {
  db.query('SELECT * FROM wishlist', callback);
};

// Ambil wishlist berdasarkan id_user
const getWishlistByUserId = (userId, callback) => {
  db.query('SELECT * FROM wishlist WHERE id_user = ?', [userId], callback);
};

// Tambah ke wishlist
const createWishlist = (wishlist, callback) => {
  const sql = 'INSERT INTO wishlist (id_user, id_cafe) VALUES (?, ?)';
  db.query(sql, [wishlist.id_user, wishlist.id_cafe], callback);
};

// Hapus dari wishlist
const deleteWishlist = (id, callback) => {
  db.query('DELETE FROM wishlist WHERE id = ?', [id], callback);
};

module.exports = {
  getAllWishlist,
  getWishlistByUserId,
  createWishlist,
  deleteWishlist
};
