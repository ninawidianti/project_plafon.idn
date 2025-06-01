import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa"; // import icon back
import { useNavigate } from "react-router-dom"; // import navigate

const DataUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate(); // letakkan di sini, di dalam komponen sebelum return

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setDataUser(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUser = dataUser.filter((user) =>
    [user.name, user.email, user.role]
      .filter(Boolean)
      .some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-4 bg-light min-vh-100">
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
          <h2 className="flex-grow-1 text-center mb-0">Data User</h2>
          <div style={{ width: "40px" }}></div> {/* Placeholder supaya judul tetap di tengah */}
        </div>

        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            className="form-control w-auto ml-auto"
            style={{ minWidth: "250px" }}
            placeholder="Cari"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#1BFCB6" }}>No</th>
                  <th style={{ backgroundColor: "#1BFCB6" }}>Nama User</th>
                  <th style={{ backgroundColor: "#1BFCB6" }}>Email</th>
                  <th style={{ backgroundColor: "#1BFCB6" }}>Role</th>
                </tr>
              </thead>

              <tbody>
                {filteredUser.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
                {filteredUser.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUser;
