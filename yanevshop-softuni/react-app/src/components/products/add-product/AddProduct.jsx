import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from your API
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
        formData.append('image', productImage);
        formData.append('category_id', categoryId);

        try {
            const response = await axios.post('http://yanevshop.test/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product created:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error creating product:', error);
            // Handle error: display message or log to console
        }
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Add New Product</h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <textarea
                            placeholder="Product Description"
                            rows="4"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                        <input
                            type="number"
                            placeholder="Product Price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product Image
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleImageChange}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </label>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">
                            Category
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                </div>
            </div>
        </div>
    );
}
