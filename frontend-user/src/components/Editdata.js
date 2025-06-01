import React, { useState, useEffect } from "react";
import "./Editdata.css";

const Editdata = ({ user, onChange, onCancel, onSave, loadingSave, errorSave }) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (onChange) onChange(id, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Nama dan Email tidak boleh kosong!");
      return;
    }

    const dataToSave = { ...formData };
    if (!formData.password) {
      delete dataToSave.password;
    }

    if (onSave) onSave(dataToSave);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="edit-title">Edit Data</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nama</label>
          <input type="text" id="name" value={formData.name || ""} onChange={handleChange} placeholder="Masukkan Nama" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email || ""} onChange={handleChange} placeholder="Masukkan Email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password || ""} onChange={handleChange} placeholder="Masukkan Password" />

          {errorSave && <p style={{ color: "red" }}>{errorSave}</p>}

          <div className="button-group">
            <button type="button" className="batal-btn" onClick={onCancel} disabled={loadingSave}>
              Batal
            </button>
            <button type="submit" className="simpan-btn" disabled={loadingSave}>
              {loadingSave ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editdata;
