import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DataCafe from "./pages/DataCafe";
import DataUser from "./pages/DataUser";
import TambahDataCafe from "./pages/TambahDataCafe";
import EditDataCafe from "./pages/EditDataCafe";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        {/* Routing untuk login dan register */}
        <Route path="/login" element={<Login />} />
        
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
          <Route path="/editcafe/:id" element={<EditDataCafe />} />
        </Route>

        {/* Redirect ke dashboard jika tidak ada route yang cocok */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
