const db = require('../model/db');

const getDashboardStats = async (req, res) => {
  try {
    db.query(`
      SELECT 
        (SELECT COUNT(*) FROM cafe WHERE kategori = 'cafe') AS total_cafe,
        (SELECT COUNT(*) FROM cafe WHERE kategori = 'resto') AS total_resto,
        (SELECT COUNT(*) FROM cafe WHERE kategori_plafon_idn = 'rekomendasi') AS total_rekomendasi,
        (SELECT COUNT(*) FROM user) AS total_user
    `, (err, result1) => {
      if (err) throw err;

      db.query(`
        SELECT rating, COUNT(*) AS jumlah 
        FROM cafe 
        GROUP BY rating 
        ORDER BY rating DESC
      `, (err2, ratingResult) => {
        if (err2) throw err2;

        db.query(`
          SELECT cafe.name AS nama_cafe, COUNT(review.id) AS reviews 
          FROM review 
          JOIN cafe ON review.id_cafe = cafe.id 
          GROUP BY review.id_cafe 
          ORDER BY reviews DESC 
          LIMIT 5
        `, (err3, topCafeResult) => {
          if (err3) throw err3;

          res.json({
            total_cafe: result1[0].total_cafe,
            total_resto: result1[0].total_resto,
            total_rekomendasi: result1[0].total_rekomendasi,
            total_user: result1[0].total_user,
            ratingData: ratingResult,
            topReviewedCafes: topCafeResult,
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil statistik" });
  }
};

module.exports = { getDashboardStats };
