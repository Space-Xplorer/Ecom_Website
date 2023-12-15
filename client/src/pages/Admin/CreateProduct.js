import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/Layout/AdminLayout';

const { Option } = Select;

function CreateProduct() {
  const Navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/categories`);

      if (data?.success) {
        setCategories(data?.categories);
      }
      else{
        console.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      console.error('Something went wrong while getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);
      productData.append('photo', photo);
      productData.append('category', category);
      productData.append('shipping', shipping);
      const { data } = await axios.post('/api/v1/product/create-product', productData);

      if (data?.success) {
        console.success(data?.message);
      } else {
        console.success(data?.message);
        Navigate('/dashboard/admin/products');
      }
    } catch (error) {
      console.log(error);
      console.error('Something went wrong');
    }
  };

  return (
    <AdminLayout title={'Dashboard-create-product'}>
      <div className="container mx-auto mt-3 p-3">
        <div className="md:flex">
          {/* Admin Menu */}
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          {/* Create Product Form */}
          <div className="md:w-3/4">
            <h1 className="text-2xl font-semibold">Create Product</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="w-full mb-4 px-3 py-2 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((Obj) => {
                  return (
                    <Option key={Obj._id} value={Obj._id}>
                      {Obj.name}
                    </Option>
                  );
                })}
              </Select>

              {/* Photo Upload */}
              <div className="mb-4">
                <label className="w-full h-48 flex items-center justify-center text-gray-400 border-dashed border-2 rounded-lg cursor-pointer hover:bg-gray-100">
                  {photo ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                  />
                </label>
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    className="mt-2 mx-auto max-h-48"
                  />
                )}
              </div>

              {/* Name */}
              <input
                type="text"
                value={name}
                placeholder="Enter a Name"
                className="w-full mb-4 px-3 py-2 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                onChange={(e) => setName(e.target.value)}
              />

              {/* Description */}
              <textarea
                type="text"
                value={description}
                placeholder="Enter a Description"
                className="w-full mb-4 px-3 py-2 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200 resize-none"
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Quantity */}
              <input
                type="number"
                value={quantity}
                placeholder="Enter Quantity"
                className="w-full mb-4 px-3 py-2 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* Price */}
              <input
                type="number"
                value={price}
                placeholder="Enter a Price"
                className="w-full mb-4 px-3 py-2 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* Shipping */}
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="w-full mb-4 px-3 py-2 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-200"
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateProduct;
