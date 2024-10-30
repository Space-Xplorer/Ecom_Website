import React, { useEffect, useState } from 'react';
import AdminMenu from './../../components/Layout/AdminMenu';
import AdminLayout from '../../components/Layout/AdminLayout';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState('');

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected.slug}`, { name: updateName });
      if (data.success) {
        setSelected(null);
        setUpdateName('');
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete category
  const handleDelete = async (pslug) => {
    try {
      await axios.delete(`/api/v1/category/delete-category/${pslug}`);
      getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/category/create-category', { name });
      setName("");
      getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/categories`);
      setCategories(data?.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <AdminLayout title={'Dashboard - Create Category'}>
      <div className="container mx-auto p-6">
        <div className="md:flex gap-6">
          
          {/* Admin Menu */}
          <div className="md:w-1/4 bg-gradient-to-b from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-6 h-full min-h-full">
            <AdminMenu />
          </div>

          {/* Category Management Section */}
          <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
            <h1 className="text-4xl font-semibold text-orange-500 mb-8">Manage Categories</h1>
            
            {/* Category Form */}
            <div className="bg-orange-50 p-4 rounded-lg shadow-md mb-8">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            
            {/* Categories Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full border border-gray-200 text-left rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-orange-400 text-white">
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((Obj, ind) => (
                    <tr key={ind} className="hover:bg-orange-100">
                      <td className="border-t border-orange-300 px-4 py-3">{Obj.name}</td>
                      <td className="border-t border-orange-300 px-4 py-3">
                        <button
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-1 mr-2 transition duration-200"
                          onClick={() => {
                            setVisible(true);
                            setUpdateName(Obj.name);
                            setSelected(Obj);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1 transition duration-200"
                          onClick={() => handleDelete(Obj.slug)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Update Category Modal */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
              title="Update Category"
              className="rounded-lg shadow-lg"
            >
              <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateCategory;
