import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from './../../components/Layout/UserMenu';
import  axios  from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import '../../styles/OrderStyles.css';
function Orders() {
  const [auth,setAuth]=useAuth()
  const [orders,setOrders]=useState([])
  const getOrders= async ()=>{
    try{
      const {data}=await axios.get('/api/v1/auth/orders')
      setOrders(data.orders)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    if(auth?.token)
        getOrders();
  },[auth?.token]) 
  return (
    <Layout title={'Dashboard-Orders'}>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
          <h1 className='text-center'>Orders</h1>
          {
            orders?.map((o,i) =>{
              return(
                <div className='border shadow mb-4' >
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
                          <td>{o?.status}</td>
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
                        <div key={index} className='row mb-2 p-3 card flex-row pcard'>
                            <div className='col-md-4'>
                            <img src={`/api/v1/product/get-photo/${Obj._id}`} 
                            className="card-img-top" 
                            alt={Obj.name} 
                            />
                            </div>
                            <div className='col-md-8 product-details'>
                                <p className='product-name'>{Obj.name}</p>
                                <p className='product-description'>{Obj.description.substr(10)}</p>
                                <p className='product-price'>{Obj.price}</p>

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

export default Orders