import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import { useSearch } from "../../context/Search";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsCategoriesOpen(false);
  };

  const closeDropdowns = () => {
    setIsCategoriesOpen(false);
    setIsProfileOpen(false);
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

  const categories = useCategory();
  const [cart] = useCart();
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
        <Link to="/" className="text-2xl font-bold text-brown flex">
          Artisans of <br/> Telangana
        </Link>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <form
              className="flex items-center"
              role="search"
              onSubmit={handleSubmit}
            >
              <input
                className="w-48 sm:w-64 px-4 py-2 bg-white border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 ml-2 rounded-full focus:outline-none"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          
          {window.location.pathname === '/' && 
            <div className="flex items-center space-x-4">
              <span
                className="cursor-pointer bg-amber-400 backdrop-filter backdrop-blur-3xl rounded-2xl bg-opacity-50 p-3"
                onClick={(e)=>{e.preventDefault();navigate('/shop')}}
              >
                Buy Now!!
              </span>
            </div>}
          
          {!auth.user ? (
            <div className="flex items-center space-x-4">
              <span
                className="text-brown cursor-pointer hover:underline p-3"
                onClick={(e)=>{e.preventDefault();navigate('/login')}}
              >
                Register / Login
              </span>
            </div>
          ) : (
            <div className="relative group" onBlur={closeDropdowns}>
              <span
                className="text-brown cursor-pointer hover:underline"
                onClick={toggleProfile}
              >
                {auth?.user.name}
              </span>
              {isProfileOpen && (
                <ul className="absolute mt-2 space-y-2 bg-white border border-gray-200 rounded-lg py-2">
                  <li>
                    <NavLink
                      to={`/dashboard/user`}
                      className="hover:underline p-3"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="hover:underline p-3"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          )}
          <Badge count={cart.length} className="cursor-pointer">
            <NavLink to="/cart" className="text-brown hover:underline">
              Cart
            </NavLink>
          </Badge>
        </div>
        <button className="md:hidden">
        </button>
      </div>
    </nav>
  );
}

export default Header;

