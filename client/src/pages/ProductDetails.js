import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';

function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/single-product/${params.slug}`);
      setProduct(data.product[0]);
      getSimilarProducts(data?.product[0]._id, data?.product[0].category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`Product: ${product.name}`}>
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img
              src={`/api/v1/product/get-photo/${product._id}`}
              alt={product.name}
              className="w-auto h-96 rounded-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className=" font-bold mt-2">Price: ₹{product.price}</p>
            <p className="text-blue-600 font-semibold mt-2">Category: {product?.category?.name}</p>
            <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-x-2">
              
              <button
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2"
                onClick={ () => {
                    setCart([...cart, product]);
                    toast.success("Item Added To Cart");
                  } }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-8" />
      {relatedProducts.length < 1 ? (
        <p className="text-center text-xl font-semibold">No Similar Products Found</p>
      ) : (
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
          <div className="flex flex-wrap justify-start">
          {relatedProducts?.map((Obj, i) => (
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
      )}
    </Layout>
  );
}

export default ProductDetails;
