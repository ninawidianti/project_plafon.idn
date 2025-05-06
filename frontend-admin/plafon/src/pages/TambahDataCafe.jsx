import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const TambahDataCafe = () => {
  const initialFormState = {
    Nama: "",
    Jam_operasional: "",
    Deskripsi: "",
    Foto_cafe: null,
    Foto_menu: null,
    Detail_menu: null,
    Kategori: "",
    Kategori_plafon: "",
    Alamat: "",
    Rating: "",
    Fasilitas: "",
    Link_maps: "",
    Link_instagram: "",
    Link_whatsapp: "",
  };

  const [formInput, setFormInput] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "Nama",
      "Jam_operasional",
      "Deskripsi",
      "Foto_cafe",
      "Foto_menu",
      "Detail_menu",
      "Kategori_plafon",
      "Alamat",
      "Rating",
      "Fasilitas",
      "Link_maps",
      "Link_instagram",
      "Link_whatsapp",
      "Kategori",
    ];

    requiredFields.forEach((field) => {
      const value = formInput[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[field] = `${field.replace("_", " ")} tidak boleh kosong.`;
      }
    });

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(formInput).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await fetch("http://localhost:5000/api/cafe", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`Gagal menambahkan data cafe: ${result.message || "Data tidak valid"}`);
        return;
      }

      alert("Data cafe berhasil ditambahkan!");
      setFormInput(initialFormState);
      navigate("/data/cafe");
    } catch (error) {
      console.error("Error saat submit:", error);
      alert("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <h2 className="mb-4">Tambah Data Cafe</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {[
            { label: "Nama Cafe", name: "Nama" },
            { label: "Link Maps", name: "Link_maps" },
            { label: "Alamat", name: "Alamat" },
            { label: "Link WhatsApp", name: "Link_whatsapp" },
            { label: "Jam Operasional", name: "Jam_operasional" },
            { label: "Rating", name: "Rating", type: "number" },
            { label: "Link Instagram", name: "Link_instagram" },
            { label: "Detail Menu", name: "Detail_menu" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="col-md-6">
              <label className="form-label">{label}</label>
              <input
                type={type}
                name={name}
                value={formInput[name]}
                onChange={handleInputChange}
                className="form-control"
              />
              {errorMessages[name] && <small className="text-danger">{errorMessages[name]}</small>}
            </div>
          ))}

          <div className="col-md-6">
            <label className="form-label">Deskripsi</label>
            <textarea name="Deskripsi" value={formInput.Deskripsi} onChange={handleInputChange} className="form-control" />
            {errorMessages.Deskripsi && <small className="text-danger">{errorMessages.Deskripsi}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Fasilitas</label>
            <textarea name="Fasilitas" value={formInput.Fasilitas} onChange={handleInputChange} className="form-control" />
            {errorMessages.Fasilitas && <small className="text-danger">{errorMessages.Fasilitas}</small>}
          </div>

          {[
            { label: "Foto Cafe", name: "Foto_cafe" },
            { label: "Foto Menu", name: "Foto_menu" },
           
          ].map(({ label, name }) => (
            <div key={name} className="col-md-6">
              <label className="form-label">{label}</label>
              <input type="file" name={name} onChange={handleFileChange} className="form-control" />
              {errorMessages[name] && <small className="text-danger">{errorMessages[name]}</small>}
            </div>
          ))}

          <div className="col-md-6">
            <label className="form-label">Kategori Plafon</label>
            <select name="Kategori_plafon" value={formInput.Kategori_plafon} onChange={handleInputChange} className="form-control">
              <option value="">-- Pilih Kategori Plafon --</option>
              <option value="Rekomendasi">Rekomendasi</option>
              <option value="Non Rekomendasi">Non Rekomendasi</option>
            </select>
            {errorMessages.Kategori_plafon && <small className="text-danger">{errorMessages.Kategori_plafon}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Kategori</label>
            <select name="Kategori" value={formInput.Kategori} onChange={handleInputChange} className="form-control">
              <option value="">-- Pilih Kategori --</option>
              <option value="Cafe">Cafe</option>
              <option value="Resto">Resto</option>
            </select>
            {errorMessages.Kategori && <small className="text-danger">{errorMessages.Kategori}</small>}
          </div>

          <div className="col-12 d-flex align-items-center gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Menyimpan..." : "Tambah"}
            </button>
            <a href="/data/cafe" className="btn btn-secondary">Kembali</a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TambahDataCafe;
