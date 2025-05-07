import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Deskripsi.css';
import {
  FaWifi, FaMosque, FaParking, FaSnowflake,
  FaCamera, FaMusic, FaPlug, FaSmoking,
  FaMapMarkerAlt, FaInstagram, FaBuilding,
  FaWhatsapp
} from 'react-icons/fa';

const dataCafe = {
  cafe1: {
    name: 'Warung Senja',
    address: 'Jalan Dr. Moh Hatta No 12',
    time: '13.00–24.00',
    category: 'Outdoor',
    description: `Warung Senja adalah tempat nongkrong dengan nuansa hangat dan estetik di pusat Kota Padang...`,
    menuImage: 'https://i.ibb.co/gzNvLVF/sample-menu.jpg',
    instagram: 'https://www.instagram.com/your-instagram-handle',
    whatsapp: 'https://wa.me/your-phone-number',
    maps: 'https://www.google.com/maps?q=Jalan+Dr.+Moh+Hatta+No+12'
  },
  cafe2: {
    name: 'Kopi Lembayung',
    address: 'Jl. Veteran No. 8',
    time: '10.00–22.00',
    category: 'Indoor',
    description: `Kopi Lembayung menyajikan pemandangan senja dari lantai 2 dan minuman kopi artisan terbaik.`,
    menuImage: 'https://i.ibb.co/gzNvLVF/sample-menu.jpg',
    instagram: 'https://www.instagram.com/your-instagram-handle',
    whatsapp: 'https://wa.me/your-phone-number',
    maps: 'https://www.google.com/maps?q=Jl.+Veteran+No.+8'
  },
  cafe3: {
    name: 'Langit Petang',
    address: 'Jl. Ahmad Yani No. 5',
    time: '11.00–23.00',
    category: 'Rooftop',
    description: `Langit Petang cocok untuk menikmati angin sore sambil menyeruput kopi sambil mendengarkan live acoustic.`,
    menuImage: 'https://i.ibb.co/gzNvLVF/sample-menu.jpg',
    instagram: 'https://www.instagram.com/your-instagram-handle',
    whatsapp: 'https://wa.me/your-phone-number',
    maps: 'https://www.google.com/maps?q=Jl.+Ahmad+Yani+No.+5'
  }
};

export default function Deskripsi() {
  const { id } = useParams();
  const cafe = dataCafe[id];
  const [liked, setLiked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE_REVIEWS = 3;

  const [newReview, setNewReview] = useState({ name: '', text: '', rating: '' });

  const [reviewList, setReviewList] = useState([
    {
      name: 'Hanes Figa',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      text: 'Tempatnya adem dan tenang, cocok buat nugas atau ngobrol santai.',
      rating: '4'
    },
    {
      name: 'Nina Widianti',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      text: 'Kopi senjanya wajib coba, ada rasa khas yang bikin nagih!',
      rating: '5'
    },
    {
      name: 'Agus Wijaya',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      text: 'Pemandangannya keren banget di sore hari.',
      rating: '4'
    },
    {
      name: 'Lina Mardiana',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      text: 'Tempat parkir luas, dan pelayanan ramah.',
      rating: '5'
    }
  ]);

  const fasilitas = [
    { icon: <FaWifi />, label: 'Wifi cepat dan stabil' },
    { icon: <FaMosque />, label: 'Mushalla' },
    { icon: <FaParking />, label: 'Area parkir luas' },
    { icon: <FaSnowflake />, label: 'Ruangan ber-AC' },
    { icon: <FaCamera />, label: 'Spot foto estetik' },
    { icon: <FaMusic />, label: 'Live musik' },
    { icon: <FaPlug />, label: 'Stopkontak di setiap meja' },
    { icon: <FaSmoking />, label: 'Smoking area terpisah' }
  ];

  const handleAddReview = () => {
    if (!newReview.name || !newReview.text || !newReview.rating) {
      alert("Nama, review, dan rating wajib diisi!");
      return;
    }

    const newRev = {
      name: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      image: 'https://randomuser.me/api/portraits/lego/1.jpg'
    };

    setReviewList([...reviewList, newRev]);
    setNewReview({ name: '', text: '', rating: '' });
    setShowForm(false);
  };

  if (!cafe) return <h2>Cafe tidak ditemukan</h2>;

  return (
    <div className="container">
      <div className="header-top">
        <img src="https://i.ibb.co/2Sqg2DL/logo-plafon-putih.png" alt="logo" className="logo" />
      </div>

      <div className="image-banner">
        <button className="back-button">←</button>
      </div>

      <div className="info">
        <div className="title-row">
          <h1 className="title">{cafe.name}</h1>
          <button onClick={() => setLiked(!liked)} className="like-button">
            <span className={liked ? 'liked' : 'not-liked'}>&hearts;</span>
          </button>
        </div>

        <div className="stars">★★★★☆</div>
        <p className="address">{cafe.address}</p>

        <div className="info-row">
          <div className="time">🕐 {cafe.time}</div>
          <div className="category">Kategori : <strong>{cafe.category}</strong></div>
        </div>

        <div className="description">
          <h2 className="description-title">Deskripsi</h2>
          <p className="description-text">{cafe.description}</p>
        </div>

        <section className="menu-section">
          <div className="text">
            <h4>Menu</h4>
            <h2>Harga Start From 20K</h2>
            <p>Menu utama dan camilan modern tersedia.</p>
          </div>
          <div className="image">
            <img src={cafe.menuImage} alt="Menu Cafe" />
          </div>
        </section>

        <section className="fasilitas-section">
          <h4>Fasilitas</h4>
          <div className="grid">
            {fasilitas.map((item, index) => (
              <div key={index} className="fasilitas-item">
                <div className="icon">{item.icon}</div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="review-container">
          <div className="review-header">
            <div>
              <h2>Review Ala Pengunjung</h2>
              <p><strong>Spoiler:</strong> banyak yang balik lagi!</p>
            </div>
            <button className="review-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Tutup' : '+ Review'}
            </button>
          </div>

          {showForm && (
            <div className="review-form">
              <input
                type="text"
                placeholder="Nama Anda"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              />
              <textarea
                placeholder="Tulis review..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              />
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              >
                <option value="">Pilih Rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>
              <button onClick={handleAddReview}>Kirim</button>
            </div>
          )}

          <div className="review-grid">
            {(showAll ? reviewList : reviewList.slice(0, MAX_VISIBLE_REVIEWS)).map((rev, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-user">
                  <img src={rev.image} alt={rev.name} className="user-img" />
                  <strong>{rev.name}</strong>
                </div>
                <p className="review-text">{rev.text}</p>
                {rev.rating && (
                  <div className="review-rating">
                    {'⭐'.repeat(rev.rating)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {reviewList.length > MAX_VISIBLE_REVIEWS && (
            <button className="selengkapnya-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Sembunyikan' : 'Lihat Selengkapnya'}
            </button>
          )}
        </section>

        <section className="social-buttons">
          <a href={cafe.whatsapp} target="_blank" rel="noopener noreferrer">
            <button className="btn whatsapp"><FaWhatsapp size="24" /></button>
          </a>
          <a href={cafe.instagram} target="_blank" rel="noopener noreferrer">
            <button className="btn instagram"><FaInstagram size="24" /></button>
          </a>
          <a href={cafe.maps} target="_blank" rel="noopener noreferrer">
            <button className="btn maps"><FaMapMarkerAlt size="24" /></button>
          </a>
        </section>
      </div>

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
            width="100%" height="300" style={{ border: 0 }}
            allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </section>

      <footer className="footer-bawah">
        <hr />
        <p>@ 2025 Plafon.idn All rights reserved</p>
      </footer>
    </div>
  );
}
