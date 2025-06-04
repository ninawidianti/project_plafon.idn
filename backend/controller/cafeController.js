const cafeModel = require("../model/cafeModel");

const getAllCafes = (req, res) => {
  cafeModel.getAllCafes((err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data cafe" });
    res.json(results);
  });
};

const getCafeById = (req, res) => {
  const id = req.params.id;
  cafeModel.getCafeById(id, (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data cafe" });
    if (results.length === 0) return res.status(404).json({ message: "Cafe tidak ditemukan" });
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
    return res.status(400).json({ message: "File foto_cafe dan foto_menu wajib diunggah!" });
  }

  // Debugging: Periksa apakah 'foto_cafe' dan 'foto_menu' ada dalam req.files
  if (!req.files["foto_cafe"] || !req.files["foto_menu"]) {
    return res.status(400).json({ message: "foto_cafe dan foto_menu wajib diunggah!" });
  }

  const foto_cafe_files = req.files["foto_cafe"].map((file) => file.filename);
  const foto_menu = req.files["foto_menu"][0].filename;

  console.log("foto_cafe_files:", foto_cafe_files);
  console.log("foto_menu:", foto_menu);

  const newCafe = {
    ...data,
    foto_cafe: JSON.stringify(foto_cafe_files),
    foto_menu,
  };

  cafeModel.createCafe(newCafe, (err) => {
    if (err) return res.status(500).json({ message: "Gagal menambahkan cafe", error: err });
    res.status(201).json({ message: "Cafe berhasil ditambahkan" });
  });
};

const updateCafe = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  console.log("Update ID:", id);
  console.log("Received data:", data);
  console.log("Received files:", req.files);

  // Ambil data lama dulu
  cafeModel.getCafeById(id, (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data lama", error: err });
    if (results.length === 0) return res.status(404).json({ message: "Cafe tidak ditemukan" });

    const oldData = results[0];

    let foto_cafe_files = [];
    let foto_menu = oldData.foto_menu;

    // Ambil foto baru jika ada, jika tidak pakai yang lama
    if (req.files && req.files["foto_cafe"]) {
      foto_cafe_files = req.files["foto_cafe"].map((file) => file.filename);
    } else if (data.foto_cafe) {
      try {
        foto_cafe_files = JSON.parse(data.foto_cafe);
      } catch (e) {
        return res.status(400).json({ message: "Format foto_cafe tidak valid" });
      }
    } else {
      try {
        foto_cafe_files = JSON.parse(oldData.foto_cafe);
      } catch {
        foto_cafe_files = [];
      }
    }

    if (req.files && req.files["foto_menu"]) {
      foto_menu = req.files["foto_menu"][0].filename;
    }

    const updatedData = {
      name: data.name || oldData.name,
      alamat: data.alamat || oldData.alamat,
      deskripsi: data.deskripsi || oldData.deskripsi,
      J_Operasional: data.J_Operasional || oldData.J_Operasional,
      rating: data.rating || oldData.rating,
      foto_menu,
      foto_cafe: JSON.stringify(foto_cafe_files),
      maps: data.maps || oldData.maps,
      instagram: data.instagram || oldData.instagram,
      whatsapp: data.whatsapp || oldData.whatsapp,
      fasilitas: data.fasilitas || oldData.fasilitas,
      kategori: data.kategori || oldData.kategori,
      harga: data.harga || oldData.harga,
      kategori_plafon_idn: data.kategori_plafon_idn || oldData.kategori_plafon_idn,
      detail_menu: data.detail_menu || oldData.detail_menu,
    };

    console.log("Final updatedData:", updatedData);

    cafeModel.updateCafe(id, updatedData, (err) => {
      if (err) return res.status(500).json({ message: "Gagal memperbarui café", error: err });
      res.json({ message: "Café berhasil diperbarui" });
    });
  });
};




const deleteCafe = (req, res) => {
  const id = req.params.id;
  cafeModel.deleteCafe(id, (err) => {
    if (err) return res.status(500).json({ message: "Gagal menghapus cafe", error: err });
    res.json({ message: "Cafe berhasil dihapus" });
  });
};

module.exports = {
  getAllCafes,
  getCafeById,
  createCafe,
  updateCafe,
  deleteCafe,
};
