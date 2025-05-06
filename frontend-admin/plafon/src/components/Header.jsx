import { FiMenu } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";

const Header = ({ onToggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-black text-white shadow-md px-4 py-2 h-14 flex items-center">
      {/* Kiri: Menu & Logo */}
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="text-sm">
          <FiMenu />
        </button>
        <img
          src="/images/logo.png"
          alt="LogoAdmin"
          style={{ width: "70px", height: "auto" }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Kanan: Logout */}
      <button onClick={handleLogout} className="text-xl hover:text-red-500">
        <HiOutlineLogout />
      </button>
    </header>
  );
};

export default Header;
