import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import { useSearch } from "../../context/Search";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const [cart] = useCart();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 sticky top-0 py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white">
          Artisans of <span className="block">Telangana</span>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <form
            className="flex items-center bg-gray-100 rounded-full shadow-md"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="w-48 sm:w-64 px-4 py-2 text-gray-700 bg-transparent rounded-l-full focus:outline-none placeholder-gray-500"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={values.keyword}
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
            <button
              className="px-4 py-2 bg-yellow-700 text-white font-semibold hover:bg-yellow-800 rounded-r-full transition-all duration-200 ease-in-out focus:outline-none"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Home Button */}
          <Link
            to="/"
            className="text-white font-semibold text-lg flex items-center space-x-2 hover:text-yellow-100 transition-all duration-200 ease-in-out"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.75rem",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            Home
          </Link>

          {/* Buy Now Button */}
          <span
            className="cursor-pointer bg-gray-100 bg-opacity-90 text-orange-800 font-semibold rounded-full px-6 py-2 shadow-md hover:bg-opacity-100 hover:text-orange-900 transition-all duration-200 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              navigate("/shop");
            }}
          >
            Buy Now!
          </span>

          {/* Auth Links */}
          {!auth.user ? (
            <div className="flex items-center space-x-4">
              <span
                className="text-white font-semibold text-lg flex items-center space-x-2 hover:text-yellow-100 transition-all duration-200 ease-in-out cursor-pointer"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Register / Login
              </span>
            </div>
          ) : (
            <div className="relative group" onBlur={() => setIsProfileOpen(false)}>
              <span
                className="text-white font-semibold text-lg flex items-center space-x-2 hover:text-yellow-100 transition-all duration-200 ease-in-out cursor-pointer"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
                onClick={toggleProfile}
              >
                {auth?.user.name}
              </span>
              {isProfileOpen && (
                <ul className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg text-gray-800 py-2">
                  <li>
                    <NavLink
                      to={`/dashboard/user`}
                      className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Enlarged Cart Icon with Badge on Top-Left */}
          <div className="relative flex items-center">
            <Badge
              count={cart.length}
              className="absolute -top-2 -left-2 bg-white text-gray-800 rounded-full p-1 shadow-md"
              style={{
                fontSize: "0.8rem", // Adjust badge font size if needed
              }}
            />
            <NavLink
              to="/cart"
              className="text-white font-semibold text-lg hover:text-yellow-100 transition-all duration-200 ease-in-out flex items-center space-x-2"
              style={{
                fontSize: "1.25rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.75rem",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              Cart
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
