import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext'; // Ensure the path is correct
import Navigation from './components/navigation/Navigation'; // Ensure the path is correct
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

function App() {
    return (
        <UserProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;