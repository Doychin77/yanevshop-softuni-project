import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../../footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/toaststyles.css';


const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const notify = () => toast("Product Created!", {
        className: "toast-message-create-product",
    });


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
        <div className="flex flex-col min-h-screen">
            <div className="home-background">
                <div className="max-w-screen-sm mx-auto px-4 py-8">
                    
                    <div className="form-container p-6">
                    <h1 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-4">ADD NEW PRODUCT</h1>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            <label className="block  text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Name</p>
                                <input
                                    type="text"
                                
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="input-field-primary w-full mt-2p-2"
                                    required
                                />
                            </label>
                            {errors.name && <div className="text-red-500">{errors.name[0]}</div>}
                            <label className="block text-md  font-medium text-gray-100">
                            <p className="text-center text-orange-500">Description</p>
                                <textarea    
                                    rows="4"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                ></textarea>
                            </label>
                            {errors.description && <div className="text-red-500">{errors.description[0]}</div>}
                            <label className="block text-md font-medium text-gray-100">
                            <p className="text-center text-orange-500">Price</p>
                                <input
                                    type="number"
                                    
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    className="input-field-primary w-full mt-2p-2"
                                    required
                                />
                            </label>
                            {errors.price && <div className="text-red-500">{errors.price[0]}</div>}
                            <label className="block text-md font-medium text-gray-100">
                            <p className="text-center text-orange-500">IMAGE</p>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleImageChange}
                                    className="input-field-primary w-full mt-2p-2"
                                    required
                                />
                            </label>
                            <label className="block text-md font-medium text-gray-100">
                            <p className="text-center text-orange-500">Category</p>
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="input-field-primary w-full mt-2p-2"
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
                                onClick={notify}
                                className="btn-primary block mx-auto px-8 py-2"
                            >
                                ADD PRODUCT
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
            
        </div>
    );
};

export default AddProduct;
