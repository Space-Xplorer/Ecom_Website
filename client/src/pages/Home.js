import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Radio, Select } from "antd";
import { Prices } from "./../components/Price";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";

const { Option } = Select;

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [radioVal, setRadioVal] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch total number of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.message) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page]);

  // Load more products
  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch all categories
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
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radioVal.length]);

  // Filter products based on category and price
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/filter-product`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

  return (
    <Layout title={"All Products - best-offers"}>
      <div className="container mx-auto">
      <button
                        className="text-gray-700 p-2 focus:outline-none focus:text-gray-900"
                        onClick={toggleSidebar}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
          <div className="lg:w-1/4">
            { isOpen &&
              <div className="bg-white rounded-lg shadow-md p-4 mt-5">
                <h4 className="text-center text-lg font-semibold mb-4">
                  Filter By Category
                </h4>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select categories"
                  onChange={(values) => {
                    setChecked(values);
                  }}
                  value={checked}
                >
                  {categories?.map((Obj) => (
                    <Option key={Obj._id} value={Obj._id}>
                      {Obj.name}
                    </Option>
                  ))}
                </Select>

                <div className=" flex flex-col">
                  <h4 className="text-base font-semibold inline">
                    Price filters
                  </h4>
                  <div
                    onChange={(e) => {
                      setRadio(e.target.value.split(","));
                    }}
                  >
                    {Prices.map((p) => (
                      <div key={p._id} className="mb-2">
                        <label className="text-sm text-gray-700">
                          <input type="radio" name="price" value={p.array} />
                          {p.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="reset bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 w-full"
                    onClick={() => window.location.reload()}
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
            }
          </div>
        <div className="lg:flex justify-center">

          {/* Product List */}
          <div className="lg:w-3/4 ">
            <h1 className="text-center text-3xl font-semibold my-5">
              All Products
            </h1>
            <div className="flex flex-wrap justify-center">
  {products?.map((Obj, i) => (
    <Link
      to={`/product/${Obj.slug}`}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 hover:scale-110 transition"
      key={i}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
        <img
          src={`/api/v1/product/get-photo/${Obj._id}`}
          className="w-full h-48 object-cover"
          alt={Obj.name}
        />
        <div className="p-4 h-full flex flex-col justify-between">
          <div>
            <h5 className="text-xl font-semibold">{Obj.name}</h5>
            <p className="text-gray-600 mt-2">
              {Obj.description.substring(0, 30)}
            </p>
          </div>
          <p className="font-bold mt-2">₹ {Obj.price}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

            <div className="m-10 p-3">
              {products && products.length < total && (
                <button
                  className="btn-warning bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-4 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
