import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState(["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-orders');
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token)
      getOrders();
  }, [auth?.token]);

  const handleChange = async (value, orderId) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={'All Orders Data'}>
      <div className='container mx-auto mt-3 p-3'>
        <div className='md:flex md:flex-wrap'>
          {/* Admin Menu */}
          <div className='md:w-1/4'>
            <AdminMenu />
          </div>
          {/* All Orders */}
          <div className='md:w-3/4'>
            <h1 className='text-3xl font-semibold mb-6 text-center'>All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className='border shadow mb-4 p-4' key={i}>
                  <table className='table w-full'>
                    <thead>
                      <tr>
                        <th scope='col '>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(val) => handleChange(val, o._id)}
                            defaultValue={o?.status}
                            className='w-full text-center'
                          >
                            {status?.map((s, i) => (
                              <Option key={i} value={s}>{s}</Option>
                            ))}
                          </Select>
                        </td>
                        <td className='text-center'>{o?.buyer?.name}</td>
                        <td className='text-center'>{moment(o?.createdAt).fromNow()}</td>
                        <td className='text-center'>{o?.razorpay_payment_id ? "Success" : "Failed"}</td>
                        <td className='text-center'>{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    {o?.products.map((Obj, index) => (
                      <div key={index} className='mb-4 p-3 bg-white rounded-lg shadow-md'>
                        <div className='md:flex md:flex-wrap'>
                          <div className='md:w-1/4'>
                            <img
                              src={`/api/v1/product/get-photo/${Obj._id}`}
                              alt={Obj.name}
                              className='w-full h-auto'
                            />
                          </div>
                          <div className='md:w-3/4 mt-2 md:mt-0 md:pl-4'>
                            <p className='text-xl font-semibold'>{Obj.name}</p>
                            <p className='text-gray-600'>{Obj.description.substr(0, 100)}</p>
                            <p className='text-xl font-semibold'>{Obj.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminOrders;
