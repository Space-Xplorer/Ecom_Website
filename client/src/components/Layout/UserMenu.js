import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUser,
  FaShoppingCart,
  FaClipboardList,
} from 'react-icons/fa';

function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="md:w-1/4 min-w-fit">
      <div className="bg-gradient-to-b from-teal-500 to-blue-600 text-white rounded-lg shadow-xl overflow-hidden">
        
        {/* User Panel Title */}
        <div className="text-center md:text-left py-6 px-4 md:px-6 border-b-4 border-blue-400">
          <h4 className="text-3xl font-bold text-yellow-300">User Panel</h4>
        </div>

        {/* Menu Toggle Button for Small Screens */}
        <div className="md:hidden text-right px-4 py-2">
          <button
            className="text-yellow-300 font-semibold focus:outline-none hover:text-yellow-400"
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
                to="/dashboard/user"
                className="flex items-center gap-2 py-3 px-6 text-lg transition-all duration-200 rounded-md text-gray-800 hover:bg-gradient-to-r from-orange-400 to-yellow-500 hover:text-gray-900"
                activeClassName="bg-yellow-300 text-teal-800 font-semibold shadow-md"
              >
                <FaUser className="text-xl" />
                Dashboard
              </NavLink>
            </li>
            
            {/* Profile Link */}
            <li>
              <NavLink
                to="/dashboard/user/profile"
                className="flex items-center gap-2 py-3 px-6 text-lg transition-all duration-200 rounded-md text-gray-800 hover:bg-gradient-to-r from-orange-400 to-yellow-500 hover:text-gray-900"
                activeClassName="bg-yellow-300 text-teal-800 font-semibold shadow-md"
              >
                <FaUser className="text-xl" />
                Profile
              </NavLink>
            </li>

            {/* Orders Link */}
            <li>
              <NavLink
                to="/dashboard/user/orders"
                className="flex items-center gap-2 py-3 px-6 text-lg transition-all duration-200 rounded-md text-gray-800 hover:bg-gradient-to-r from-orange-400 to-yellow-500 hover:text-gray-900"
                activeClassName="bg-yellow-300 text-teal-800 font-semibold shadow-md"
              >
                <FaClipboardList className="text-xl" />
                Orders
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserMenu;
