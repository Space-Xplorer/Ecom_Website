import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from './../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

function Orders() {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders');
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={'Dashboard - Orders'}>
      <div className="container mx-auto p-6 min-h-screen bg-gray-100">
        <div className="md:flex gap-8">
          
          {/* User Menu (Sidebar) with Adjusted Height */}
          <div className="md:w-1/4 bg-gradient-to-b from-amber-500 to-orange-600 text-white rounded-lg shadow-lg p-6 max-h-[500px] overflow-y-auto">
            <UserMenu />
          </div>

          {/* Orders List */}
          <div className="md:w-3/4">
            <h1 className="text-3xl font-semibold text-orange-600 mb-8 text-center">Your Orders</h1>
            {orders?.map((order, i) => (
              <div className="bg-white rounded-lg shadow-md mb-8 p-6" key={i}>
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b text-gray-700">
                      <th className="py-2">#</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Buyer</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Payment</th>
                      <th className="py-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center text-gray-600">
                      <td>{i + 1}</td>
                      <td>{order?.status}</td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.razorpay_payment_id ? 'Success' : 'Failed'}</td>
                      <td>{order?.products.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order?.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex bg-gray-50 rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="w-1/3">
                        <img
                          src={`/api/v1/product/get-photo/${product._id}`}
                          className="w-full h-32 object-cover rounded-lg"
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                        <p className="text-gray-600 mt-2">{product.description.substring(0, 100)}...</p>
                        <p className="text-green-600 font-semibold mt-4">₹ {product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
