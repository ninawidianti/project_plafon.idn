import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaMapMarkerAlt, FaInstagram, FaBuilding } from 'react-icons/fa';
import './Daftarcafe.css';

const cafeList = [
  {
    id: 'cafe1',
    name: 'Warung Senja',
    address: 'Jalan Dr. Moh Hatta No 12',
    time: '13.00–24.00',
    rating: 5,
    image: 'https://img.freepik.com/free-photo/vintage-coffee-shop-interior_53876-147282.jpg',
  },
  {
    id: 'cafe2',
    name: 'Kopi Lembayung',
    address: 'Jl. Veteran No. 8',
    time: '10.00–22.00',
    rating: 4,
    image: 'https://img.freepik.com/free-photo/interior-coffee-shop_1127-3394.jpg',
  },
  {
    id: 'cafe3',
    name: 'Langit Petang',
    address: 'Jl. Ahmad Yani No. 5',
    time: '11.00–23.00',
    rating: 4,
    image: 'https://img.freepik.com/free-photo/cafe-interior-design_1127-3129.jpg',
  }
];

const Daftarcafe = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCafeClick = (id) => {
    navigate(`/deskripsi/${id}`);
  };

  return (
    <div className="daftar-container">
      {/* Navbar */}
      <div className="navbar">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="logo"
          className="logo-img"
        />
      </div>

      {/* Tombol Kembali */}
      <div className="back-button">
        <button className="back-icon" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>

      {/* Judul Halaman */}
      <div className="daftar-title">
        <h1>Pilihan Nongki Terbaik</h1>
        <p>Cafe-cafe paling vibes yang siap nemenin lo nongkrong, ngopi, atau healing tipis-tipis!</p>
      </div>

      {/* Search dan Filter */}
      <div className="search-bar">
        <input type="text" placeholder="Cari cafe..." />
        <div className="filter-dropdown" ref={dropdownRef}>
          <div className="filter" onClick={() => setShowDropdown(!showDropdown)}>
            Filter ▼
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Lokasi</div>
              <div className="dropdown-item">Rating</div>
              <div className="dropdown-item">Jenis Cafe</div>
              <div className="dropdown-item">Fasilitas</div>
              <div className="dropdown-item">Menu</div>
              <div className="dropdown-item">Range Harga</div>
            </div>
          )}
        </div>
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Daftar Cafe */}
      <div className="cafe-list">
        {cafeList.map((cafe) => (
          <div className="cafe-card" key={cafe.id} onClick={() => handleCafeClick(cafe.id)}>
            <img src={cafe.image} alt={cafe.name} />
            <h3>{cafe.name}</h3>
            <p>{cafe.address}</p>
            <div className="cafe-info">
              <span className="stars">{'⭐'.repeat(cafe.rating)}</span>
              <span className="jam">{cafe.time}</span>
            </div>
          </div>
        ))}
      </div>

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

export default Daftarcafe;
