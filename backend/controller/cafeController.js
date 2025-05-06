const cafeModel = require('../model/cafeModel');

const getAllCafes = (req, res) => {
  cafeModel.getAllCafes((err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data cafe' });
    res.json(results);
  });
};

const getCafeById = (req, res) => {
  const id = req.params.id;
  cafeModel.getCafeById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data cafe' });
    if (results.length === 0) return res.status(404).json({ message: 'Cafe tidak ditemukan' });
    res.json(results[0]);
  });
};

const createCafe = (req, res) => {
  const data = req.body;

  // Debugging: Cek data yang diterima
  console.log("Received data:", data);
  console.log("Received files:", req.files);

  // Cek jika req.files ada
  if (!req.files) {
    return res.status(400).json({ message: 'File foto_cafe dan foto_menu wajib diunggah!' });
  }

  // Debugging: Periksa apakah 'foto_cafe' dan 'foto_menu' ada dalam req.files
  if (!req.files['foto_cafe'] || !req.files['foto_menu']) {
    return res.status(400).json({ message: 'foto_cafe dan foto_menu wajib diunggah!' });
  }

  const foto_cafe = req.files['foto_cafe'][0].filename;
  const foto_menu = req.files['foto_menu'][0].filename;

  console.log("foto_cafe:", foto_cafe);
  console.log("foto_menu:", foto_menu);

  const newCafe = {
    ...data,
    foto_cafe,
    foto_menu,
  };

  cafeModel.createCafe(newCafe, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan cafe', error: err });
    res.status(201).json({ message: 'Cafe berhasil ditambahkan' });
  });
};

const updateCafe = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  // Debugging: Cek data yang diterima
  console.log("Update ID:", id);
  console.log("Update data:", data);
  console.log("Received files:", req.files);

  // Cek jika ada file yang diupload
  let foto_cafe = data.foto_cafe;  // gunakan foto_cafe yang lama sebagai default
  let foto_menu = data.foto_menu;  // gunakan foto_menu yang lama sebagai default

  if (req.files) {
    // Jika ada file baru, update foto_cafe dan foto_menu
    if (req.files['foto_cafe']) {
      foto_cafe = req.files['foto_cafe'][0].filename;
    }
    if (req.files['foto_menu']) {
      foto_menu = req.files['foto_menu'][0].filename;
    }
  }

  const updatedData = {
    ...data,
    foto_cafe,
    foto_menu,
  };

  // Proses update
  cafeModel.updateCafe(id, updatedData, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal memperbarui cafe', error: err });
    res.json({ message: 'Cafe berhasil diperbarui' });
  });
};


const deleteCafe = (req, res) => {
  const id = req.params.id;
  cafeModel.deleteCafe(id, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus cafe', error: err });
    res.json({ message: 'Cafe berhasil dihapus' });
  });
};

module.exports = {
  getAllCafes,
  getCafeById,
  createCafe,
  updateCafe,
  deleteCafe
};
