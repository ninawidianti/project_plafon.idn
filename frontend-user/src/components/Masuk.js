import React, { useState } from "react";
import "./Masuk.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";

const Masuk = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState(""); // hanya untuk register
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    AuthService.login(email, password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    AuthService.register(nama, email, password).then(
      (response) => {
        setMessage("Pendaftaran berhasil! Silakan login.");
        setLoading(false);
        setIsLogin(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="masuk-container">
      {/* Kiri - Background dan Teks Selamat Datang */}
      <div className="masuk-left">
        <img src="images/bg1.jpg" alt="Cafe Background" className="masuk-bg" />
        <div className="masuk-overlay">
          <img src="images/p.png" alt="Plafon Logo" className="daftar-logo" />
          <h1 className="masuk-salam">Hai, Sobat Nongki!</h1>
          <h2 className="masuk-subjudul">Selamat datang di plafon.idn</h2>
          <p className="masuk-deskripsi">
            Tempatnya semua rekomendasi cafe yang paling vibes, paling cozy,
            dan paling cocok buat segala mood kamu.
          </p>
        </div>
      </div>

      {/* Kanan - Form Login/Daftar */}
      <div className="masuk-right">
        <div className="masuk-form-card">
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            <h2 className="masuk-title">{isLogin ? "Masuk" : "Daftar"}</h2>

            {!isLogin && (
              <>
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  id="nama"
                  placeholder="Masukkan Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="masuk-button" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Masuk" : "Daftar"}
            </button>

            <p
              className="masuk-daftar"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
              <span>{isLogin ? "Daftar" : "Masuk"}</span>
            </p>

            {message && (
              <div className="alert alert-danger mt-3" role="alert">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Masuk;
