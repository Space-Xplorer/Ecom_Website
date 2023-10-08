import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import { useSearch } from "../../context/Search";
import axios from "axios";

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
    toast.success("Logout Successful");
  };

  return (
    <nav className=" py-4 bg-stone-200 sticky top-0 backdrop-blur-2xl backdrop-filter bg-opacity-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin-panel" className="text-2xl font-bold text-brown flex">
          Artisans of <br/> Telangana
        </Link>
        <div className="flex items-center space-x-6">
          
          <span className=" font-extrabold text-xl">Admin <br /> Panel</span>
          <ul className="mt-2 space-y-2 rounded-lg py-2">
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="p-3 hover:bg-slate-300 rounded-xl"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;

