import React from 'react'; 
import './Akun.css';
import {
  FaArrowLeft,
  FaSignOutAlt,
  FaClock,
  FaStar,
  FaMapMarkerAlt,
  FaInstagram,
  FaBuilding,
} from 'react-icons/fa';

export default function Akun() {
  return (
    <div className="akun-container">
      <header className="akun-header">
        <div className="logo">
          <img src="/images/p.png" alt="logo" className="logo-img" />
        </div>
        <FaSignOutAlt className="logout-icon" />
      </header>

      <main>
        <button className="back-btn">
          <FaArrowLeft />
        </button>

        <h2 className="section-title">Data Akun</h2>
        <div className="akun-card">
          <p><strong>Nama</strong> : Nina Widianti</p>
          <p><strong>Email</strong> : nwidianti31@gmail.com</p>
          <button className="edit-btn">Edit</button>
        </div>

        <h2 className="section-title">Cafe yang Disukai</h2>
        <div className="cafe-grid">
          {[
            {
              name: 'Common Room',
              img: 'https://img.freepik.com/free-photo/stylish-cafe-interior-design_1409-5055.jpg',
              address: 'Jalan Dr. Moh Hatta No 12',
              time: '13.00–24.00',
              rating: 4,
            },
          ].map((cafe, idx) => (
            <div key={idx} className="cafe-card">
              <img src={cafe.img} alt={cafe.name} className="cafe-img" />
              <div className="cafe-info">
                
              <div className="cafe-name">{cafe.name}</div>
              <div className="cafe-address">{cafe.address}</div>
                <div className="cafe-meta">
                  <div className="stars">
                    {'★'.repeat(cafe.rating)}
                    {'☆'.repeat(5 - cafe.rating)}
                  </div>
                  <div className="time">
                    <FaClock /> {cafe.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lokasi Section */}
        <section className="lokasi-section">
          <div className="lokasi-left">
            <img src="/images/p.png" alt="Plafon.idn Logo" className="lokasi-logo" />
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
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.289517698413!2d100.38056817496524!3d-0.9497887353648136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b8c2c8f826f7%3A0x30f9b1a4f9e13a2!2sPT%20Metro%20Indonesian%20Software!5e0!3m2!1sid!2sid!4v1714908742225!5m2!1sid!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi PT Metro"
            ></iframe>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-bawah">
          <hr />
          <p>@ 2025 Plafon.idn All rights reserved</p>
        </footer>
      </main>
    </div>
  );
}
