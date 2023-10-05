import React from 'react';
import Layout from './../../components/Layout/Layout';
import UserMenu from './../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

function Dashboard() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={'Dashboard - Ecommerce'}>
      <div className="container mx-auto p-4 md:p-8">
        <div className="md:flex">
          {/* User Menu (Sidebar) */}
          <div className="md:w-1/4">
            <UserMenu />
          </div>

          {/* User Info */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-3xl font-semibold mb-6">User Information</h2>
              <div className="mb-4">
                <strong className="text-xl">User Name:</strong> {auth?.user?.name}
              </div>
              <div className="mb-4">
                <strong className="text-xl">User Email:</strong> {auth?.user?.email}
              </div>
              <div className="mb-4">
                <strong className="text-xl">User Contact:</strong> {auth?.user?.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
