import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import AdminLayout from '../../components/Layout/AdminLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/products');
      console.log(data)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AdminLayout title={"All Products"}>
      <div className="container mx-auto p-6 min-h-screen">
        <div className="md:flex gap-6">
          
          {/* Admin Menu with Fixed Height */}
          <div className="md:w-1/4 bg-gradient-to-b from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-6 h-full min-h-full">
            <AdminMenu />
          </div>

          {/* Product List */}
          <div className="md:w-3/4">
            <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product._id} to={`/admin-panel/product-update/${product.slug}`}>
                  <div className="bg-white shadow-md rounded-lg border border-orange-300 overflow-hidden hover:scale-105 transition-shadow duration-300 h-96 flex flex-col">
                    
                    {/* Product Image */}
                    <img
                      src={`/api/v1/product/get-photo/${product._id}`}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    
                    {/* Product Details */}
                    <div className="p-4 flex flex-col justify-between h-full">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 mt-2 line-clamp-3">
                        {product.description.substring(0, 80)}...
                      </p>
                      <p className="text-green-600 font-semibold mt-4">
                        ₹ {product.price}
                      </p>
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
