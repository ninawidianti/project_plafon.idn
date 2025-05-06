import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-black text-white h-screen flex flex-col transition-all duration-300 shadow-md`}
    >
      {/* Toggle Sidebar Button */}
      

      {/* Navigation */}
      <nav className="flex flex-col mt-4 gap-4 px-4">
        <SidebarLink
          to="/datacafe"
          label="Cafe"
          active={location.pathname.includes("datacafe")}
          isOpen={isOpen}
        />
        <SidebarLink
          to="/datauser"
          label="User"
          active={location.pathname.includes("datauser")}
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
};

const SidebarLink = ({ to, label, active, isOpen }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center px-2 py-4 rounded transition-colors duration-200 ${
      active ? "bg-teal-500" : "hover:bg-gray-800"
    }`}
  >
    <span className={`${isOpen ? "block text-base" : "text-[10px]"}`}>
      {label}
    </span>
  </Link>
);

export default Sidebar;
