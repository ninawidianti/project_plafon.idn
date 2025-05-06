import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // nanti kita buat file ini

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login berhasil!');
        // Simpan token ke localStorage (kalau pakai JWT)
        localStorage.setItem('token', data.token); // Contoh menyimpan token
        
        // Arahkan ke halaman dashboard setelah login berhasil
        navigate('/dashboard'); // Ganti dengan rute dashboard yang sesuai
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat login.');
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
          <h2 className="form-title">Masuk</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Kirim</button>
          <p className="register-link">
            Belum Punya Akun? <Link to="/register">Daftar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
