import React from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import Layout from './../../components/Layout/Layout';
import AdminLayout from '../../components/Layout/AdminLayout';

function AdminDashboard() {
  let [auth, setAuth] = useAuth();

  return (
    <AdminLayout>
      <div className="container mx-auto mt-3 p-3">
        <div className="md:flex">
          {/* Admin Menu */}
          <div className="md:w-1/4">
            <AdminMenu />
          </div>
          
          {/* Admin Info */}
          <div className="md:w-3/4 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold mb-6">Admin Information</h2>
              <div className="mb-4">
                <strong className="text-lg">Admin Name:</strong> {auth?.user.name}
              </div>
              <div className="mb-4">
                <strong className="text-lg">Admin Email:</strong> {auth?.user.email}
              </div>
              <div className="mb-4">
                <strong className="text-lg">Admin Contact:</strong> {auth?.user.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
