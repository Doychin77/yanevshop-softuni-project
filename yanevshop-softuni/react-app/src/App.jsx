import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
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

import { ToastContainer } from 'react-toastify';
import ProductDetails from './components/products/product-details/ProductDetails';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/edit-profile/EditProfile';
import Cart from './components/cart/Cart';
import Order from './components/orders/Order';
import { CartProvider } from './components/CartContext';


function App() {
    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/categories/:id/products" element={<CategoryProducts />} />
                        <Route path="/add-category" element={<AddCategory />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/products/:id/edit" element={<EditProduct />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <ToastContainer
                        autoClose={2000}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        transition:Bounce
                    />
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
