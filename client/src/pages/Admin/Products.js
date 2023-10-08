import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/Layout/AdminLayout';

function Products() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/products');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AdminLayout>
      <div className='container mx-auto mt-3 p-3'>
        <div className='md:flex md:flex-wrap'>
          {/* Admin Menu */}
          <div className='md:w-1/4'>
            <AdminMenu />
          </div>
          {/* Product List */}
          <div className='md:w-3/4'>
            <h1 className='text-center text-3xl font-semibold mb-6'>All Products List</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {products?.map((product) => (
                <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`}>
                  <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                    <img
                      src={`/api/v1/product/get-photo/${product._id}`}
                      alt={product.name}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-4'>
                      <h3 className='text-lg font-semibold'>{product.name}</h3>
                      <p className='text-gray-600 mt-2'>{product.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Products;
