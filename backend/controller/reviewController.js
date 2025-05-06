const reviewModel = require('../model/reviewModel');

const getAllReviews = (req, res) => {
  reviewModel.getAllReviews((err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil review' });
    res.json(results);
  });
};

const getReviewsByCafeId = (req, res) => {
  const cafeId = req.params.cafeId;
  reviewModel.getReviewsByCafeId(cafeId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil review cafe' });
    res.json(results);
  });
};

const createReview = (req, res) => {
  const data = req.body;
  reviewModel.createReview(data, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan review', error: err });
    res.status(201).json({ message: 'Review berhasil ditambahkan' });
  });
};

const deleteReview = (req, res) => {
  const id = req.params.id;
  reviewModel.deleteReview(id, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus review', error: err });
    res.json({ message: 'Review berhasil dihapus' });
  });
};

module.exports = {
  getAllReviews,
  getReviewsByCafeId,
  createReview,
  deleteReview
};
