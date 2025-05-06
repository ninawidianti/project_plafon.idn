import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const DataUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/"); // Pastikan URL ini konsisten
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

  const handleEdit = (user) => {
    setIsEditing(user.id);
    setEditedData({ ...user });
  };

  const handleSave = async (id) => {
    if (!id) {
      alert("ID tidak valid.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) throw new Error("Gagal memperbarui data");

      await fetchData();
      setIsEditing(null);
      alert("Data berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Gagal menghapus data");

      setDataUser((prev) => prev.filter((user) => user.id !== id));
      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  const filteredUser = dataUser.filter((user) =>
    [user.namauser, user.email, user.role]
      .filter(Boolean)
      .some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten utama */}
      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <h2 className="mb-4 text-center">Data User</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
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
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUser.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{index + 1}</td>
                    <td>
                      {isEditing === user.id ? (
                        <input
                          type="text"
                          value={editedData.namauser || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              namauser: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.namauser
                      )}
                    </td>
                    <td>
                      {isEditing === user.id ? (
                        <input
                          type="email"
                          value={editedData.email || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {isEditing === user.id ? (
                        <input
                          type="text"
                          value={editedData.role || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              role: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.role
                      )}
                    </td>
                    <td>
                      {isEditing === user.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleSave(user.id)}
                          >
                            Simpan
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setIsEditing(null)}
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredUser.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
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
