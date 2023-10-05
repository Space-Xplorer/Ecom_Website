import React, { useState, useEffect } from 'react';
import UserMenu from './../../components/Layout/UserMenu';
import Layout from './../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Get user data
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
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('User Updated Successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={'Dashboard-profile'}>
      <div className='container mx-auto p-4'>
        <div className='md:flex'>
          {/* User Menu (Sidebar) */}
          <div className='md:w-1/4'>
            <UserMenu />
          </div>

          {/* Profile Form */}
          <div className='md:w-3/4'>
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">USER PROFILE</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
                  UPDATE
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
