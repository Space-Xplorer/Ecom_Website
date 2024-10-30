import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        navigate("/login");
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Something Went Wrong");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
            Create an Account
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Join us today to access exclusive products and offers.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition duration-200"
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>
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
            <div className="mb-5">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition duration-200"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition duration-200"
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition duration-200"
                placeholder="Enter Your Address"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition duration-200"
                placeholder="What is Your Favorite Sport?"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
