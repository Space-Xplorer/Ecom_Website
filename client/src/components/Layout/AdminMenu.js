import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaList,
  FaPlusCircle,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaTachometerAlt,
} from 'react-icons/fa';

function AdminMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="md:w-1/4 min-w-fit">
      <div className="bg-gradient-to-b from-orange-500 to-yellow-600 text-white rounded-lg shadow-xl overflow-hidden">
        {/* Admin Panel Title */}
        <div className="text-center md:text-left py-6 px-4 md:px-6 border-b-4 border-yellow-400">
          <h4 className="text-3xl font-bold text-yellow-200">Admin Panel</h4>
        </div>

        {/* Menu Toggle Button for Small Screens */}
        <div className="md:hidden text-right px-4 py-2">
          <button
            className="text-yellow-200 font-semibold focus:outline-none hover:text-yellow-300"
            onClick={toggleMenu}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="text-left list-none space-y-2">
            {/* Dashboard Link */}
            <li>
              <NavLink
                to="/admin-panel"
                className="flex items-center gap-2 py-3 px-6 text-lg hover:bg-yellow-500 hover:text-yellow-900 transition-all duration-200 rounded-md"
                activeClassName="bg-yellow-300 text-orange-800 font-semibold shadow-md"
              >
                <FaTachometerAlt className="text-xl" />
                Dashboard
              </NavLink>
            </li>
            {/* Create Category Link */}
            <li>
              <NavLink
                to="/admin-panel/create-category"
                className="flex items-center gap-2 py-3 px-6 text-lg hover:bg-yellow-500 hover:text-yellow-900 transition-all duration-200 rounded-md"
                activeClassName="bg-yellow-300 text-orange-800 font-semibold shadow-md"
              >
                <FaPlusCircle className="text-xl" />
                Create Category
              </NavLink>
            </li>
            {/* Create Product Link */}
            <li>
              <NavLink
                to="/admin-panel/create-product"
                className="flex items-center gap-2 py-3 px-6 text-lg hover:bg-yellow-500 hover:text-yellow-900 transition-all duration-200 rounded-md"
                activeClassName="bg-yellow-300 text-orange-800 font-semibold shadow-md"
              >
                <FaBoxOpen className="text-xl" />
                Create Product
              </NavLink>
            </li>
            {/* Products Link */}
            <li>
              <NavLink
                to="/admin-panel/products"
                className="flex items-center gap-2 py-3 px-6 text-lg hover:bg-yellow-500 hover:text-yellow-900 transition-all duration-200 rounded-md"
                activeClassName="bg-yellow-300 text-orange-800 font-semibold shadow-md"
              >
                <FaList className="text-xl" />
                Products
              </NavLink>
            </li>
            {/* Orders Link */}
            <li>
              <NavLink
                to="/admin-panel/orders"
                className="flex items-center gap-2 py-3 px-6 text-lg hover:bg-yellow-500 hover:text-yellow-900 transition-all duration-200 rounded-md"
                activeClassName="bg-yellow-300 text-orange-800 font-semibold shadow-md"
              >
                <FaShoppingCart className="text-xl" />
                Orders
              </NavLink>
            </li>
            {/* Users Link */}
            <li>
              <NavLink
                to="/admin-panel/users"
                className="flex items-center gap-2 py-3 px-6 text-lg hover:bg-yellow-500 hover:text-yellow-900 transition-all duration-200 rounded-md"
                activeClassName="bg-yellow-300 text-orange-800 font-semibold shadow-md"
              >
                <FaUsers className="text-xl" />
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminMenu;
