import React, { useEffect, useState } from 'react';
import AdminMenu from './../../components/Layout/AdminMenu';
import AdminLayout from '../../components/Layout/AdminLayout';
import axios from 'axios';
import moment from 'moment';

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
        <div className="md:flex gap-6">
          
          {/* Admin Menu with Purple-Gradient Background */}
          <div className="md:w-1/4 bg-gradient-to-b from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-6 transition duration-300">
            <AdminMenu />
          </div>

          {/* User List */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
              <h1 className="text-3xl font-semibold text-orange-600 mb-6 text-center">All Users</h1>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100 rounded-lg shadow-md">
                  <thead className="bg-indigo-100 text-indigo-800 border-b-2 border-indigo-300">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">#</th>
                      <th className="px-6 py-3 text-left font-semibold">Name</th>
                      <th className="px-6 py-3 text-left font-semibold">Email</th>
                      <th className="px-6 py-3 text-left font-semibold">Phone</th>
                      <th className="px-6 py-3 text-left font-semibold">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                        <td className="px-6 py-4 text-gray-700 text-center font-semibold">{index + 1}</td>
                        <td className="px-6 py-4 text-gray-700">{user.name}</td>
                        <td className="px-6 py-4 text-gray-700">{user.email}</td>
                        <td className="px-6 py-4 text-gray-700">{user.phone}</td>
                        <td className="px-6 py-4 text-gray-700">
                          {moment(user.createdAt).format('MMMM D, YYYY')}
                        </td>
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
