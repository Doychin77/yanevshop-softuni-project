import React, { useState } from 'react';
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
            <div className="home-background">
                <div className="max-w-screen-sm mx-auto px-4 py-8">
                    <div className="form-container p-6">
                        <h1 className="text-lg font-medium text-white text-center mb-4">ADD NEW CATEGORY</h1>
                        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Name</p>
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                />
                            </label>
                            <label className="block text-md mb-2 font-medium text-gray-100">
                                <p className="text-center text-orange-500">Image</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                />
                            </label>
                            <button
                                type="submit"
                                onClick={notify}
                                className="block mx-auto btn-primary px-8 py-2"
                            >
                                ADD CATEGORY
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
            
        </div>
    );
}
