import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Deskripsi.css";
import { FaWifi, FaMosque, FaParking, FaBullseye, FaStoreAlt, FaSnowflake, FaCamera, FaDice, FaMusic, FaRestroom, FaPlug, FaSmoking, FaMapMarkerAlt, FaInstagram, FaBuilding, FaWhatsapp, FaArrowLeft } from "react-icons/fa";

export default function Deskripsi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [café, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: "" });
  const [reviewList, setReviewList] = useState([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Fungsi aman untuk parsing foto_cafe: bisa JSON array string atau string filename
  const parseFotoCafeSafe = (fotoCafeRaw) => {
    if (!fotoCafeRaw) return [];
    try {
      const parsed = JSON.parse(fotoCafeRaw);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        return parsed;
      }
      if (typeof parsed === "string") {
        return [parsed];
      }
      return [fotoCafeRaw];
    } catch {
      return [fotoCafeRaw];
    }
  };

  const fotoCafeArray = parseFotoCafeSafe(café?.foto_cafe);

  const fasilitasIcons = {
    wifi: <FaWifi />,
    mushalla: <FaMosque />,
    parkir: <FaParking />,
    ac: <FaSnowflake />,
    foto: <FaCamera />,
    "live music": <FaMusic />,
    music: <FaMusic />,
    "stop kontak": <FaPlug />,
    stopkontak: <FaPlug />,
    "smoking area": <FaSmoking />,
    smoking: <FaSmoking />,
    toilet: <FaRestroom />,
    boardgames: <FaDice />,
    "board games": <FaDice />,
    indooroutdoor: <FaStoreAlt />,
    "indoor dan outdoor": <FaStoreAlt />,
    billiard: <FaBullseye />,
    billiard: <FaBullseye />,
  };

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cafes/${id}`);
        setCafe(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data café:", err);
        setLoading(false);
      }
    };

    fetchCafe();
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [id, showForm]);

  useEffect(() => {
    if (!café?.id) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setIsWishlisted(false);
      setWishlistLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/wishlists/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const wishlists = res.data;
        const exists = wishlists.some((w) => w.id_cafe === café.id);
        setIsWishlisted(exists);
        setWishlistLoading(false);
      })
      .catch((err) => {
        console.error("Gagal cek wishlist:", err);
        setWishlistLoading(false);
      });
  }, [café]);

  useEffect(() => {
    if (!fotoCafeArray || fotoCafeArray.length <= 1) return;

    const intervalId = setInterval(() => {
      setActivePhotoIndex((prevIndex) => (prevIndex + 1) % fotoCafeArray.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fotoCafeArray]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/cafe/${id}`);
      setReviewList(res.data);
    } catch (err) {
      console.error("Gagal mengambil review:", err);
    }
  };

  const handleAddReview = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    if (!newReview.text || !newReview.rating) {
      alert("Mohon isi semua kolom review.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          id_cafe: café.id,
          id_user: user.id,
          komentar: newReview.text,
          rating: parseInt(newReview.rating),
          name: newReview.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Review berhasil ditambahkan!");
        setNewReview({ name: "", text: "", rating: "" });
        setShowForm(false);
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Terjadi kesalahan saat mengirim review.");
    }
  };

  const toggleWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    try {
      if (!isWishlisted) {
        await axios.post("http://localhost:5000/api/wishlists", { id_user: user.id, id_cafe: café.id }, { headers: { Authorization: `Bearer ${token}` } });
        setIsWishlisted(true);
      } else {
        const res = await axios.get(`http://localhost:5000/api/wishlists/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const wishlistItem = res.data.find((w) => w.id_cafe === café.id);
        if (wishlistItem) {
          await axios.delete(`http://localhost:5000/api/wishlists/${wishlistItem.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsWishlisted(false);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui wishlist.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!café) return <h2>Café tidak ditemukan</h2>;

  return (
    <div className="container">
      {/* Header */}
      <div className="header-top">
        <img src="/images/p.png" alt="logo" style={{ width: "50px", height: "auto" }} />
      </div>
      {/* Slideshow foto café */}
      <div className="image-banner">
        {fotoCafeArray.map((foto, index) => (
          <div
            key={index}
            className={`banner-photo ${index === activePhotoIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(http://localhost:5000/uploads/${foto})`,
            }}
          />
        ))}
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft />
        </button>
      </div>

      {/* Info café */}
      <div className="info">
        <div className="title-row">
          <h1 className="title">{café.name}</h1>
          <button onClick={toggleWishlist} className={`like-button ${isWishlisted ? "liked" : "not-liked"}`} disabled={wishlistLoading} aria-pressed={isWishlisted} aria-label={isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}>
            <span>{isWishlisted ? "❤" : "🤍"}</span>
          </button>
        </div>

        <div className="stars">{"⭐".repeat(café.rating)}</div>
        <p className="address">{café.alamat}</p>

        <div className="info-row">
          <div className="time">🕐 {café.J_Operasional}</div>
          <div className="category">
            Kategori : <strong>{café.kategori}</strong>
          </div>
        </div>

        <section className="social-buttons">
          <a href={café.whatsapp} target="_blank" rel="noopener noreferrer">
            <button className="btn whatsapp">
              <FaWhatsapp size="24" />
            </button>
          </a>
          <a href={café.instagram} target="_blank" rel="noopener noreferrer">
            <button className="btn instagram">
              <FaInstagram size="24" />
            </button>
          </a>
          <a href={café.maps} target="_blank" rel="noopener noreferrer">
            <button className="btn maps">
              <FaMapMarkerAlt size="24" />
            </button>
          </a>
        </section>

        <div className="description">
          <h2 className="description-title">Deskripsi</h2>
          <p className="description-text">{café.deskripsi}</p>
        </div>

        <section className="menu-section">
          <div className="text">
            <h4>Menu</h4>
            <h2>Harga Start From {café.harga}</h2>
            <p>{café.detail_menu}</p>
          </div>
          <div className="image">
            <img src={`http://localhost:5000/uploads/${café.foto_menu}`} alt="Menu Café" />
          </div>
        </section>

        <section className="fasilitas-section">
          <h4>Fasilitas</h4>
          <div className="grid">
            {café.fasilitas
              ?.split(",")
              .map((item) => item.trim())
              .map((item, index) => {
                const key = item.toLowerCase();
                const icon = fasilitasIcons[key] || "✅";
                return (
                  <div key={index} className="fasilitas-item">
                    <div className="icon">{icon}</div>
                    <p>{item}</p>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Review Section */}
        <div className="review-fullscreen-bg">
          <section className="review-container">
            <div className="review-header">
              <div>
                <h2 className="section-title" style={{ color: "white" }}>
                  Review Ala Pengunjung
                </h2>
                <p className="section-subtitle">
                  <strong>Spoiler:</strong> Banyak yang balik lagi!
                </p>
              </div>
              <button className="review-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Tutup" : "+ Review"}
              </button>
            </div>

            {showForm && (
              <div className="review-form card">
                <textarea placeholder="Tulis review..." value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} className="form-textarea" />
                <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} className="form-select">
                  <option value="">Pilih Rating</option>
                  <option value="1">⭐ 1</option>
                  <option value="2">⭐⭐ 2</option>
                  <option value="3">⭐⭐⭐ 3</option>
                  <option value="4">⭐⭐⭐⭐ 4</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5</option>
                </select>
                <button onClick={handleAddReview} className="submit-review-btn">
                  Kirim
                </button>
              </div>
            )}

            <div className="review-grid">
              {reviewList.map((rev, idx) => (
                <div className="review-card" key={idx}>
                  <div className="review-user">
                    <img src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${rev.name ? rev.name : "Anonim"}`} alt={rev.name ? rev.name : "Anonim"} className="user-img" />
                    <div className="review-content">
                      <div className="review-top">
                        <span className="review-name">{rev.name ? rev.name : "Anonim"}</span>
                        <div className="review-rating">{"⭐".repeat(rev.rating)}</div>
                      </div>
                      <p className="review-text">{rev.komentar}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Lokasi dan Footer */}
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
    </div>
  );
}
