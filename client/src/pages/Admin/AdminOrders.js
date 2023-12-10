import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import AdminLayout from "../../components/Layout/AdminLayout";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useAuth();
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
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title={"All Orders Data"}>
      <div className="container mx-auto mt-3 p-3">
        <div className="md:flex md:flex-wrap">
          {/* Admin Menu */}
          <div className="md:w-1/4">
            <AdminMenu />
          </div>
          {/* All Orders */}
          <div className="md:w-3/4">
            <h1 className="text-3xl font-semibold mb-6 text-center">Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow-lg mb-4" key={i}>
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th className="py-2">#</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Buyer</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Payment</th>
                        <th className="py-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">{i + 1}</td>
                        <td className="text-center">
                          <Select
                            bordered={false}
                            onChange={(val) => handleChange(o._id, val)}
                            defaultValue={o?.status}
                          >
                            {status.map((val, i) => (
                              <Option key={i} value={val}>
                                {val}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td className="text-center">{o?.buyer?.name}</td>
                        <td className="text-center">
                          {moment(o?.createdAt).fromNow()}
                        </td>
                        <td className="text-center">
                          {o?.razorpay_payment_id ? "Success" : "Failed"}
                        </td>
                        <td className="text-center">{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    {o?.products.map((Obj, index) => (
                      <div key={index} className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/get-photo/${Obj._id}`}
                            className="card-img-top"
                            alt={Obj.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <p className="font-semibold text-lg">{Obj.name}</p>
                          <p className="text-gray-700">
                            {Obj.description.substr(10)}
                          </p>
                          <p className="text-green-600 font-semibold">
                            {Obj.price}
                          </p>
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
    </AdminLayout>
  );
};

export default AdminOrders;
