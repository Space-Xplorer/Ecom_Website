import React, { useState, useEffect } from 'react';
import UserMenu from './../../components/Layout/UserMenu';
import Layout from './../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Load user data on component mount
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/update-user`, { name, email, password, phone, address });
      if (data?.error) {
        console.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
      }
    } catch (error) {
      console.log(error);
      console.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={'Dashboard - Profile'}>
      <div className="container mx-auto p-6 min-h-screen bg-gray-100">
        <div className="md:flex gap-8">
          
          {/* User Menu (Sidebar) */}
          <div className="md:w-1/4 bg-gradient-to-b from-amber-500 to-orange-600 text-white rounded-lg shadow-lg p-6">
            <UserMenu />
          </div>

          {/* Profile Form */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-orange-600 mb-6">
                User Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition duration-200"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition duration-200"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition duration-200"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition duration-200"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-200"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
