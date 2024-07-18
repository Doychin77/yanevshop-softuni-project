import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/toaststyles.css';


const EditProduct = () => {

    const { id } = useParams(); // Get the product ID from URL params
    const navigate = useNavigate();
    const [productImage, setProductImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    const notify = () => toast("Product Updated!", {
        className: "toast-message-update",
    });

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category_id: ''
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://yanevshop.test/api/products/${id}`);
                const product = response.data;
                setProductData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category_id: product.category_id
                });
                setPreviewImage(product.image); // Set the initial image preview
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://yanevshop.test/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProductDetails();
        fetchCategories();
    }, [id]);

    const handleProductData = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        if (productImage) {
            formData.append('image', productImage);
        }
        formData.append('category_id', productData.category_id);

        try {
            const response = await axios.post(`http://yanevshop.test/api/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product updated:', response.data);
            navigate('/products'); // Navigate to product list after successful update
        } catch (error) {
            console.error('Error updating product:', error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                console.error('Validation errors:', error.response.data.errors);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-screen-sm mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Edit Product <br /> {productData.name}  </h1>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                                Name
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    name='name'
                                    value={productData.name}
                                    onChange={handleProductData}
                                    className="w-full mt-2 bg-gray-700 hover:bg-gray-600 border-gray-300 dark:text-gray-100 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                            {errors.name && <div className="text-red-500">{errors.name[0]}</div>}
                            <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                                Description
                                <textarea
                                    placeholder="Product Description"
                                    rows="4"
                                    name='description'
                                    value={productData.description}
                                    onChange={handleProductData}
                                    className="w-full mt-2 bg-gray-700 hover:bg-gray-600 border-gray-300 dark:text-gray-100 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                ></textarea>
                            </label>
                            {errors.description && <div className="text-red-500">{errors.description[0]}</div>}
                            <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                                Price
                                <input
                                    type="number"
                                    placeholder="Product Price"
                                    name='price'
                                    value={productData.price}
                                    onChange={handleProductData}
                                    className="w-full mt-2 bg-gray-700 hover:bg-gray-600 border-gray-300 dark:text-gray-100 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
                                    className="w-full mt-2 bg-gray-700 hover:bg-gray-600  border-gray-300 dark:text-gray-100 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </label>
                            <label className="block text-md font-medium text-gray-700 dark:text-gray-100">
                                Category
                                <select
                                    value={productData.category_id}
                                    name='category_id'
                                    onChange={handleProductData}
                                    className="w-full mt-2 bg-gray-700 hover:bg-gray-600  border-gray-300 dark:text-gray-100 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
                            {errors.category_id && <div className="text-red-500">{errors.category_id[0]}</div>}
                            <button
                                type="submit"
                                onClick={notify}
                                className="block mx-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-xl"
                            >
                                Update Product
                            </button>
                            
                        </form>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditProduct;
