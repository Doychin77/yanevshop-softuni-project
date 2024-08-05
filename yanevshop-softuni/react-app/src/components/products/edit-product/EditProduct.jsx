import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../footer/Footer';

const MAX_IMAGE_INPUTS = 6;

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: ''
    });
    const [imageInputs, setImageInputs] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [imageInputError, setImageInputError] = useState('');

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

                if (product.images) {
                    const images = JSON.parse(product.images).map(image => `http://yanevshop.test/storage/images/${image}`);
                    setProductImages(images);
                    setPreviewImages(images);
                    setImageInputs(new Array(images.length).fill(''));
                }
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e, index) => {
        const files = Array.from(e.target.files);
        const newPreviewImages = files.map(file => URL.createObjectURL(file));

        setProductImages(prevImages => {
            const newImages = [...prevImages];
            newImages[index] = files[0];
            return newImages;
        });

        setPreviewImages(prevPreviews => {
            const newPreviews = [...prevPreviews];
            newPreviews[index] = newPreviewImages[0];
            return newPreviews;
        });
    };

    const handleAddImageInput = () => {
        if (imageInputs.length < MAX_IMAGE_INPUTS) {
            setImageInputs([...imageInputs, '']);
            setProductImages([...productImages, null]);
            setPreviewImages([...previewImages, null]);
            setImageInputError('');
        } else {
            setImageInputError(`You can upload max ${MAX_IMAGE_INPUTS} images.`);
        }
    };

    const handleRemoveImageInput = (index) => {
        setImageInputs(imageInputs.filter((_, i) => i !== index));
        setProductImages(productImages.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
        setImageInputError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('category_id', productData.category_id);

        // Prepare existing images array
        const existingImages = previewImages
            .filter(image => image && !image.startsWith('blob:'))
            .map(image => image.replace('http://yanevshop.test/storage/images/', ''));

        // Append existing images
        formData.append('existing_images', JSON.stringify(existingImages));

        // Append new images
        productImages.forEach((file) => {
            if (file && file instanceof File) {
                formData.append('images[]', file);
            }
        });

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
                console.log('Validation Errors:', error.response.data.errors);
            }
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
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                />
                            </label>
                            {errors.name && <div className="text-red-500">{errors.name[0]}</div>}
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Description</p>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                ></textarea>
                            </label>
                            {errors.description && <div className="text-red-500">{errors.description[0]}</div>}
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Price</p>
                                <input
                                    type="number"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    className="input-field-primary w-full mt-2 p-2"
                                    required
                                />
                            </label>
                            {errors.price && <div className="text-red-500">{errors.price[0]}</div>}
                            <div className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Images</p>
                                {imageInputs.map((_, index) => (
                                    <div key={index} className="relative mb-2">
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e) => handleImageChange(e, index)}
                                            className="input-field-primary w-full p-2"
                                        />
                                        {previewImages[index] && (
                                            <div className="mt-2 flex justify-center">
                                                <img
                                                    src={previewImages[index]}
                                                    alt="Preview"
                                                    className="max-w-full h-auto rounded-2xl"
                                                    style={{ width: '200px', height: 'auto' }}
                                                />
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImageInput(index)}
                                            className="absolute top-0 right-0 text-red-500 hover:text-red-700 font-bold text-2xl"
                                            title="Remove Image"
                                            style={{ margin: '5px', padding: '0 5px', border: 'none', background: 'transparent' }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                {imageInputError && (
                                    <div className="text-red-500 text-center mb-2">
                                        {imageInputError}
                                    </div>
                                )}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleAddImageInput}
                                        className="btn-primary py-2 px-5 mt-2"
                                    >
                                        Add More Images
                                    </button>
                                </div>
                            </div>
                            <label className="block text-md font-medium text-gray-100">
                                <p className="text-center text-orange-500">Category</p>
                                <select
                                    value={productData.category_id}
                                    onChange={(e) => setProductData(prevData => ({ ...prevData, category_id: e.target.value }))}
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
