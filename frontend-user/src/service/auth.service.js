// src/services/auth.service.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users/"; // Sesuaikan dengan URL backend kamu
axios.get("http://localhost:5000/api/cafes");
// Fungsi untuk registrasi
const register = (name, email, password, role) => {
  return axios.post(API_URL + "register", { name, email, password, role }).then((response) => response.data);
};

// Fungsi untuk login
const login = (email, password) => {
  return axios.post(API_URL + "login", { email, password }).then((response) => {
    const { token, user } = response.data;

    if (token && user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }

    return response.data;
  });
};

// Fungsi untuk logout
const logout = () => {
  // Menghapus token dan data user dari localStorage saat logout
  localStorage.removeItem("user");
};

// Fungsi untuk mendapatkan user yang sedang login
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")); // Mengambil user dari localStorage
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
