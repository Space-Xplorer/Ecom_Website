
import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';

const {Option}=Select

const AdminOrders = () => {
    const [status,setStatus]=useState(["Not processed","Processing","Shipped","Delivered","Cancelled"])
    const [changeStatus,setChangeStatus]=useState("")
    const [auth,setAuth]=useAuth()
    const [orders,setOrders]=useState([])

    const getOrders= async ()=>{
        try{
          const {data}=await axios.get('/api/v1/auth/all-orders')
          setOrders(data.orders)
        }catch(error){
          console.log(error);
        }
      }
    
      useEffect(()=>{
        if(auth?.token)
            getOrders();
      },[auth?.token]) 


      const handleChange = async (value,orderId)=>{
        try{
          const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{
            status:value
          })
          getOrders();
        }catch(error){
          console.log(error);
        }
      }
  return (
    <Layout title={'All Orders Data'}>
        <div className='container-fluid m-3 p-3'>
    <div className='row'>
         <div className='col-md-3'>
            <AdminMenu/>
         </div>
         <div className='col-md-9'>
            <h1 className='text-center'>All orders</h1>
            {
            orders?.map((o,i) =>{
              return(
                <div className='border shadow mb-4' key={i}>
                   <table className='table'>
                      <thead>
                        <tr>
                           <th scope='col'>#</th>
                           <th scope='col'>status</th>
                           <th scope='col'>Buyer</th>
                           <th scope='col'>Date</th>
                           <th scope='col'>Payment</th>
                           <th scope='col'>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i+1}</td>
                          <td>
                            <Select bordered={false} onChange={(val)=> handleChange(val,o._id)} defaultValue={o?.status}>
                              {
                                status?.map((s,i)=>(
                                  <Option key={i} value={s}>{s}</Option>
                                ))
                              }   
              
                            </Select>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.razorpay_payment_id? "Success" : "Failed"}</td>
                          <td>{o?.products.length}</td>
                        </tr>
                      </tbody>
                   </table>
                   <div>
                    {
        
                        o?.products.map((Obj,index)=>(
                        <div key={index} className='row mb-2 p-3 card flex-row'>
                            <div className='col-md-4'>
                            <img src={`/api/v1/product/get-photo/${Obj._id}`} 
                            className="card-img-top" 
                            alt={Obj.name}
                            width="100px"
                            height={"100px"} 
                            />
                            </div>
                            <div className='col-md-8'>
                                <p>{Obj.name}</p>
                                <p>{Obj.description.substr(10)}</p>
                                <p>{Obj.price}</p>

                            </div>
                        </div>
                        )
                    )
                      
                    }
                   </div>
                </div>
              )
            })
          }

         </div>
    </div>
    </div>
    </Layout>
  )
}

export default AdminOrders