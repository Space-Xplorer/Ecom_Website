import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

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
        console.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.error("Something Went Wrong");
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="flex justify-between mb-4">
              <button type="submit" className="w-2/5 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                LOGIN
              </button>
              <Link to="/forgot-password" className="w-2/5 text-center text-indigo-600 hover:underline">
                Forgot Password
              </Link>
            </div>
            <div className="text-indigo-600 underline hover:cursor-pointer" onClick={(e)=>{e.preventDefault();navigate('/register')}}>
              Aren't you already in? Register Now
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
