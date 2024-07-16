import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null); // State to hold the selected image file
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('image', image); // Append the image file to FormData

        try {
            const response = await axios.post('http://yanevshop.test/api/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type for FormData
                }
            });
            console.log('Category created:', response.data);
            navigate('/categories');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Update state with the selected image file
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-sm mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Add New Category</h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
                        <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                            Name
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="t-1 block w-full py-2 px-3 border dark:text-gray-700 border-gray-300 bg-white rounded-md shadow-sm focums:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </label>
                        <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                            Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange} // Handle file change
                                className="t-1 block w-full py-2 px-3 border dark:text-gray-700 border-gray-300 bg-white rounded-md shadow-sm focums:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </label>
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
