import React, { useState } from "react";
import "./Daftar.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";

const Daftar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    AuthService.register(name, email, password).then(
      () => {
        navigate("/masuk");
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

  return (
    <div className="daftar-container">
      {/* Kiri - Background dan Teks Selamat Datang */}
      <div className="daftar-left">
        <img
          src="images/bg1.jpg"
          alt="Cafe Background"
          className="daftar-bg"
        />
        <div className="daftar-overlay">
        <img
    src="images/p.png"
    alt="Plafon Logo"
    className="daftar-logo"
  />
          <h1 className="daftar-salam">Hai, Sobat Nongki!</h1>
          <h2 className="daftar-subjudul">Selamat datang di plafon.idn</h2>
          <p className="daftar-deskripsi">
            Tempatnya semua rekomendasi cafe yang paling vibes, paling cozy,
            dan paling cocok buat segala mood kamu.
          </p>
        </div>
      </div>

      {/* Kanan - Formulir Daftar */}
      <div className="daftar-right">
        <div className="daftar-form-card">
          <h2 className="daftar-title">Daftar</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="nama">Nama</label>
            <input type="text" id="nama" placeholder="Masukkan Nama" value={name} onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)}required />

            <button type="submit" className="daftar-button" disabled={loading}>{loading ? "loading...": "Simpan" }</button>
            
            <p className="daftar-masuk" onClick={() => navigate('/masuk')}>Sudah Punya Akun? <span>Masuk</span></p>
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
}

export default Daftar;
