import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';


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
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-14">Categories</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white dark:bg-gray-700 border-2 border-orange-500 rounded-3xl shadow-md p-4 flex flex-col items-center">
                                <Link
                                    to={`/categories/${category.id}/products`}
                                    className="flex flex-col items-center text-center hover:text-blue-400 transition-colors duration-300"
                                >
                                    <img
                                        src={`http://yanevshop.test/storage/images/${category.image}`}
                                        alt={category.name}
                                        className="w-20 h-20 object-cover rounded-full mb-2"
                                    />
                                    <span className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-400 transition-colors duration-400">
                                        {category.name.length > 12 ? `${category.name.substring(0, 12)}` : category.name}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-20">
                        <Link to="/add-category" className="btn-primary px-8 py-2">
                            ADD CATEGORY
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Categories;
