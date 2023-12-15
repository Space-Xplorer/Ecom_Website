import React from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function CartPage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toFixed(2);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItems = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Razorpay payment
  const fetchData = async (amount) => {
    try {
      if(!auth?.token) navigate('/login')
      const Obj = await axios.get('/api/v1/product/getkey');
      const { data } = await axios.post(`/api/v1/product/razorpay/payment`, {
        amount,
      });
      const options = {
        key: Obj.data.key,
        amount: data.order.amount,
        currency: 'INR',
        name: 'Pranav',
        description: 'E-commerce Payment',
        image: 'https://example.com/your_logo',
        order_id: data.order.id,
        handler: function (response) {
          try {
            const razorpay_payment_id = response.razorpay_payment_id;
            const razorpay_order_id = response.razorpay_order_id;
            const razorpay_signature = response.razorpay_signature;
            const data = axios.post('/api/v1/product/payment-verify', {
              cart,
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            });

            localStorage.removeItem('cart');
            setCart([]);
            toast.success('Payment Successful');
            navigate('/');
          } catch (error) {
            console.log(error);
          }
        },
        prefill: {
          name: 'Pranav',
          email: '@bachupally',
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#FFA500', // Light orange color
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      title={`Hello ${auth?.token && auth?.user?.name}`}
      description={`You Have ${
        cart?.length ? `${cart.length} Items in your cart` : 'Your Cart Is Empty'
      } ${auth?.token ? '' : 'Please Login to Checkout'}`}
    >
      <div className='container mx-auto p-4'>
        <div className='mb-6 text-center'>
          <h1 className='text-4xl font-semibold text-gray-800'>
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <p className='text-lg text-gray-600'>
            {cart?.length ? (
              `You have ${cart.length} items in your cart`
            ) : (
              <span>Your Cart Is Empty</span>
            )}
          </p>
        </div>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full lg:w-8/12 px-4 mb-8'>
            <div className='bg-white p-4 shadow-lg rounded-lg'>
              {cart?.map((Obj, index) => (
                <div
                  key={index}
                  className='mb-4 p-4 flex items-center bg-gray-100 rounded-lg hover:shadow-md transition duration-300'
                >
                  <div className='w-16 h-16 bg-gray-200 rounded-lg overflow-hidden'>
                    <img
                      src={`/api/v1/product/get-photo/${Obj._id}`}
                      alt={Obj.name}
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='ml-4 flex-1'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                      {Obj.name}
                    </h2>
                    <p className='text-gray-600 text-sm'>
                      {Obj.description.substr(0, 50)}...
                    </p>
                    <p className='text-lg font-semibold text-indigo-600'>
                      ₹ {Obj.price.toFixed(2)}
                    </p>
                    <button
                      className='text-red-500 hover:text-red-700 text-sm'
                      onClick={() => removeCartItems(Obj._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='bg-white p-4 shadow-lg rounded-lg'>
              <h2 className='text-2xl font-semibold mb-4'>Cart Summary</h2>
              <div className='mb-4'>
                <p className='text-lg font-semibold'>
                  Total: ₹ {totalPrice()}
                </p>
              </div>
              {auth?.user?.address ? (
                <>
                  <div className='mb-4'>
                    <h3 className='text-lg font-semibold'>
                      Current Address
                    </h3>
                    <p className='text-gray-600'>{auth?.user?.address}</p>
                    <button
                      className='mt-2 text-blue-500 hover:underline text-sm'
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className='mb-4'>
                  {auth?.token ? (
                    <button
                      className='text-blue-500 hover:underline text-sm'
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className='text-blue-500 hover:underline text-sm'
                      onClick={() =>
                        navigate('/login', {
                          state: '/cart',
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div>
                <button
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg'
                  onClick={() => fetchData(totalPrice())}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
