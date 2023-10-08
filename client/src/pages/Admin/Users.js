import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import axios from 'axios';
import moment from 'moment';
import AdminLayout from '../../components/Layout/AdminLayout';

function Users() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/users");
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <AdminLayout title="All Users">
      <div className="container mx-auto py-6">
        <div className="md:flex">
          {/* Admin Menu */}
          <div className="md:w-1/4">
            <AdminMenu />
          </div>
          {/* User List */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h1 className="text-2xl font-semibold mb-6">All Users</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">E-mail</th>
                      <th className="px-4 py-2">Phone</th>
                      <th className="px-4 py-2">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2 text-center">{user.name}</td>
                        <td className="px-4 py-2 text-center">{user.email}</td>
                        <td className="px-4 py-2 text-center">{user.phone}</td>
                        <td className="px-4 py-2 text-center">{moment(user?.createdAt).format('MMMM D, YYYY')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Users;
