import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DataCafe = () => {
  const navigate = useNavigate();
  const [dataCafe, setDataCafe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseCafe = await fetch("http://localhost:5000/api/cafes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!responseCafe.ok) throw new Error("Gagal mengambil data cafe");
        const jsonDataCafe = await responseCafe.json();
        setDataCafe(jsonDataCafe);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Gagal mengambil data cafe: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data cafe ini?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/cafes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Gagal menghapus data");
      setDataCafe((prev) => prev.filter((cafe) => cafe.id !== id));
      alert("Data cafe berhasil dihapus!");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };
  const filteredCafe = dataCafe.filter((cafe) =>
    [cafe.name, cafe.alamat].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const paginatedCafe = filteredCafe.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCafe.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (

    <div className="d-flex h-screen">
      <div className="flex-grow-1 bg-light min-vh-100 p-4">
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
          <h2 className="flex-grow-1 text-center mb-0">Data Cafe</h2>
          <div style={{ width: "40px" }}></div>
        </div>

        {/* Tambah Data Cafe dan Search */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link
            to="/datacafe/tambah"
            className="btn"
            style={{ backgroundColor: "#1BFCB6", color: "black", border: "none" }}
          >
            + Data Cafe
          </Link>
          <input
            type="text"
            className="form-control w-auto"
            style={{ minWidth: "250px" }}
            placeholder="Cari nama atau alamat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table Data */}
        <div className="card">
          <div className="card-body">
            {loading ? (
              <p>Memuat data cafe...</p>
            ) : (
              <>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#1BFCB6" }}>No</th>
                      <th style={{ backgroundColor: "#1BFCB6" }}>Nama Cafe</th>
                      <th style={{ backgroundColor: "#1BFCB6" }}>Alamat</th>
                      <th style={{ backgroundColor: "#1BFCB6" }}>Jam Operasional</th>
                      <th style={{ backgroundColor: "#1BFCB6" }}>Rating</th>
                      <th style={{ backgroundColor: "#1BFCB6" }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCafe.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Tidak ada data ditemukan
                        </td>
                      </tr>
                    ) : (
                      paginatedCafe.map((cafe, index) => (
                        <tr key={cafe.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{cafe.name}</td>
                          <td title={cafe.alamat}>
                            {cafe.alamat.length > 40
                              ? cafe.alamat.slice(0, 40) + "..."
                              : cafe.alamat}
                          </td>
                          <td>{cafe.J_Operasional}</td>
                          <td>{cafe.rating}</td>
                          <td>
                            <Link
                              to={`/editcafe/${cafe.id}`}
                              className="btn btn-warning btn-sm me-2"
                            >
                              Detail
                            </Link>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(cafe.id)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="d-flex justify-content-start mt-3">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          style={{ backgroundColor: "", border: "none", color: "black" }}
                          disabled={currentPage === 1}
                        >
                          &lt;
                        </button>
                      </li>
                      {pageNumbers.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${currentPage === number ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(number)}
                            style={{
                              backgroundColor: currentPage === number ? "#1BFCB6" : "",
                              border: "none",
                              color: "black",
                            }}
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          style={{ backgroundColor: "", border: "none", color: "black" }}
                          disabled={currentPage === totalPages}
                        >
                          &gt;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCafe;