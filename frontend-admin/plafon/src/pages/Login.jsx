import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login berhasil!');
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
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
      <div
        className="login-left"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
        }}
      >
        <div className="brand">
          <img src="/images/logo.png" alt="Logo" className="logo" />
          
        </div>
        <div className="welcome-text" style={{ padding: '20px', borderRadius: '10px' }}>
          <h2>Hai, Sobat Nongki!</h2>
          <p>Selamat datang di Plafon.idn</p>
          <p>
            Tempatnya semua rekomendasi cafe yang paling vibes, paling cozy, dan paling cocok buat segala mood kamu.
          </p>
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

         
        </form>
      </div>
    </div>
  );
}

export default Login;
