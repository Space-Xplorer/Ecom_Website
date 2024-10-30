import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

function AdminHeader() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-500 sticky top-0 py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        {/* Logo and Brand Name */}
        <Link to="/admin-panel" className="text-2xl font-bold text-white flex items-center">
          <span className="mr-1">Artisans of</span>
          <span className="text-yellow-200">Telangana</span>
        </Link>

        {/* Admin Panel Text and Logout Button */}
        <div className="flex items-center space-x-8">
          <span className="text-lg font-extrabold text-yellow-200 tracking-wider">Admin Panel</span>
          <NavLink
            onClick={handleLogout}
            to="/login"
            className="text-white px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300 font-semibold shadow-md"
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
