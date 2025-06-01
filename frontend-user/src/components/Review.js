import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan ini
import "./Review.css";

const Review = () => {
  const navigate = useNavigate(); // ✅ Hook untuk navigasi

  const handleSave = () => {
    // Proses penyimpanan rating/komentar bisa ditambahkan di sini
    navigate("/deskripsi"); // ✅ Arahkan ke halaman Deskripsi
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Ulasan Pengunjung</h2>

      <label className="review-label" htmlFor="rating">
        Rating
      </label>
      <input
        type="text"
        id="rating"
        placeholder="Masukkan Rating 1-5"
        className="review-input"
      />

      <label className="review-label" htmlFor="comment">
        Komentar
      </label>
      <textarea
        id="comment"
        placeholder="Masukkan Komentar"
        className="review-textarea"
      ></textarea>

      <div className="review-buttons">
        <button className="review-cancel">Batal</button>
        <button className="review-submit" onClick={handleSave}>
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Review;