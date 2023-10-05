import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from './../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

function Orders() {
  const [auth, setAuth] = useAuth();
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
    <Layout title={'Dashboard-Orders'}>
      <div className='container mx-auto p-4'>
        <div className='md:flex'>
          {/* User Menu (Sidebar) */}
          <div className='md:w-1/4'>
            <UserMenu />
          </div>

          {/* Orders List */}
          <div className='md:w-3/4'>
            <h1 className='text-3xl font-semibold mb-6 text-center'>Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className='border shadow-lg mb-4' key={i}>
                  <table className='table w-full'>
                    <thead>
                      <tr>
                        <th className='py-2'>#</th>
                        <th className='py-2'>Status</th>
                        <th className='py-2'>Buyer</th>
                        <th className='py-2'>Date</th>
                        <th className='py-2'>Payment</th>
                        <th className='py-2'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='text-center'>{i + 1}</td>
                        <td className='text-center'>{o?.status}</td>
                        <td className='text-center'>{o?.buyer?.name}</td>
                        <td className='text-center'>{moment(o?.createdAt).fromNow()}</td>
                        <td className='text-center'>{o?.razorpay_payment_id ? 'Success' : 'Failed'}</td>
                        <td className='text-center'>{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    {o?.products.map((Obj, index) => (
                      <div key={index} className='row mb-2 p-3 card flex-row'>
                        <div className='col-md-4'>
                          <img
                            src={`/api/v1/product/get-photo/${Obj._id}`}
                            className='card-img-top'
                            alt={Obj.name}
                          />
                        </div>
                        <div className='col-md-8'>
                          <p className='font-semibold text-lg'>{Obj.name}</p>
                          <p className='text-gray-700'>{Obj.description.substr(10)}</p>
                          <p className='text-green-600 font-semibold'>{Obj.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
