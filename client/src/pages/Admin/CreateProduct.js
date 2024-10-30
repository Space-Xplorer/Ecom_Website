import React, { useState, useEffect } from 'react';
import AdminMenu from './../../components/Layout/AdminMenu';
import AdminLayout from '../../components/Layout/AdminLayout';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

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
        navigate('/dashboard/admin/products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title="Create Product">
      <div className="container mx-auto p-6">
        <div className="md:flex gap-6">
          
          {/* Admin Menu with Purple-Gradient Background */}
          <div className="md:w-1/4 bg-gradient-to-b from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-6 transition duration-300 transform hover:scale-102">
            <AdminMenu />
          </div>

          {/* Create Product Form */}
          <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-500">
            <h1 className="text-3xl font-semibold text-orange-600 mb-6">Create New Product</h1>
            <form onSubmit={handleCreate}>
              
              {/* Category Selection */}
              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select a Category"
                  size="large"
                  className="w-full px-4 py-2 bg-orange-50 border border-orange-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
                  onChange={(value) => setCategory(value)}
                >
                  {categories.map((cat) => (
                    <Option key={cat._id} value={cat._id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Photo Upload */}
              <div className="mb-4">
                <label className="w-full h-48 flex items-center justify-center bg-orange-50 border border-orange-300 border-dashed border-2 rounded-md cursor-pointer hover:bg-purple-100 transition">
                  {photo ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    className="mt-4 mx-auto max-h-48 rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* Input Fields */}
              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="w-full mb-4 px-4 py-2 bg-orange-50 border border-orange-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                value={description}
                placeholder="Product Description"
                className="w-full mb-4 px-4 py-2 bg-orange-50 border border-orange-300 rounded-md shadow-sm focus:ring focus:ring-purple-300 resize-none"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="w-full mb-4 px-4 py-2 bg-orange-50 border border-orange-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Price (₹)"
                className="w-full mb-4 px-4 py-2 bg-orange-50 border border-orange-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* Shipping Option */}
              <Select
                bordered={false}
                placeholder="Shipping Available?"
                size="large"
                className="w-full px-4 py-2 bg-orange-50 border border-orange-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring focus:ring-orange-300 transition-all duration-300"
              >
                CREATE PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateProduct;
