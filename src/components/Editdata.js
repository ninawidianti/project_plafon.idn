// Editdata.js
import React from 'react';
import './Editdata.css';

const Editdata = () => {
  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Data</h2>
      <form className="edit-form">
        <label htmlFor="name">Nama</label>
        <input type="text" id="name" placeholder="Masukkan Nama" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Masukkan Email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Masukkan Password" />

        <div className="button-group">
          <button type="button" className="batal-btn">Batal</button>
          <button type="submit" className="simpan-btn">Simpan</button>
        </div>
      </form>
    </div>
  );
};

export default Editdata;
