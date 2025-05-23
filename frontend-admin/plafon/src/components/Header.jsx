import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload();
    }
  };

  // Tambahkan style logout-icon secara langsung
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .logout-icon {
        font-size: 1.4rem;
        cursor: pointer;
        transition: color 0.3s ease;
        position: absolute;
        top: 0.8rem;
        right: 1rem;
      }

      .logout-icon:hover,
      .logout-icon:focus {
        color: #00ffb0;
        outline: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <header className="bg-black text-white shadow-md px-4 h-14 flex items-center relative">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-4">
        <img
          src="/images/logo.png"
          alt="LogoAdmin"
          style={{ width: "70px", height: "auto" }}
        />
      </div>

      {/* Sudut kanan: Logout */}
      <FaSignOutAlt
        className="logout-icon"
        title="Logout"
        onClick={handleLogout}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleLogout()}
      />
    </header>
  );
};

export default Header;
