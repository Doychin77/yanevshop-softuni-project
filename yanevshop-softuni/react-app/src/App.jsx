
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import About from './components/about/About';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Contacts from './components/contacts/Contacts';
import Products from './components/products/Products';
import AddProduct from './components/products/add-product/AddProduct';
import AddCategory from './components/categoies/add-category/AddCategory';
import Categories from './components/categoies/Categories';
import EditProduct from './components/products/edit-product/EditProduct';
import CategoryProducts from './components/categoies/category-products/CategoryProducts';
import ProductDetails from './components/products/product-details/ProductDetails';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/edit-profile/EditProfile';
import Cart from './components/cart/Cart';
import Order from './components/orders/Order';
import { CartProvider } from './contexts/CartContext';
import PrivateRoutes from './components/PrivateRoutes'; 
import NotFound from './components/NotFound';
import SuccessfulOrder from './components/orders/SuccessfulOrder';
import OrderHistory from './components/orders/OrderHistory';
import ResetPassword from './components/profile/passwords/ResetPassword';

function App() {
    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <Navigation />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/contacts" element={<Contacts />} />

                        {/* Protected Routes */}
                        <Route element={<PrivateRoutes />}>
                            <Route path="/products" element={<Products />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/edit-profile" element={<EditProfile />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/successful-order" element={<SuccessfulOrder />} />
                            <Route path="/order-history" element={<OrderHistory />} />
                            <Route path="/add-category" element={<AddCategory />} />
                            <Route path="/add-product" element={<AddProduct />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/products/:id/edit" element={<EditProduct />} />
                            <Route path="/categories/:id/products" element={<CategoryProducts />} />
                        </Route>

                        {/* Catch-all route for 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
