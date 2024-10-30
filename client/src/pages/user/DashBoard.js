import React from 'react';
import Layout from './../../components/Layout/Layout';
import UserMenu from './../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

function Dashboard() {
  const [auth] = useAuth();

  return (
    <Layout title={'Dashboard - Ecommerce'}>
      <div className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="md:flex gap-8">
          
          {/* User Menu (Sidebar) */}
          <div className="md:w-1/4 bg-gradient-to-b from-amber-500 to-orange-600 text-white rounded-lg shadow-lg p-6">
            <UserMenu />
          </div>

          {/* User Info Section */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-orange-500 transition-transform duration-300 transform">
              <h2 className="text-4xl font-semibold text-orange-600 mb-6 flex items-center">
                <FaUser className="mr-2" /> User Information
              </h2>
              
              {/* User Information Details */}
              <div className="space-y-6">
                
                {/* Name Section */}
                <div className="flex items-center p-5 bg-orange-50 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <FaUser className="text-orange-400 text-3xl mr-4" />
                  <div>
                    <p className="text-xl font-semibold text-gray-700">User Name</p>
                    <p className="text-gray-800">{auth?.user?.name}</p>
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex items-center p-5 bg-orange-50 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <FaEnvelope className="text-orange-400 text-3xl mr-4" />
                  <div>
                    <p className="text-xl font-semibold text-gray-700">User Email</p>
                    <p className="text-gray-800">{auth?.user?.email}</p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="flex items-center p-5 bg-orange-50 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <FaPhone className="text-orange-400 text-3xl mr-4" />
                  <div>
                    <p className="text-xl font-semibold text-gray-700">User Contact</p>
                    <p className="text-gray-800">{auth?.user?.phone}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
