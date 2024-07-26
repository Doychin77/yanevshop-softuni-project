import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/toaststyles.css';
import wl from '../../../assets/wl.jpg';

export default function AddCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const notify = () => toast("Category Created!", {
        className: "toast-message-create-product",
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('image', image);

        try {
            const response = await axios.post('http://yanevshop.test/api/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Category created:', response.data);
            navigate('/categories');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
                <div className="max-w-screen-sm mx-auto px-4 py-8">
                    <div className="bg-[#242629] border-2 border-orange-500 rounded-3xl shadow-md p-6">
                        <h1 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-4">ADD NEW CATEGORY</h1>
                        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Name</p>
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="w-full mt-2 bg-gray-700 hover:bg-gray-600 rounded-2xl dark:text-gray-100 shadow-sm p-2 focus:outline-none"
                                    style={{ border: '2px solid transparent' }}
                                    onFocus={(e) => e.target.style.border = '2px solid orange'}
                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                    required
                                />
                            </label>
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Image</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full mt-2 bg-gray-700 hover:bg-gray-600 rounded-2xl dark:text-gray-100 shadow-sm p-2 focus:outline-none"
                                    style={{ border: '2px solid transparent' }}
                                    onFocus={(e) => e.target.style.border = '2px solid orange'}
                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                    required
                                />
                            </label>
                            <button
                                type="submit"
                                onClick={notify}
                                className="block mx-auto bg-orange-500 hover:bg-black text-white font-medium px-8 py-2 rounded-2xl"
                            >
                                ADD CATEGORY
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer className="footer" />
        </div>
    );
}
