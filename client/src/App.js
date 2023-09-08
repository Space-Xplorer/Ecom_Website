
import Home from './pages/Home'
import About from './pages/About'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Contact from './pages/Contact'
import {Routes,Route} from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import DashBoard from './pages/user/DashBoard'
import './App.css';
import PrivateRoute from './components/Layout/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminRoute from './components/Layout/Routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import ProductUpdate from './pages/Admin/ProductUpdate';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search' element={<SearchPage/>} />
        <Route path='/product/:slug' element={<ProductDetails/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/cart' element={<CartPage/>} />
        {/* <Route path='/category/:slug' element={<CategoryProducts/>} /> */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<DashBoard />} />
          <Route path="user/profile" element={<Profile/>} />
          <Route path="user/orders" element={<Orders/>} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/product/:slug" element={ <ProductUpdate/> } />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/users" element={<Users/>} />
          <Route path="admin/orders" element={<AdminOrders/>} />

        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
