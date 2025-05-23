const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require('../model/userModel'); 

const register = (req, res) => {
  const { name, email, password, role } = req.body;

  userModel.findUserByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    userModel.createUser({ name, email, password: hashedPassword, role }, (err) => {
      if (err) return res.status(500).json({ message: "Gagal register", error: err });
      res.status(201).json({ message: "Berhasil register" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });

  userModel.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    const user = results[0];
    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign({ id: user.id, role: user.role, id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};
const updateUser = (req, res) => {
  const id = req.params.id;
  let { name, email, role, password } = req.body;

  // Hash password jika dikirim
  if (password && password.trim() !== "") {
    password = bcrypt.hashSync(password, 10);
  } else {
    password = null; // agar tidak ikut diupdate kalau kosong
  }

  // Kirim ke model update
  userModel.updateUser(id, { name, email, role, password }, (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal update user", error: err });

    res.json({ message: "Berhasil update user" });
  });
};

const getUsers = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data user" });
    res.json(results);
  });
};

module.exports = { register, login, updateUser, getUsers };
