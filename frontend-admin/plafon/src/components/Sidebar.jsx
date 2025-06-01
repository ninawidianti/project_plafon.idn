import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

function Sidebar({ isOpen = true, onToggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
    },
    {
      path: "/datacafe",
      label: "Data Cafe",
    },
    {
      path: "/datauser",
      label: "Data User",
    },
  ];

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column p-3 shadow"
      style={{
        width: isOpen ? "260px" : "0",
        overflow: "hidden",
        transition: "width 0.3s",
        backgroundColor: "black",
        position: "fixed",
        height: "100vh",
    zIndex: 40, //
      }}
    >
      {/* Sidebar Header with Menu Icon */}
      <div className="d-flex align-items-center mb-3">
        <button
          onClick={onToggleSidebar}
          className="text-white text-xl"
          title="Toggle Sidebar"
          style={{ cursor: "pointer", zIndex: 10, background: "transparent", border: "none" }}
          type="button"
        >
          <FiMenu />
        </button>
        
      </div>

      <nav className="flex-grow-1">
        <ul className="nav flex-column gap-2">
          {menuItems.map(({ path, label }) => (
            <li key={label}>
              <button
                className={`btn w-100 text-start d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  location.pathname === path
                    ? "text-white"
                    : "btn-outline-light text-white"
                }`}
                style={{
                  backgroundColor: location.pathname === path ? "#1BFCB6" : "",
                }}
                onClick={() => navigate(path)}
                type="button"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;

