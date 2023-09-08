import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import  toast  from 'react-hot-toast';


function CartPage() {
    const navigate=useNavigate();
    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();
    const [orderId,setOrderId]=useState('')
    const [buttonLabel, setButtonLabel] = useState('Pay with Razorpay');
    const [paymentId,setPaymentId]=useState('')
    const [signature,setSignature]=useState('')
    const handlePaymentSuccess = (paymentResponse) => {


        alert(paymentResponse.razorpay_payment_id);
        alert(paymentResponse.razorpay_order_id);
        alert(paymentResponse.razorpay_signature);
        setPaymentId(paymentResponse.razorpay_payment_id)
        setSignature(paymentResponse.razorpay_signature)
      };
    

    
      const totalPrice = () =>{
        try{
            let total=0;
            cart?.map(item => {
                total=total+item.price;
            });
            return total;

        }catch(error){
            console.log(error);
        }
    }


    const removeCartItems= async (pid)=>{
        try{
            let myCart=[...cart]
            let index=myCart.findIndex(item=> item._id===pid)
            myCart.splice(index,1)
            setCart(myCart);
            localStorage.setItem('cart',JSON.stringify(myCart)) 
        }catch(error){
            console.log(error);
        }
    }

    //razor payment
    const fetchData= async (amount)=>{
        try{
            const Obj=await axios.get('/api/v1/product/getkey')
            const {data}=await axios.post(`/api/v1/product/razorpay/payment`,{
                    amount,
            })
            const options = {
                key: Obj.data.key,  
                amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Pranav",
                description: "ecommerce payment",
                image: "https://example.com/your_logo",
                order_id: data.order.id, 
                handler: function (response){
                    try{
                       const razorpay_payment_id=response.razorpay_payment_id;
                       const razorpay_order_id=response.razorpay_order_id;
                       const razorpay_signature=response.razorpay_signature;
                        const data=axios.post('/api/v1/product/payment-verify',{
                            cart,
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                        })
                        
                        
                        localStorage.removeItem('cart');
                        setCart([]);
                        toast.success("Payment Successful")
                        navigate('/');
                    }
                    catch(error){
                        console.log(error);
                    }
                },
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
           const razor=new window.Razorpay(options)
           razor.open()
            
        }catch(error){
            console.log(error);
        }
    }


  

    
   

   
  return (
    <Layout>
    <div className='container'>
        <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length ? `You Have ${cart.length} Items in your cart ${auth?.token ? "" : "Please Login to Checkout"}` : "Your Cart Is Empty" }
                    </h4>
                </div>
        </div>
        <div className='row'>
            <div className='col-md-8'>
                <div className='row'>
                    {
                        cart?.map((Obj,index)=>(
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
                                    <button className='btn btn-danger' onClick={()=> removeCartItems(Obj._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='col-md-4 text-center' >
                <h2>Cart Summary</h2>
                <p>Total | CheckOut | Payment</p>
                <hr/>
                <h4>Total : {totalPrice()}
                </h4>
                {auth?.user?.address ? (
                    <>
                    <div className='mb-3'>
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button className='btn btn-outline-warning'
                        onClick={()=>navigate('/dashboard/user/profile')}
                        >
                            Update Address
                        </button>
                    </div>
                    </>
                ) :(
                    <div className='mb-3'>
                        {
                            auth?.token ? (
                                <button className='btn btn-outline-warning'
                        onClick={()=>navigate('/dashboard/user/profile')}
                        >
                            Update Address
                        </button>
                            ) : (
                                <button className='btn btn-outline-warning'
                                onClick={()=>navigate('/login',{
                                    state:'/cart',
                                })}>Please Login to CheckOut</button>
                            )
                        }
                    </div>
                )}
                <hr/>
                <div>
                   <button 
                   className='btn btn-primary'
                   onClick={()=> fetchData(totalPrice())}
                    >Proceed to Pay</button>
                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default CartPage