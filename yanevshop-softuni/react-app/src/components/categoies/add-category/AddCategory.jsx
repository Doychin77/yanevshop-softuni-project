import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://yanevshop.test/api/categories', {
                name: categoryName,
            });
            console.log('Category created:', response.data);
            navigate('/categories');
        } catch (error) {
            console.error('Error creating category:', error);
            // Handle error: display message or log to console
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Add New Category</h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                        >
                            Add Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
