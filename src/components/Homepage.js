import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

import {
  FaSearch,
  FaClock,
  FaStar,
  FaMapMarkerAlt,
  FaInstagram,
  FaBuilding,
  FaArrowRight
} from 'react-icons/fa';

const Homepage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const navigate = useNavigate();

  const tags = ['Coffe Shop', 'Bistro', 'Tempat Nongkrong', 'Street Cafe', 'Warung Kopi', 'Hidden Gem Cafe'];

  const cafeList = [
    {
      name: 'Common Room',
      address: 'Jalan Dr. Moh Hatta No 12',
      rating: 4,
      hours: '13.00-24.00',
      image: 'https://img.freepik.com/free-photo/cafe-interior-with-coffee-cup_123827-28541.jpg',
    },
    {
      name: 'Chill Coffee',
      address: 'Jalan Dr. Moh Hatta No 12',
      rating: 4,
      hours: '13.00-24.00',
      image: 'https://img.freepik.com/free-photo/cafe-interior-with-coffee-cup_123827-28541.jpg',
    },
    {
      name: 'Belieber Cafe',
      address: 'Jalan Dr. Moh Hatta No 12',
      rating: 5,
      hours: '13.00-24.00',
      image: 'https://img.freepik.com/free-photo/wooden-cafe-terrace-modern-style_1409-5045.jpg',
    },
    {
      name: 'Better Be Butter',
      address: 'Jalan Dr. Moh Hatta No 12',
      rating: 5,
      hours: '13.00-24.00',
      image: 'https://img.freepik.com/free-photo/modern-cafe-exterior-daytime_1409-5042.jpg',
    },
    {
      name: 'Warung Senja',
      address: 'Jalan Dr. Moh Hatta No 12',
      rating: 4,
      hours: '13.00-24.00',
      image: 'https://img.freepik.com/free-photo/empty-wooden-table-cafe-blurred-background_1150-10836.jpg',
    },
    {
      name: 'Finn Home',
      address: 'Jalan Dr. Moh Hatta No 12',
      rating: 4,
      hours: '13.00-24.00',
      image: 'https://img.freepik.com/free-photo/wooden-cafe-terrace-modern-style_1409-5045.jpg',
    },
  ];

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < rating ? '#fbc02d' : '#ccc'} />
    ));

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="overlay">
        <header className="header">
          <img src="/images/p.png" alt="Plafon.idn Logo" className="lokasi-logo" />
         
    <div>
    <button className="Masuk-btn" onClick={() => navigate('/masuk')}>
        Masuk
      </button>
      <button className="Masuk-btn" onClick={() => navigate('/masuk')}>
        Daftar
      </button>
    </div>
 
        </header>

        <main className="main-content">
          <h1 className="title">Temukan Rekomendasi Cafe Terbaik di Padang</h1>
          <p className="subtitle">
            Dari Hidden Gem hingga Cafe Hits, Semua Ada di Sini.<br />
            Filter tempat nongkrong sesuai vibe kamu!!!
          </p>
          <div className="search-section">
            <input type="text" className="search-input" placeholder="Cari Rekomendasi Cafe" />
            <div className="filter-dropdown">
              <button className="filter-btn" onClick={toggleDropdown}>Filter ▾</button>
              {isDropdownOpen && (
                <div className="filter-options">
                  <div>Lokasi</div>
                  <div>Rating</div>
                  <div>Jenis Cafe</div>
                  <div>Fasilitas</div>
                  <div>Menu</div>
                  <div>Range Harga</div>
                </div>
              )}
            </div>
            <button className="search-btn"><FaSearch /></button>
          </div>
          <div className="tags">
            {tags.map(tag => <button key={tag}>{tag}</button>)}
          </div>
        </main>
      </div>

      {/* Section: Rekomendasi */}
      <section className="recommendation-section">
        <div className="section-header">
          <h2>Cafe Rekomendasi Plafon.idn</h2>
        </div>
        <div className="section-header">
          <p>Cafe-cafe kece yang kita highlight, karena mereka tahu caranya bikin nongki makin asik!</p>
        </div>
        <div className="card-container">
          {cafeList.slice(0, 2).map((cafe, i) => (
            <div className="cafe-card" key={i}>
              <img src={cafe.image} alt={cafe.name} className="cafe-image" />
              <div className="cafe-details">
              <div className="cafe-name">{cafe.name}</div>
                <div className="cafe-address">{cafe.address}</div>
                <div className="cafe-meta">
                  <div className="stars">{renderStars(cafe.rating)}</div>
                  <div className="hours"><FaClock /> {cafe.hours}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tentang Section */}
      <section className="tentang-container">
        <div className="image-grid">
          {['5043', '147282', '5046', '5055'].map((id, i) => (
            <img key={i} src={`https://img.freepik.com/free-photo/${id}.jpg`} alt={`cafe${i + 1}`} className="img" />
          ))}
        </div>
        <div className="text-section">
    <h2 className="judul">Tentang Plafon.idn</h2>
    <p className="isi">
      Plafon.idn adalah platform rekomendasi cafe di Padang. Kami menyediakan informasi tentang berbagai cafe terbaik yang ada di Kota Padang, mulai dari suasana, menu, hingga fasilitas yang disediakan.
    </p>
    <p className="isi">
      Plafon.idn hadir untuk membantu kamu menemukan tempat nongkrong yang sesuai dengan suasana hati dan kebutuhanmu—mulai dari cafe estetik untuk foto-foto, tempat nyaman buat nugas, hingga cafe dengan menu lengkap untuk makan berat.
    </p>
    <p className="isi">
      Temukan cafe favoritmu, jelajahi sudut kota Padang dengan lebih seru bersama Plafon.idn!
    </p>
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
      <section className="bintang-section">
        <div className="bintang-content">
          <div className="bintang-left">
            <h2 className="bintang-title">Bintang 5</h2>
            <h3 className="bintang-subtitle">di Sudut Padang</h3>
            <p className="bintang-description">
              Nikmati pengalaman nongkrong terbaik dari café-café pilihan dengan rating sempurna...
            </p>
          </div>
          <div className="bintang-right">
            {cafeList.filter(cafe => cafe.rating === 5).map((cafe, index) => (
              <div className="cafe-card" key={index}>
                <img src={cafe.image} alt={cafe.name} className="cafe-img" />
                <div className="cafe-details">
                  <div className="cafe-name">{cafe.name}</div>
                  <div className="cafe-address">{cafe.address}</div>
                  <div className="cafe-meta">
                    <div className="stars">{renderStars(cafe.rating)}</div>
                    <div className="hours"><FaClock /> {cafe.hours}</div>
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
          <button className="lihat-semua-btn" onClick={() => navigate('/daftarcafe')}>
            Lihat Semua <FaArrowRight />
          </button>
        </div>
        <div className="card-container">
          {cafeList.slice(0, 3).map((cafe, i) => (
            <div className="cafe-card" key={`rec1-${i}`}>
              <img src={cafe.image} alt={cafe.name} className="cafe-image" />
              <div className="cafe-details">
              <div className="cafe-name">{cafe.name}</div>
                <div className="cafe-address">{cafe.address}</div>
                <div className="cafe-meta">
                  <div className="stars">{renderStars(cafe.rating)}</div>
                  <div className="hours"><FaClock /> {cafe.hours}</div>
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
          <button className="lihat-semua-btn" onClick={() => navigate('/daftarcafe')}>
            Lihat Semua <FaArrowRight />
          </button>
        </div>
        <div className="card-container">
          {cafeList.slice(3, 6).map((cafe, i) => (
            <div className="cafe-card" key={`rec2-${i}`}>
              <img src={cafe.image} alt={cafe.name} className="cafe-image" />
              <div className="cafe-details">
              <div className="cafe-name">{cafe.name}</div>
                <div className="cafe-address">{cafe.address}</div>
                <div className="cafe-meta">
                  <div className="stars">{renderStars(cafe.rating)}</div>
                  <div className="hours"><FaClock /> {cafe.hours}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* Lokasi PT. Metro */}
     <section className="lokasi-section">
        <div className="lokasi-left">
          <img
            src="/images/p.png"
            alt="Plafon.idn Logo"
            className="lokasi-logo"
          />

          <div className="lokasi-item">
            <FaMapMarkerAlt className="lokasi-icon" />
            <p>
              Jl. Dr. Sutomo No. 48 A.3 RT. 01 RW. 01 Kel. Kubu Marapalam<br />
              Kec. Padang Timur <a href="https://maps.app.goo.gl/f9ZovRaRM6HTgyxs5" target="_blank" rel="noopener noreferrer">KOTA PADANG, Indonesia</a>
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

        <div className="lokasi-right">
          <h3>Lokasi PT. Metro</h3>
          {/* Embed Google Maps */}
          <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.289517698413!2d100.38056817496524!3d-0.9497887353648136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b8c2c8f826f7%3A0x30f9b1a4f9e13a2!2sPT%20Metro%20Indonesian%20Software!5e0!3m2!1sid!2sid!4v1714908742225!5m2!1sid!2sid"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-bawah">
        <hr />
        <p>@ 2025 Plafon.idn All rights reserved</p>
      </footer>
    </div>
  );
};

export default Homepage;
