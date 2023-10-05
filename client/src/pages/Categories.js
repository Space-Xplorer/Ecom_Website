import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/categories`);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={'All-Categories'}>
      <div className="bg-orange-light p-4">
        <h1 className="text-2xl text-white mb-4">Categories</h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <div className="bg-white p-4 rounded-lg shadow-md" key={c._id}>
                <Link
                  className="block text-center bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-dark"
                  to={`/category/${c.slug}`}
                >
                  {c.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
