import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        
        localStorage.setItem('auth', JSON.stringify(res.data));
        if(res.data.user.role === 1) navigate('/admin-panel');
        else navigate(location.state || "/");
      } else {
        toast.error("Email or password is incorrect. Please try again");
      }
    } catch (error) {
      console.log(error);
      console.error("Something Went Wrong");
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <ToastContainer
      position="top-center"
      autoClose={3000}
      closeOnClick
      pauseOnHover
      draggable
      limit={1}                 
      style={{ width: "450px", fontSize: "1rem" }}  />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-700">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-6">
            Sign in to continue and explore our exclusive products.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition duration-200"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition duration-200"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
              >
                Login
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <Link to="/forgot-password" className="text-indigo-600 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div
              className="text-center text-indigo-600 text-sm underline hover:cursor-pointer mt-4"
              onClick={() => navigate('/register')}
            >
              New here? Register Now
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
