import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../footer/Footer';


const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
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
                setPreviewImage(product.image ? `http://yanevshop.test/storage/images/${product.image}` : null);
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
            
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
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
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-sm mx-auto mb-10 px-4 py-8">
                    <div className="form-container p-6">
                        <h1 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-4">EDIT PRODUCT<br />{productData.name}</h1>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Name</p>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    name='name'
                                    value={productData.name}
                                    onChange={handleProductData}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                />
                            </label>
                            {errors.name && <div className="text-red-500">{errors.name[0]}</div>}
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Description</p>
                                <textarea
                                    placeholder="Product Description"
                                    rows="4"
                                    name='description'
                                    value={productData.description}
                                    onChange={handleProductData}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                ></textarea>
                            </label>
                            {errors.description && <div className="text-red-500">{errors.description[0]}</div>}
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Price</p>
                                <input
                                    type="number"
                                    placeholder="Product Price"
                                    name='price'
                                    value={productData.price}
                                    onChange={handleProductData}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                />
                            </label>
                            {errors.price && <div className="text-red-500">{errors.price[0]}</div>}
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Image</p>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleImageChange}
                                    className="input-field-primary w-full mt-2 p-2"
                                />
                                {previewImage && (
                                    <div className="mt-2 flex justify-center">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="max-w-full h-auto rounded-2xl"
                                            style={{ width: '300px', height: 'auto' }} 
                                        />
                                    </div>
                                )}
                            </label>


                            <label className="block text-md mb-2 font-medium text-gray-100">
                                <p className="text-center text-orange-500">Category</p>
                                <select
                                    value={productData.category_id}
                                    name='category_id'
                                    onChange={handleProductData}
                                    className="input-field-primary w-full mt-2 p-2"
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
                                className="btn-primary block mx-auto px-8 py-2"
                            >
                                UPDATE PRODUCT
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default EditProduct;
