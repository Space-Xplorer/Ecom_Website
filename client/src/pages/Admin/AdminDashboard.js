import React from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import AdminLayout from '../../components/Layout/AdminLayout';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <AdminLayout>
      <div className="container mx-auto mt-8 p-6">
        <div className="md:flex gap-8">
          
          {/* Admin Menu */}
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          {/* Admin Info Card */}
          <div className="md:w-3/4 p-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg p-8 border-t-4 border-orange-400 transition-transform transform  duration-300">
              <h2 className="text-4xl font-semibold mb-6 text-orange-500 flex items-center">
                <FaUser className="mr-2" /> Admin Information
              </h2>
              
              {/* Admin Details */}
              <div className="space-y-6">
                {/* Name Section */}
                <div className="flex items-center p-5 bg-white rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <FaUser className="text-orange-400 text-3xl mr-4" />
                  <div>
                    <p className="text-xl font-semibold text-gray-700">Admin Name</p>
                    <p className="text-gray-800">{auth?.user?.name}</p>
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex items-center p-5 bg-white rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <FaEnvelope className="text-orange-400 text-3xl mr-4" />
                  <div>
                    <p className="text-xl font-semibold text-gray-700">Admin Email</p>
                    <p className="text-gray-800">{auth?.user?.email}</p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="flex items-center p-5 bg-white rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <FaPhone className="text-orange-400 text-3xl mr-4" />
                  <div>
                    <p className="text-xl font-semibold text-gray-700">Admin Contact</p>
                    <p className="text-gray-800">{auth?.user?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
