import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
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
        toast.success(data.message);
        setSelected(null);
        setUpdateName('');
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Delete category
  const handleDelete = async (pslug) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${pslug}`);
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataObj = await axios.post('/api/v1/category/create-category', { name });
      if (dataObj?.success) {
        toast.success(`${dataObj.category.name} is created`);
        getAllCategory();
      } else {
        toast.error(dataObj.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={'Dashboard-create-category'}>
      <div className='container mx-auto mt-3 p-3'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/4'>
            <AdminMenu />
          </div>
          <div className='w-full md:w-3/4'>
            <h1 className='text-2xl font-semibold'>Manage Category</h1>
            <div className='p-3 md:w-1/2'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className='w-full overflow-x-auto'>
              <table className='table-auto w-full border-collapse border border-gray-400'>
                <thead>
                  <tr className='bg-gray-200'>
                    <th className='px-4 py-2'>Name</th>
                    <th className='px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((Obj, ind) => (
                    <tr key={ind}>
                      <td className='border px-4 py-2'>{Obj.name}</td>
                      <td className='border px-4 py-2'>
                        <button
                          className='bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-1 mr-2'
                          onClick={() => {
                            setVisible(true);
                            setUpdateName(Obj.name);
                            setSelected(Obj);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className='bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1'
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
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
              <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
