import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const TambahDataCafe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const [formInput, setFormInput] = useState({
    name: "",
    J_Operasional: "",
    deskripsi: "",
    foto_cafe: null,
    foto_menu: null,
    detail_menu: "",
    kategori: "",
    kategori_plafon_idn: "",
    alamat: "",
    rating: "",
    fasilitas: "",
    maps: "",
    instagram: "",
    whatsapp: "",
    harga: "",
  });

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
      "name",
      "J_Operasional",
      "deskripsi",
      "foto_cafe",
      "foto_menu",
      "detail_menu",
      "kategori",
      "kategori_plafon_idn",
      "alamat",
      "rating",
      "fasilitas",
      "maps",
      "instagram",
      "whatsapp",
      "harga",
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
        if (value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      const response = await fetch("http://localhost:5000/api/cafes", {
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
      setFormInput({
        name: "",
        J_Operasional: "",
        deskripsi: "",
        foto_cafe: null,
        foto_menu: null,
        detail_menu: "",
        kategori: "",
        kategori_plafon_idn: "",
        alamat: "",
        rating: "",
        fasilitas: "",
        maps: "",
        instagram: "",
        whatsapp: "",
        harga: "",
      });
      navigate("/data/cafe");
    } catch (err) {
      console.error("Error saat submit:", err);
      alert("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      
      <main className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
                      className="back-button"
                      onClick={() => navigate(-1)}
                      style={{
                        backgroundColor: "#1BFCB6",
                        border: "none",
                        color: "black",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      <FaArrowLeft />
                    </button>
          <h2 className="flex-grow-1 text-center mb-0">Tambah Data Cafe</h2>
          <div style={{ width: "40px" }}></div>
        </div>
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Input Text */}
          {[
            { label: "Nama Cafe", name: "name" },
            { label: "Jam Operasional", name: "J_Operasional" },
            { label: "Alamat", name: "alamat" },
            { label: "Rating", name: "rating", type: "number" },
            { label: "Link Maps", name: "maps" },
            { label: "Link Instagram", name: "instagram" },
            { label: "Link WhatsApp", name: "whatsapp" },
            { label: "Detail Menu", name: "detail_menu" },
            { label: "Harga", name: "harga", type: "number" },
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

          {/* Textarea */}
          {[
            { label: "Deskripsi", name: "deskripsi" },
            { label: "Fasilitas", name: "fasilitas" },
          ].map(({ label, name }) => (
            <div key={name} className="col-md-6">
              <label className="form-label">{label}</label>
              <textarea
                name={name}
                value={formInput[name]}
                onChange={handleInputChange}
                className="form-control"
              />
              {errorMessages[name] && <small className="text-danger">{errorMessages[name]}</small>}
            </div>
          ))}

          {/* File Upload */}
          {[
            { label: "Foto Cafe", name: "foto_cafe" },
            { label: "Foto Menu", name: "foto_menu" },
          ].map(({ label, name }) => (
            <div key={name} className="col-md-6">
              <label className="form-label">{label}</label>
              <input type="file" name={name} onChange={handleFileChange} className="form-control" />
              {errorMessages[name] && <small className="text-danger">{errorMessages[name]}</small>}
            </div>
          ))}

          {/* Dropdown */}
          {[
            {
              label: "Kategori Plafon",
              name: "kategori_plafon_idn",
              options: ["Rekomendasi", "Non Rekomendasi"],
            },
            {
              label: "Kategori",
              name: "kategori",
              options: ["Cafe", "Resto"],
            },
          ].map(({ label, name, options }) => (
            <div key={name} className="col-md-6">
              <label className="form-label">{label}</label>
              <select name={name} value={formInput[name]} onChange={handleInputChange} className="form-control">
                <option value="">-- Pilih {label} --</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errorMessages[name] && <small className="text-danger">{errorMessages[name]}</small>}
            </div>
          ))}

          {/* Button */}
          <div className="col-12 d-flex align-items-center gap-2">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#1BFCB6", borderColor: "#1BFCB6", color: "#000" }}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>

          </div>
        </form>
      </main>
    </div>
  );
};

export default TambahDataCafe;
