import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaSearch, FaMapMarkerAlt, FaInstagram, FaBuilding } from "react-icons/fa";
import "./Daftarcafe.css";

const Daftarcafe = () => {
  const [cafes, setCafes] = useState([]); // dari backend
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCafes = cafes.filter((cafe) => {
    const term = searchTerm.toLowerCase();

    if (!term) return true; // Tampilkan semua jika kosong

    switch (selectedFilter) {
      case "Lokasi":
        return cafe.alamat && cafe.alamat.toLowerCase().includes(term);
      case "Rating":
        return cafe.rating.toString().includes(term);
      default:
        return cafe.name.toLowerCase().includes(term) || (cafe.alamat && cafe.alamat.toLowerCase().includes(term)) || cafe.rating.toString().includes(term);
    }
  });

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
    const fetchCafes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cafes");
        setCafes(res.data);
      } catch (err) {
        console.error("Gagal mengambil data cafe:", err);
      }
    };

    fetchCafes();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCafeClick = (id) => {
    navigate(`/deskripsi/${id}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false); // otomatis tutup dropdown saat pilih filter
  };

  return (
    <div className="container">
      <div className="header-top">
        <img src="/images/p.png" alt="logo" style={{ width: "50px", height: "auto" }} />
      </div>

      <div className="back-banner">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>

      <div className="daftar-title">
        <h1>Pilihan Nongki Terbaik</h1>
        <p>Cafe-cafe paling vibes yang siap nemenin lo nongkrong, ngopi, atau healing tipis-tipis!</p>
      </div>

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

      <div
        className="cafe-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredCafes.length > 0 ? (
          filteredCafes.map((cafe) => (
            <div className="cafe-card" key={cafe.id} onClick={() => navigate(`/deskripsi/${cafe.id}`)} style={{ cursor: "pointer" }}>
              <img src={`http://localhost:5000/uploads/${cafe.foto_cafe}`} alt={cafe.name} />
              <h3>{cafe.name}</h3>
              <p>{cafe.alamat}</p>
              <div className="cafe-info">
                <span className="stars">{"⭐".repeat(cafe.rating)}</span>
                <span className="jam">{cafe.J_Operasional}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada cafe yang cocok dengan pencarian.</p>
        )}
      </div>

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
      
              <div className="lokasi-right" style={{ flex: 1, minWidth: "300px", marginTop: "30px"}}>
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

export default Daftarcafe;
