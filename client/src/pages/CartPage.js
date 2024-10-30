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

  // Group items by product ID and count quantity
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const totalPrice = () => {
    try {
      return groupedCart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const decreaseQuantity = (pid) => {
    // Find the item in the cart
    const itemIndex = cart.findIndex((item) => item._id === pid);

    if (itemIndex !== -1) {
      // Create a shallow copy of the cart to modify it
      const updatedCart = [...cart];

      // Remove one instance of the item by index
      updatedCart.splice(itemIndex, 1);

      // Update state and local storage
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeCartItems = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const fetchData = async (amount) => {
    try {
      if (!auth?.token) navigate('/login');
      const Obj = await axios.get('/api/v1/product/getkey');
      const { data } = await axios.post(`/api/v1/product/razorpay/payment`, { amount });
      const options = {
        key: Obj.data.key,
        amount: data.order.amount,
        currency: 'INR',
        name: 'Pranav',
        description: 'E-commerce Payment',
        order_id: data.order.id,
        handler: function (response) {
          try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
            axios.post('/api/v1/product/payment-verify', {
              cart: groupedCart,
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
          color: '#FFA500',
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
      description={`You Have ${groupedCart.length ? `${groupedCart.length} Items in your cart` : 'Your Cart Is Empty'} ${
        auth?.token ? '' : 'Please Login to Checkout'
      }`}
    >
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-semibold text-gray-800">{`Hello ${auth?.token && auth?.user?.name}`}</h1>
          <p className="text-lg text-gray-600">
            {groupedCart.length ? `You have ${groupedCart.length} unique items in your cart` : <span>Your Cart Is Empty</span>}
          </p>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-8/12 px-4 mb-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              {groupedCart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 mb-4 bg-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={`/api/v1/product/get-photo/${item._id}`}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{item.description.substr(0, 50)}...</p>
                    <p className="text-lg font-semibold text-green-600 mt-2">
                      ₹ {item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-gray-800 font-semibold mt-1">
                      Total: ₹ {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        Decrease Quantity
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() => removeCartItems(item._id)}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cart Summary</h2>
              <p className="text-xl font-semibold text-green-600 mb-6">Total: ₹ {totalPrice()}</p>
              {auth?.user?.address ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Shipping Address</h3>
                  <p className="text-gray-600">{auth?.user?.address}</p>
                  <button
                    className="mt-2 text-blue-500 hover:underline text-sm"
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-6">
                  {auth?.token ? (
                    <button
                      className="text-blue-500 hover:underline text-sm"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Add Address
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 hover:underline text-sm"
                      onClick={() => navigate('/login', { state: '/cart' })}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg transition duration-300"
                onClick={() => fetchData(totalPrice())}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
