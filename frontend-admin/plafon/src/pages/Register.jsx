import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data registrasi:", { name, email, password });
  
    try {
      const response = await fetch('http://localhost:5000/api/users/register', { // Sesuaikan dengan endpoint registrasi yang benar
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
    
      if (response.ok) {
        alert('Registrasi berhasil!');
        navigate('/login'); // Setelah registrasi berhasil, arahkan ke halaman login
      } else {
        alert(data.message || 'Registrasi gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat registrasi.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Plafon.idn</h1>
        </div>
        <div className="welcome-text">
          <h2>Hai, Sobat Nongki!</h2>
          <p>Selamat datang di Plafon.idn</p>
          <p>Tempatnya semua rekomendasi cafe yang paling vibes, paling cozy, dan paling cocok buat segala mood kamu.</p>
          <div className="image-overlay">
            <img src="/bg-image.jpg" alt="Cafe" />
            <div className="overlay-text">Plafon .idn</div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Daftar</h2>
          <div className="form-group">
            <label>Nama:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama"
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>
          <button type="submit" className="login-button">Daftar</button>
          <p className="register-link">
            Sudah punya akun? <a href="/login">Masuk</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
