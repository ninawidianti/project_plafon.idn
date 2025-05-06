const wishlistModel = require('../model/wishlistModel');

const getAllWishlist = (req, res) => {
  wishlistModel.getAllWishlist((err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil wishlist' });
    res.json(results);
  });
};

const getWishlistByUserId = (req, res) => {
  const userId = req.params.userId;
  wishlistModel.getWishlistByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil wishlist user' });
    res.json(results);
  });
};

const createWishlist = (req, res) => {
  const data = req.body;
  wishlistModel.createWishlist(data, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan wishlist', error: err });
    res.status(201).json({ message: 'Wishlist berhasil ditambahkan' });
  });
};

const deleteWishlist = (req, res) => {
  const id = req.params.id;
  wishlistModel.deleteWishlist(id, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus wishlist', error: err });
    res.json({ message: 'Wishlist berhasil dihapus' });
  });
};

module.exports = {
  getAllWishlist,
  getWishlistByUserId,
  createWishlist,
  deleteWishlist
};
