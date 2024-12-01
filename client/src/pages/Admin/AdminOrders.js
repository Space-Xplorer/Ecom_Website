import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminLayout from "../../components/Layout/AdminLayout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
    setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (value, orderId) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title={"All Orders Data"}>
      <div className="container mx-auto p-6">
        <div className="md:flex gap-6">
          
          {/* Admin Menu */}
          <div className="md:w-1/4">
            <div className="bg-gradient-to-b from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-6">
              <AdminMenu />
            </div>
          </div>

          {/* Orders Section */}
          <div className="md:w-3/4">
            <h1 className="text-4xl font-bold mb-8 text-center text-orange-600">
              Orders Management
            </h1>
            
            <div >
  <h1 className="text-3xl font-semibold text-orange-600 mb-8 text-center">Your Orders</h1>
  {orders
    .map((order, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md mb-8 p-6 border-t-4 border-orange-500">
        {/* Order Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Order #{i + 1}</h2>
          <div className="text-lg font-semibold text-gray-600">
            Status:{" "}
            <Select
              value={order.status}
              onChange={(val) => handleChange(val, order._id)}
              className="text-orange-600 border-none"
            >
              {status.map((stat, index) => (
                <Option key={index} value={stat}>
                  {stat}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Order Details */}
        <table className="w-full border-collapse text-gray-700 mb-4">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="py-2 px-4 border-b border-gray-300">Buyer</th>
              <th className="py-2 px-4 border-b border-gray-300">Order Date</th>
              <th className="py-2 px-4 border-b border-gray-300">Payment Status</th>
              <th className="py-2 px-4 border-b border-gray-300">Total Items</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-2 px-4 border-b border-gray-300">{order.buyer?.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                {moment(order.createdAt).fromNow()}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {order.razorpay_payment_id ? "Success" : "Failed"}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">{order.products.length}</td>
            </tr>
          </tbody>
        </table>

        {/* Product Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {order.products.map((product, index) => (
            <div
              key={index}
              className="flex bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={`/api/v1/product/get-photo/${product._id}`}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-1">
                  {product.description.substring(0, 50)}...
                </p>
                <p className="text-green-600 font-semibold mt-2">₹ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
</div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
