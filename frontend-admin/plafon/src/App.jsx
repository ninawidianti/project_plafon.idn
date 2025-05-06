import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DataCafe from "./pages/DataCafe";
import DataUser from "./pages/DataUser";
import TambahDataCafe from "./pages/TambahDataCafe";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Semua halaman utama dibungkus dalam Layout */}
        <Route
          element={
            <Layout
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={toggleSidebar}
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/datacafe" element={<DataCafe />} />
          <Route path="/datauser" element={<DataUser />} />
          <Route path="/datacafe/tambah" element={<TambahDataCafe />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
