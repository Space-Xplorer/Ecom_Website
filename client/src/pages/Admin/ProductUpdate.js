import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/Layout/AdminLayout';

const { Option } = Select;

function ProductUpdate() {
  const Params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [id, setId] = useState('');

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      console.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/single-product/${Params.slug}`);
      setId(data.product[0]._id);
      setName(data.product[0].name);
      setDescription(data.product[0].description);
      setQuantity(data.product[0].quantity);
      setShipping(data.product[0].shipping);
      setPrice(data.product[0].price);
      setCategory(data.product[0].category);
    } catch (error) {
      console.log(error);
      console.error('Something went wrong');
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);
      photo && productData.append('photo', photo);
      productData.append('category', category._id);
      productData.append('shipping', shipping);
      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);

      if (data?.success) {
        console.error(data?.message);
      } else {
        console.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      console.error('Something went wrong');
    }
  };

  // Delete function
  const handleDelete = async () => {
    try {
      let answer = window.confirm('Are you sure you want to delete the product?');
      if (answer === false) return;
      const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
      if (data?.success) {
        console.success(data.message);
        navigate('/dashboard/admin/products');
      } else {
        console.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      console.error('Something went wrong');
    }
  };

  return (
    <AdminLayout title={'Dashboard - Update Product'}>
      <div className='container mx-auto mt-5 p-5'>
        <div className='md:flex gap-6'>
          {/* Admin Menu */}
          <div className='md:w-1/4 bg-gradient-to-b from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-6 h-full min-h-full'>
            <AdminMenu />
          </div>
          {/* Update Product Form */}
          <div className='md:w-3/4 bg-white p-6 rounded-lg shadow-lg border border-orange-400'>
            <h1 className='text-3xl font-bold text-orange-600 mb-6 text-center'>Update Product</h1>
            <div className='w-full'>
              <Select
                bordered={false}
                placeholder='Select a Category'
                size='large'
                showSearch
                className='mb-4 w-full border border-orange-400 rounded-lg focus:outline-none focus:ring focus:ring-orange-200'
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category.name}
              >
                {categories?.map((Obj) => (
                  <Option key={Obj._id} value={Obj._id}>
                    {Obj.name}
                  </Option>
                ))}
              </Select>
              {/* Photo */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  <span className='bg-orange-200 p-2 rounded-lg cursor-pointer hover:bg-orange-300 transition'>
                    {photo ? 'Change Photo' : 'Upload Photo'}
                  </span>
                  <input
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
                {photo ? (
                  <div className='text-center'>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt='product-photo'
                      className='w-full h-64 object-cover rounded-lg shadow-md'
                    />
                  </div>
                ) : (
                  <div className='text-center'>
                    <img
                      src={`/api/v1/product/get-photo/${id}`}
                      alt='product-photo'
                      className='w-full max-w-md h-50 rounded-lg shadow-md'
                    />
                  </div>
                )}
              </div>
              {/* Name */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Name</label>
                <input
                  type='text'
                  value={name}
                  placeholder='Enter Product Name'
                  className='form-input w-full px-4 py-2 rounded-lg border border-orange-400 focus:outline-none focus:ring focus:ring-orange-200'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Description */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                <textarea
                  value={description}
                  placeholder='Enter Product Description'
                  className='form-textarea w-full px-4 pt-2 pb-20 rounded-lg border border-orange-400 focus:outline-none focus:ring focus:ring-orange-200'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* Quantity */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Quantity</label>
                <input
                  type='number'
                  value={quantity}
                  placeholder='Enter Quantity'
                  className='form-input w-full px-4 py-2 rounded-lg border border-orange-400 focus:outline-none focus:ring focus:ring-orange-200'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {/* Price */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Price</label>
                <input
                  type='number'
                  value={price}
                  placeholder='Enter Price (₹)'
                  className='form-input w-full px-4 py-2 rounded-lg border border-orange-400 focus:outline-none focus:ring focus:ring-orange-200'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* Shipping */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Shipping</label>
                <Select
                  bordered={false}
                  placeholder='Select Shipping Option'
                  size='large'
                  showSearch
                  className='mb-4 w-full border border-orange-400 rounded-lg focus:outline-none focus:ring focus:ring-orange-200'
                  onChange={(value) => setShipping(value)}
                  value={shipping ? 'Yes' : 'No'}
                >
                  <Option value='0'>No</Option>
                  <Option value='1'>Yes</Option>
                </Select>
              </div>
              {/* Update and Delete Buttons */}
              <div className='flex space-x-4'>
                <button
                  className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-orange-300'
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
                <button
                  className='bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-red-300'
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ProductUpdate;
