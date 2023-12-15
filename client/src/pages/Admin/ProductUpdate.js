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
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

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
  }

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
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category._id);
      productData.append("shipping", shipping);
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
  }

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
  }

  return (
    <AdminLayout title={'Dashboard-update-product'}>
      <div className='container mx-auto mt-3 p-3'>
        <div className='md:flex md:flex-wrap'>
          {/* Admin Menu */}
          <div className='md:w-1/4'>
            <AdminMenu />
          </div>
          {/* Update Product Form */}
          <div className='md:w-3/4'>
            <h1 className='text-3xl font-semibold mb-6'>Update Product</h1>
            <div className='w-full max-w-md mx-auto'>
              <Select
                bordered={false}
                placeholder="Select a Category"
                size='large'
                showSearch
                className='mb-4'
                onChange={(value) => { setCategory(value) }}
                value={category.name}
              >
                {categories?.map((Obj) => (
                  <Option key={Obj._id} value={Obj._id}>{Obj.name}</Option>
                ))}
              </Select>
              {/* Photo */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  <span className=' bg-slate-300 p-3 rounded-xl hover:cursor-pointer'>Upload photo</span>
                  <input
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={(e) => {
                      setPhoto(e.target.files[0])
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className='mb-4'>
                {photo ? (
                  <div className='text-center'>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt='product-photo'
                      height={'200px'}
                      className='img img-responsive'
                    />
                  </div>
                ) : (
                  <div className='text-center'>
                    <img
                      src={`/api/v1/product/get-photo/${id}`}
                      alt='product-photo'
                      height={'200px'}
                      className='img img-responsive'
                    />
                  </div>
                )}
              </div>
              {/* Name */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                <input
                  type='text'
                  value={name}
                  placeholder='Enter a Name'
                  className='form-input px-3 py-2 w-full rounded-md border border-gray-300'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Description */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
                <textarea
                  type='text'
                  value={description}
                  placeholder='Enter a Description'
                  className='form-textarea px-3 py-2 w-full rounded-md border border-gray-300'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* Quantity */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Quantity</label>
                <input
                  type='number'
                  value={quantity}
                  placeholder='Enter Quantity'
                  className='form-input px-3 py-2 w-full rounded-md border border-gray-300'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {/* Price */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Price</label>
                <input
                  type='number'
                  value={price}
                  placeholder='Enter a Price'
                  className='form-input px-3 py-2 w-full rounded-md border border-gray-300'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* Shipping */}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Shipping</label>
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size='large'
                  showSearch
                  className='mb-3'
                  onChange={(value) => { setShipping(value) }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-4'>
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out'
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
              </div>
              <div className='mb-4'>
                <button
                  className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out'
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
  )
}

export default ProductUpdate;
