import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../../footer/Footer';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://yanevshop.test/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('category_id', categoryId);
        if (productImage) {
            formData.append('image', productImage);
        }

        try {
            const response = await axios.post('http://yanevshop.test/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product added:', response.data);
            navigate('/products'); // Use navigate for navigation
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error adding product:', error);
            }
        }
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-sm mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Add New Product</h1>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                            Name
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full dark:text-gray-700 border-gray-300 rounded-xl shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </label>
                        {errors.name && <div className="text-red-500">{errors.name[0]}</div>}
                        <label className="block text-md font-medium text-gray-100 dark:text-gray-100">
                            Description
                            <textarea
                                placeholder="Product Description"
                                rows="4"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                className="w-full dark:text-gray-700 border-gray-300 rounded-xl shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></textarea>
                        </label>
                        {errors.description && <div className="text-red-500">{errors.description[0]}</div>}
                        <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                            Price
                            <input
                                type="number"
                                placeholder="Product Price"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="w-full dark:text-gray-700 border-gray-300 rounded-xl shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </label>
                        {errors.price && <div className="text-red-500">{errors.price[0]}</div>}
                        <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                            Image
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleImageChange}
                                className="mt-1 block w-full py-2 px-3 border dark:text-gray-700 border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </label>
                        <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                            Category
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border dark:text-gray-700 border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                        >
                            Add Product
                        </button>
                    </form>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
