import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditDataCafe = () => {
  const { id } = useParams();
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

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/cafes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Gagal mengambil data cafe");
        const data = await res.json();
        setFormInput((prev) => ({
          ...prev,
          ...data,
          foto_cafe: null,
          foto_menu: null,
        }));
      } catch (error) {
        alert("Gagal mengambil data cafe.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files);
    setFormInput((prev) => ({
      ...prev,
      [name]: name === "foto_cafe" ? fileArray : files[0],
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "name", "J_Operasional", "deskripsi", "detail_menu", "kategori",
      "kategori_plafon_idn", "alamat", "rating", "fasilitas",
      "maps", "instagram", "whatsapp",
    ];
    const errors = {};
    requiredFields.forEach((field) => {
      const value = formInput[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[field] = `${field.replace(/_/g, " ").toUpperCase()} tidak boleh kosong.`;
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

      for (const key in formInput) {
        const value = formInput[key];
        if (value !== null && value !== "") {
          if (key === "foto_cafe" && Array.isArray(value)) {
            value.forEach((file) => {
              formData.append("foto_cafe", file);
            });
          } else if (key === "foto_menu") {
            formData.append("foto_menu", value);
          } else if (key !== "foto_cafe") {
            formData.append(key, value);
          }
        }
      }

      // Debug isi formData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const res = await fetch(`http://localhost:5000/api/cafes/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("RESPON ERROR DARI BACKEND:", result);
        throw new Error(result.message || "Update gagal. Periksa kembali input atau server.");
      }

      alert("Data cafe berhasil diperbarui!");
      navigate("/datacafe");
    } catch (err) {
      let errorMsg = "Terjadi kesalahan saat update.";
      if (err instanceof Error) {
        errorMsg += `\nPesan: ${err.message}`;
      }
      alert(errorMsg);
      console.error("DETAIL ERROR SAAT UPDATE:", err);
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
              backgroundColor: "#1BFCB6", border: "none", color: "black",
              padding: "8px 12px", borderRadius: "5px", cursor: "pointer", fontSize: "18px"
            }}
          >
            <FaArrowLeft />
          </button>
          <h2 className="flex-grow-1 text-center mb-0">Edit Data Cafe</h2>
          <div style={{ width: "40px" }}></div>
        </div>

        <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
          {[
            { label: "Nama Cafe", name: "name" },
            { label: "Jam Operasional", name: "J_Operasional" },
            { label: "Alamat", name: "alamat" },
            { label: "Rating", name: "rating", type: "number" },
            { label: "Link Maps", name: "maps" },
            { label: "Link Instagram", name: "instagram" },
            { label: "Link WhatsApp", name: "whatsapp" },
            { label: "Detail Menu", name: "detail_menu" },
            { label: "Harga", name: "harga" },
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

          {[{ label: "Deskripsi", name: "deskripsi" }, { label: "Fasilitas", name: "fasilitas" }].map(({ label, name }) => (
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

          <div className="col-md-6">
            <label className="form-label">Foto Cafe (bisa pilih banyak)</label>
            <input
              type="file"
              name="foto_cafe"
              multiple
              onChange={handleFileChange}
              className="form-control"
              accept="image/*"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Foto Menu (satu file)</label>
            <input
              type="file"
              name="foto_menu"
              onChange={handleFileChange}
              className="form-control"
              accept="image/*"
            />
          </div>

          {[
            { label: "Kategori Plafon", name: "kategori_plafon_idn", options: ["Rekomendasi", "Non Rekomendasi"] },
            { label: "Kategori", name: "kategori", options: ["Cafe", "Resto"] },
          ].map(({ label, name, options }) => (
            <div key={name} className="col-md-6">
              <label className="form-label">{label}</label>
              <select
                name={name}
                value={formInput[name]}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">-- Pilih {label} --</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errorMessages[name] && <small className="text-danger">{errorMessages[name]}</small>}
            </div>
          ))}

          <div className="col-12">
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

export default EditDataCafe;
