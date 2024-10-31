import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({}); // State to store validation errors
  const navigate = useNavigate();

  // Helper function to validate form fields
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    // Answer validation
    if (!answer.trim()) {
      newErrors.answer = "Answer is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors mean valid form
  };

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

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
        toast.error("User already exists.");
      }
    } catch (error) {
      console.error("Something Went Wrong");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <ToastContainer
      position="top-center"
      autoClose={3000}
      closeOnClick
      pauseOnHover
      draggable
      limit={1}                  // Show only one toast at a time
      style={{ width: "250px", fontSize: "1rem" }}  />
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
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
              {errors.answer && <p className="text-red-500 text-sm">{errors.answer}</p>}
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
