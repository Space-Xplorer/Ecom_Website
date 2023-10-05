import React from 'react';
import { useSearch } from '../context/Search';
import Layout from './../components/Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';

function SearchPage() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    return (
        <Layout title={'Search results'}>
            <div className='container mx-auto'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold my-4'>Search Results</h1>

                    <h6 className='text-lg'>
                        {values?.results.length < 1
                            ? 'No Products Found'
                            : `Found ${values?.results.products.length} Products`}
                    </h6>
                </div>
                <div className='flex flex-wrap justify-center'>
                {values?.results?.products?.map((Obj, i) => (
                <Link to={`/product/${Obj.slug}`}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 hover:scale-110 transition"
                  key={i}
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
                    <img
                      src={`/api/v1/product/get-photo/${Obj._id}`}
                      className="w-full h-48 object-cover"
                      alt={Obj.name}
                    />
                    <div className="p-4">
                      <h5 className="text-xl font-semibold">{Obj.name}</h5>
                      <p className="text-gray-600 mt-2">
                        {Obj.description.substring(0, 30)}
                      </p>
                      <p className=" font-bold mt-2">₹ {Obj.price}</p>
                      
                    </div>
                  </div>
                </Link>
              ))}
                </div>
            </div>
        </Layout>
    );
}

export default SearchPage;
