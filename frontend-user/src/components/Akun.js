import React, { useState, useEffect } from "react";
import Editdata from "./Editdata";
import "./Akun.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSignOutAlt, FaClock, FaMapMarkerAlt, FaInstagram, FaBuilding } from "react-icons/fa";
import axios from "axios";

const Akun = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "",
    email: "",
    password: "",
    id: null,
  };
  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [favoriteCafes, setFavoriteCafes] = useState([]);
  const [loadingFavorite, setLoadingFavorite] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false); // loading simpan edit
  const [errorSave, setErrorSave] = useState(null); // error simpan edit

  useEffect(() => {
    const fetchFavoriteCafes = async () => {
      if (!user.id) {
        setFavoriteCafes([]);
        setLoadingFavorite(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setFavoriteCafes([]);
        setLoadingFavorite(false);
        return;
      }

      try {
        const resWishlist = await axios.get(`http://localhost:5000/api/wishlists/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const wishlists = resWishlist.data;

        const cafesData = await Promise.all(
          wishlists.map(async (w) => {
            try {
              const resCafe = await axios.get(`http://localhost:5000/api/cafes/${w.id_cafe}`);
              return resCafe.data;
            } catch {
              return null;
            }
          })
        );

        setFavoriteCafes(cafesData.filter(Boolean));
      } catch (err) {
        console.error("Gagal mengambil wishlist cafe:", err);
        setFavoriteCafes([]);
      }
      setLoadingFavorite(false);
    };

    fetchFavoriteCafes();
  }, [user]);

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/");
      window.location.reload();
    }
  };

  const handleSave = async (updatedData) => {
  setLoadingSave(true);
  setErrorSave(null);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Silakan login kembali.");
    setLoadingSave(false);
    return;
  }

  try {
    console.log("Mengirim update user dengan data:", updatedData);
    await axios.put(`http://localhost:5000/api/users/${user.id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Jika password disimpan, hapus dari local storage user karena kita tidak simpan password di localStorage
    const updatedUserLocal = { ...user, ...updatedData };
    delete updatedUserLocal.password;

    setUser(updatedUserLocal);
    localStorage.setItem("user", JSON.stringify(updatedUserLocal));
    setIsEditing(false);
    alert("Data berhasil disimpan!");
  } catch (err) {
    console.error("Gagal update user:", err);
    setErrorSave(err.response?.data?.message || "Gagal menyimpan data.");
  }
  setLoadingSave(false);
};

  const handleChange = (id, value) => {
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="akun-container">
      <header className="akun-header">
        <div className="logo">
          <img src="/images/p.png" alt="logo" style={{ width: "50px", height: "auto" }} />
        </div>
        <FaSignOutAlt
          className="logout-icon"
          title="Logout"
          onClick={handleLogout}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleLogout()}
        />
      </header>

      <main>
        <button className="back-btn" onClick={() => navigate("/")} aria-label="Kembali ke halaman utama">
          <FaArrowLeft />
        </button>

        <h2 className="section-title">Data Akun</h2>
        <div className="akun-card">
          <p>
            <strong>Nama:</strong> {user.name || "-"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "-"}
          </p>
          <button className="edit-btn" onClick={() => setIsEditing(true)} aria-label="Edit data akun">
            Edit
          </button>
        </div>

        {isEditing && (
          <Editdata
            user={user}
            onChange={handleChange}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
            loadingSave={loadingSave}
            errorSave={errorSave}
          />
        )}

        <h2 className="section-title">Cafe yang Disukai</h2>

        {loadingFavorite ? (
          <p>Loading favorit cafe...</p>
        ) : favoriteCafes.length === 0 ? (
          <p>Tidak ada cafe yang disukai.</p>
        ) : (
          <div className="cafe-grid">
            {favoriteCafes.map((cafe) => (
              <div
                key={cafe.id}
                className="cafe-card"
                onClick={() => navigate(`/deskripsi/${cafe.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={`http://localhost:5000/uploads/${cafe.foto_cafe}`} alt={cafe.name} className="cafe-img" />
                <div className="cafe-info">
                  <div className="cafe-name">{cafe.name}</div>
                  <div className="cafe-address">{cafe.alamat}</div>
                  <div className="cafe-meta">
                    <div className="stars" aria-label={`Rating ${cafe.rating} dari 5`}>
                      {"★".repeat(cafe.rating)}
                      {"☆".repeat(5 - cafe.rating)}
                    </div>
                    <div className="time">
                      <FaClock /> {cafe.J_Operasional}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lokasi Section dan Footer */}
        <section
          className="lokasi-section"
          style={{
            marginBottom: 0,
            paddingBottom: 0,
            color: "white",
            padding: "0 20px",
          }}
        >
          <div className="lokasi-left" style={{ marginTop: "30px" }}>
            <img src="/images/p.png" alt="Plafon.idn Logo" className="lokasi-logo" />

            <div className="lokasi-item">
              <FaMapMarkerAlt className="lokasi-icon" />
              <p>
                Jl. Dr. Sutomo No. 48 A.3 RT. 01 RW. 01 Kel. Kubu Marapalam
                <br />
                Kec. Padang Timur KOTA PADANG, Indonesia
              </p>
            </div>

            <div className="lokasi-item">
              <FaInstagram className="lokasi-icon" />
              <p>plafon.idn</p>
            </div>

            <div className="lokasi-item">
              <FaBuilding className="lokasi-icon" />
              <p>PT. Metro Indonesian Software</p>
            </div>
          </div>

          <div className="lokasi-right" style={{ flex: 1, minWidth: "300px", marginTop: "30px" }}>
            <h3>Lokasi PT. Metro</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.289517698413!2d100.38056817496524!3d-0.9497887353648136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b8c2c8f826f7%3A0x30f9b1a4f9e13a2!2sPT%20Metro%20Indonesian%20Software!5e0!3m2!1sid!2sid!4v1714908742225!5m2!1sid!2sid"
              width="75%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <footer className="footer-bawah" style={{ marginTop: 0, paddingTop: 0 }}>
          <hr />
          <p>@ 2025 Plafon.idn All rights reserved</p>
        </footer>
      </main>
    </div>
  );
};

export default Akun;