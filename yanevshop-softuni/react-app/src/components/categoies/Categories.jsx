import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);

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

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-100">{category.name}</h2>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <Link to="/add-category" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
                        Add Category
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Categories;
