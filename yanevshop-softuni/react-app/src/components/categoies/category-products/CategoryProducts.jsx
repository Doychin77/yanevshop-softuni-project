import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import wl from '../../../assets/wl.jpg';  // Ensure this path is correct
import Footer from '../../footer/Footer';
import { useCart } from '../../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEye } from '@fortawesome/free-solid-svg-icons';

const CategoryProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get(`http://yanevshop.test/api/categories/${id}/products`);
                setProducts(response.data.products);
                setCategoryName(response.data.name);
            } catch (error) {
                console.error('Error fetching category products:', error);
            }
        };

        fetchCategoryProducts();
    }, [id]);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
                <div className="max-w-screen-xl mx-auto px-4 py-8">
                    <header className="py-6">
                        <h1 className="text-3xl font-bold text-gray-100 text-center mb-4">
                            {categoryName}
                        </h1>
                    </header>
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-3xl shadow-md text-gray-800 flex flex-col justify-center items-center p-4">
                                <img
                                    src={`http://yanevshop.test/storage/images/${product.image}`}
                                    alt={product.name}
                                    style={{ width: '180px', height: '230px', objectFit: 'cover' }}
                                    className="w-180px h-auto mb-4 rounded-md"
                                />
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
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-4 py-2 rounded-2xl"
                                        title="Buy"
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </button>
                                    
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-4 py-2 rounded-2xl"
                                        title="View"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </main>
                    <div className="flex justify-center mt-20">
                        <Link
                            to="/categories"
                            className="btn-primary px-4 py-2"
                        >
                            Back to Categories
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryProducts;
