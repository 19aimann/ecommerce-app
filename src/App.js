import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./auth/Login";
import Register from "./auth/Register";
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./Components/route/Private";
import ForgotPassword from "./auth/ForgotPassword";
import AdminRoute from "./Components/route/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./user/Profile";
import Orders from "./user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/profile" element={<Profile/>}/>
        <Route path="user/orders" element={<Orders/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/products" element={<Products/>}/>
        <Route path="admin/create-users" element={<Users/>}/>
        <Route path="admin/orders" element={< AdminOrders/>}/>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;