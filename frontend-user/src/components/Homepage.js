import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import axios from "axios";
import { FaSearch, FaClock, FaStar, FaMapMarkerAlt, FaUserCircle, FaInstagram, FaBuilding, FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Homepage = () => {
  const [cafes, setCafes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Filter cafes sesuai pencarian dan filter yang dipilih
  const filteredCafes = cafes.filter((cafe) => {
    const term = searchTerm.toLowerCase();

    switch (selectedFilter) {
      case "Lokasi":
        return cafe.alamat && cafe.alamat.toLowerCase().includes(term);
      case "Rating":
        return cafe.rating.toString().includes(term);
      default:
        return cafe.name.toLowerCase().includes(term) || (cafe.alamat && cafe.alamat.toLowerCase().includes(term)) || cafe.rating.toString().includes(term);
    }
  });

  // Update filter dan dropdown berdasarkan kata kunci di pencarian
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    if (lowerTerm.includes("lokasi")) {
      setSelectedFilter("Lokasi");
      setIsDropdownOpen(true);
    } else if (lowerTerm.includes("rating")) {
      setSelectedFilter("Rating");
      setIsDropdownOpen(true);
    } else if (searchTerm === "") {
      setSelectedFilter("Filter");
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Cek apakah user sudah login dari localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    navigate("/masuk");
  };
  const handleAkun = () => {
    navigate("/akun");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false); // otomatis tutup dropdown saat pilih filter
  };

  const tags = ["Coffe Shop", "Bistro", "Tempat Nongkrong", "Street Cafe", "Warung Kopi", "Hidden Gem Cafe"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchCafes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cafes");
        setCafes(res.data);
      } catch (err) {
        console.error("Gagal memuat data cafe:", err);
      }
    };

    fetchCafes();
  }, [navigate]);

  const renderStars = (rating) => [...Array(5)].map((_, i) => <FaStar key={i} color={i < rating ? "#fbc02d" : "#ccc"} />);

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="overlay">
        <header className="header">
          <img src="/images/p.png" alt="Plafon.idn Logo" className="lokasi-logo" />
          <header className="header">
            <div className="auth-buttons">
              {isLoggedIn ? (
                <button className="auth-btn akun" onClick={handleAkun}>
                  <FaUserCircle size={20} style={{ marginRight: "5px" }} />
                  Akun
                </button>
              ) : (
                <>
                  <button className="auth-btn masuk" onClick={handleLogin}>
                    Masuk
                  </button>
                </>
              )}
            </div>
          </header>
        </header>

        <main className="main-content">
          <h1 className="title">Temukan Rekomendasi Cafe Terbaik di Padang</h1>
          <p className="subtitle">
            Dari Hidden Gem hingga Cafe Hits, Semua Ada di Sini.
            <br />
            Filter tempat nongkrong sesuai vibe kamu!!!
          </p>

          {/* Search dan Filter */}
          <div className="search-section" ref={dropdownRef}>
            <input type="text" className="search-input" placeholder="Cari Rekomendasi Cafe" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="filter-dropdown">
              <button className="filter-btn" onClick={toggleDropdown}>
                {selectedFilter} ▾
              </button>
              {isDropdownOpen && (
                <div className="filter-options">
                  <div onClick={() => handleFilterSelect("Lokasi")}>Lokasi</div>
                  <div onClick={() => handleFilterSelect("Rating")}>Rating</div>
                </div>
              )}
            </div>
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

          <div className="tags">
            {tags.map((tag) => (
              <button key={tag} disabled style={{ pointerEvents: "none", userSelect: "none" }}>
                {tag}
              </button>
            ))}
          </div>
        </main>
      </div>

      {/* Section: Rekomendasi */}
      <section className="recommendation-section">
        <h2>Cafe Rekomendasi Plafon.idn</h2>
        <p className="section-header">Cafe-cafe kece yang kita highlight, karena mereka tahu caranya bikin nongki makin asik!</p>
        <div className="card-container">
          {(searchTerm ? filteredCafes : filteredCafes.slice(0, 4)).map((cafe, i) => (
            <div className="cafe-card" key={cafe.id} onClick={() => navigate(`/deskripsi/${cafe.id}`)} style={{ cursor: "pointer" }}>
              <img src={`http://localhost:5000/uploads/${cafe.foto_cafe}`} alt={cafe.name} className="cafe-image" />
              <div className="cafe-details">
                <div className="cafe-name">{cafe.name}</div>
                <div className="cafe-address">{cafe.alamat}</div>
                <div className="cafe-meta">
                  <div className="stars">{renderStars(cafe.rating)}</div>
                  <div className="hours">
                    <FaClock /> {cafe.J_Operasional}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tentang Section */}
      <section className="tentang-container">
        <div className="image2-grid">
          {["gambar 1.jpg","gambar 2.jpg","gambar 3.jpg","gambar 4.jpg"].map(
            (src, i) => (
              <img
                key={i}
                src={`/images/${src}`}
                alt={`cafe${i + 1}`}
                className={`img2 ${i === 0 ? "top-left" : ""} ${i === 1 ? "top-right" : ""} ${i === 2 ? "bottom-left" : ""} ${i === 3 ? "bottom-right" : ""}`}
              />
            )
          )}
        </div>

        <div className="text-section">
          <h2 className="judul">Tentang Plafon.idn</h2>
          <p className="isi">Plafon.idn adalah platform rekomendasi cafe di Padang. Kami menyediakan informasi tentang berbagai cafe terbaik yang ada di Kota Padang, mulai dari suasana, menu, hingga fasilitas yang disediakan.</p>
          <p className="isi">
            Plafon.idn hadir untuk membantu kamu menemukan tempat nongkrong yang sesuai dengan suasana hati dan kebutuhanmu—mulai dari cafe estetik untuk foto-foto, tempat nyaman buat nugas, hingga cafe dengan menu lengkap untuk makan
            berat.
          </p>
          <p className="isi">Temukan cafe favoritmu, jelajahi sudut kota Padang dengan lebih seru bersama Plafon.idn!</p>
          <div className="highlight-box">
            <div className="highlight-left">
              <h3>26 +</h3>
              <p>Cafe Terbaik</p>
            </div>
            <div className="highlight-right">
              <p className="temukan">Temukan Rasa, Temukan Tempat</p>
              <p className="keterangan">(Kombinasi cita rasa & lokasi)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Bintang 5 */}
      <section
        className="bintang-section"
        style={{
          background: "linear-gradient(to bottom, #1BFCB680, #A2BDB580)", // Gradasi dari atas ke bawah
          padding: "20px", // Menambah padding supaya konten tidak terlalu rapat
        }}
      >
        <div className="bintang-content">
          <div
            className="bintang-left"
            style={{
              maxWidth: "520px",
              padding: "20px",
              backgroundColor: "#f9fafb", // warna latar lembut
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <h2
              className="bintang-title"
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#16a34a", // hijau segar (tailwind emerald-600)
                marginBottom: "0.2rem",
                letterSpacing: "0.05em",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Bintang 5
            </h2>
            <h3
              className="bintang-subtitle"
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#4b5563", // abu gelap (tailwind gray-600)
                marginBottom: "1rem",
                fontStyle: "italic",
                letterSpacing: "0.02em",
              }}
            >
              di Sudut Padang
            </h3>
            <p
              className="bintang-description"
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                maxWidth: "100%",
                lineHeight: "1.7",
                color: "#374151", // abu gelap (tailwind gray-700)
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Nikmati pengalaman nongkrong terbaik dari café-café pilihan dengan rating sempurna di Kota Padang. Setiap sudutnya menyimpan rasa, suasana, dan pelayanan yang diakui langsung oleh para pengunjung.
            </p>
          </div>

          <div className="bintang-right">
            {cafes
              .filter((cafe) => Number(cafe.rating) === 3)

              .map((cafe, index) => (
                <div className="cafe-card" key={cafe.id} onClick={() => navigate(`/deskripsi/${cafe.id}`)} style={{ cursor: "pointer" }}>
                  <img src={`http://localhost:5000/uploads/${cafe.foto_cafe}`} alt={cafe.name} className="cafe-image" />

                  <div className="cafe-details">
                    <div className="cafe-name">{cafe.name}</div>
                    <div className="cafe-address">{cafe.alamat}</div>
                    <div className="cafe-meta">
                      <div className="stars">{renderStars(cafe.rating)}</div>
                      <div className="hours">
                        <FaClock /> {cafe.J_Operasional}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Section: Pilihan Nongki */}
      <section className="recommendation-section">
        <div className="section-header">
          <h2>Pilihan Nongki Terbaik</h2>
          <button className="lihat-semua-btn" onClick={() => navigate("/daftarcafe")}>
            Lihat Semua <FaArrowRight />
          </button>
        </div>
        <div className="card-container">
          {cafes.slice(0, 4).map((cafe, i) => (
            <div className="cafe-card" key={cafe.id} onClick={() => navigate(`/deskripsi/${cafe.id}`)} style={{ cursor: "pointer" }}>
              <img src={`http://localhost:5000/uploads/${cafe.foto_cafe}`} alt={cafe.name} className="cafe-image" />
              <div className="cafe-details">
                <div className="cafe-name">{cafe.name}</div>
                <div className="cafe-address">{cafe.alamat}</div>
                <div className="cafe-meta">
                  <div className="stars">{renderStars(cafe.rating)}</div>
                  <div className="hours">
                    <FaClock /> {cafe.J_Operasional}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Makan Serius */}
      <section className="recommendation-section">
        <div className="section-header">
          <h2>Makan Serius di Tempat Santai</h2>
          <button className="lihat-semua-btn" onClick={() => navigate("/daftarcafe")}>
            Lihat Semua <FaArrowRight />
          </button>
        </div>
        <div className="card-container">
          {cafes.slice(0, 4).map((cafe, i) => (
            <div className="cafe-card" key={cafe.id} onClick={() => navigate(`/deskripsi/${cafe.id}`)} style={{ cursor: "pointer" }}>
              <img src={`http://localhost:5000/uploads/${cafe.foto_cafe}`} alt={cafe.name} className="cafe-image" />
              <div className="cafe-details">
                <div className="cafe-name">{cafe.name}</div>
                <div className="cafe-address">{cafe.alamat}</div>
                <div className="cafe-meta">
                  <div className="stars">{renderStars(cafe.rating)}</div>
                  <div className="hours">
                    <FaClock /> {cafe.J_Operasional}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lokasi PT. Metro */}
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
          {/* Embed Google Maps */}
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

      {/* Footer */}
      <footer className="footer-bawah" style={{ marginTop: 0, paddingTop: 0 }}>
        <hr />
        <p>@ 2025 Plafon.idn All rights reserved</p>
      </footer>
    </div>
  );
};

export default Homepage;
