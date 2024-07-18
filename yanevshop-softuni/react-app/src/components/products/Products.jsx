import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import wl from '../../assets/wl.jpg';
import Footer from '../footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/toaststyles.css';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});

    const notify = () => toast("Product Deleted!", {
        className: "toast-message-delete",
    });


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://yanevshop.test/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://yanevshop.test/api/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
            notify();
        } catch (error) {
            console.error('Error deleting product:', error);
            setErrors({ delete: 'Error deleting product' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
                <div className="max-w-screen mx-auto px-4">
                    <header className="py-6">
                        <h1 className="text-3xl font-bold text-gray-100 text-center">YanevShop</h1>
                        <p className="text-lg text-gray-300 text-center">Discover our featured products and latest offers!</p>
                        <div className="flex justify-center mt-4">
                            <Link to="/add-product" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl mb-6 mt-6">
                                Add New Product
                            </Link>
                        </div>
                    </header>
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-3xl shadow-md text-gray-800 flex flex-col justify-center items-center p-4">
                                <img src={`http://yanevshop.test/storage/images/${product.image}`} alt={product.name}
                                    style={{ width: '180px', height: '230px', objectFit: 'cover' }}
                                    className="w-200px h-auto mb-4 rounded-md" />
                                <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
                                <p className="text-gray-800 text-lg mb-4" style={{
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word',
                                    hyphens: 'auto',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {product.description.length > 30 ? product.description.substring(0, 30) : product.description}
                                </p>
                                <p className="text-gray-800 text-center mb-4">{product.price}$</p>
                                <div className="flex justify-center">
                                    <Link
                                        to={`/products/${product.id}/edit`}
                                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-4 py-2 rounded-lg ml-2"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </main>

                    {errors.delete && <div className="text-red-500 text-center mt-4">{errors.delete}</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
