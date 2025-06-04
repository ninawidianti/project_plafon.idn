const db = require("./db");

// Ambil semua data cafe
const getAllCafes = (callback) => {
  db.query("SELECT * FROM cafe", callback);
};

// Ambil cafe berdasarkan id
const getCafeById = (id, callback) => {
  db.query("SELECT * FROM cafe WHERE id = ?", [id], callback);
};

// Tambah cafe baru
const createCafe = (cafe, callback) => {
  const sql = `
  INSERT INTO cafe 
  (name, alamat, deskripsi, J_Operasional, rating, foto_menu, foto_cafe, maps, instagram, whatsapp, fasilitas, kategori, harga, kategori_plafon_idn, detail_menu)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  const values = [
    cafe.name,
    cafe.alamat,
    cafe.deskripsi,
    cafe.J_Operasional,
    cafe.rating,
    cafe.foto_menu,
    cafe.foto_cafe,
    cafe.maps,
    cafe.instagram,
    cafe.whatsapp,
    cafe.fasilitas,
    cafe.kategori,
    cafe.harga,
    cafe.kategori_plafon_idn,
    cafe.detail_menu,
  ];

  db.query(sql, values, callback);
};

// Update cafe
const updateCafe = (id, cafe, callback) => {
  const sql = `
  UPDATE cafe SET name=?, alamat=?, deskripsi=?, J_Operasional=?, rating=?, 
  foto_menu=?, foto_cafe=?, maps=?, instagram=?, whatsapp=?, fasilitas=?, kategori=?, harga=?, kategori_plafon_idn=?, detail_menu=?
  WHERE id=?
  `;
  const values = [
    cafe.name,
    cafe.alamat,
    cafe.deskripsi,
    cafe.J_Operasional,
    cafe.rating,
    cafe.foto_menu,
    cafe.foto_cafe,  // JSON string
    cafe.maps,
    cafe.instagram,
    cafe.whatsapp,
    cafe.fasilitas,
    cafe.kategori,
    cafe.harga,
    cafe.kategori_plafon_idn,
    cafe.detail_menu,
    id,
  ];

  db.query(sql, values, callback);
};

// Hapus cafe
const deleteCafe = (id, callback) => {
  db.query("DELETE FROM cafe WHERE id = ?", [id], callback);
};

module.exports = {
  getAllCafes,
  getCafeById,
  createCafe,
  updateCafe,
  deleteCafe,
};
