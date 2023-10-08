import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="md:w-1/4 min-w-fit">
      <div className="bg-gray-800 text-white min-w-fit">
        <div className="text-center md:text-left py-4 px-4 md:px-6 min-w-fit">
          <h4 className="text-xl font-semibold min-w-fit">Admin Panel</h4>
        </div>
        <div className="md:hidden text-right px-4 py-2">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:block md:h-auto md:overflow-y-visible md:bg-gray-800`}
        >
          <ul className="md:text-left list-none">
            <li>
              <NavLink
                to="/admin-panel/create-category"
                className="block py-2 px-4 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-panel/create-product"
                className="block py-2 px-4 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-panel/products"
                className="block py-2 px-4 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-panel/orders"
                className="block py-2 px-4 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-panel/users"
                className="block py-2 px-4 hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
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
