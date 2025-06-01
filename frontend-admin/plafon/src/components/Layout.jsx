import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

      {/* Main content */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: sidebarOpen ? "260px" : "0", transition: "margin-left 0.3s" }}
      >
        {/* Header */}
        <Header onToggleSidebar={handleToggleSidebar} />

        {/* Main section */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
