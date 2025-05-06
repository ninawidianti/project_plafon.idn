import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DataCafe = () => {
  const [dataCafe, setDataCafe] = useState([]); // Menyimpan data cafe
  const [kategoriList, setKategoriList] = useState([]);  // Menyimpan kategori cafe
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseCafe = await fetch("http://localhost:5000/api/cafe", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseKategori = await fetch("http://localhost:5000/api/kategori/get");

        if (!responseCafe.ok || !responseKategori.ok) throw new Error("Failed to fetch data");

        const jsonDataCafe = await responseCafe.json();
        const jsonDataKategori = await responseKategori.json();

        setDataCafe(jsonDataCafe.data);
        setKategoriList(jsonDataKategori.data); // Menyimpan data kategori
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Gagal mengambil data cafe: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getNamaKategori = (id_kategori) => {
    const kategori = kategoriList.find((kategori) => kategori.id === id_kategori);
    return kategori ? kategori.nama_kategori : "Kategori tidak ditemukan";
  };

  const handleDelete = async (id_cafe) => {
    if (!window.confirm("Yakin ingin menghapus data cafe ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/cafe/delete/${id_cafe}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Gagal menghapus data");

      setDataCafe((prev) => prev.filter((cafe) => cafe.id_cafe !== id_cafe));
      alert("Data cafe berhasil dihapus!");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  const filteredCafe = dataCafe.filter((cafe) =>
    [cafe.namacafe, cafe.alamat].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="d-flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-grow-1 bg-light min-vh-100 p-4">
        <h2 className="mb-4 text-center">Data Cafe</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/datacafe/tambah" className="btn btn-primary">
            + Tambah Data Cafe
          </Link>
          <input
            type="text"
            className="form-control w-auto"
            style={{ minWidth: "250px" }}
            placeholder="Cari"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="card">
          <div className="card-body">
            {loading ? (
              <p>Memuat data cafe...</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Cafe</th>
                    <th>Alamat</th>
                    <th>Jam Operasional</th>
                    <th>Rating</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCafe.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Tidak ada data ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredCafe.map((cafe, index) => {
                      return (
                        <tr key={cafe.id_cafe}>
                          <td>{index + 1}</td>
                          <td>{cafe.namacafe}</td>
                          <td>{cafe.alamat}</td>
                          <td>{cafe.jam_operasional}</td>
                          <td>{cafe.rating}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(cafe.id_cafe)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCafe;
