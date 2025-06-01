import React, { useState } from 'react';
import './Deskripsi.css'; // Pastikan CSS sudah diimport

const ReviewSection = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="review-container">
      <div className="review-header">
        <div>
          <h2>Ulasan Pengunjung</h2>
          <p>Lihat apa kata mereka yang sudah berkunjung ke sini</p>
        </div>
        <button className="review-btn" onClick={toggleForm}>
          {showForm ? 'Batal' : '+ Review'}
        </button>
      </div>

      {/* Form Review */}
      {showForm && (
        <div className="review-form">
          <textarea
            placeholder="Tulis ulasan anda..."
            className="review-textarea"
          ></textarea>
          <button className="review-submit">Kirim Review</button>
        </div>
      )}

      {/* Daftar Review */}
      <div className="review-grid">
        {/* contoh dummy review */}
        <div className="review-card">
          <div className="review-user">
            <img
              className="user-img"
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="User"
            />
            <strong>Dinda</strong>
          </div>
          <p className="review-text">Tempatnya nyaman dan cocok buat nugas!</p>
        </div>
        {/* Tambahkan review lain jika perlu */}
      </div>
    </div>
  );
};

export default ReviewSection;