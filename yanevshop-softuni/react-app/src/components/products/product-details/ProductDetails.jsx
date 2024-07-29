import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/Footer';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://yanevshop.test/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            setError('Error fetching product details');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen mx-auto px-4">
                    <div className="text-center bg-white rounded-3xl shadow-md p-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {product && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={`http://yanevshop.test/storage/images/${product.image}`}
                                    alt={product.name}
                                    style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                                    className="rounded-md mb-4"
                                />
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
                                <h1 className="text-1xl font-bold text-gray-800">Description:</h1>
                                <p className="text-gray-800 text-lg mb-4 py-4" style={{ maxWidth: '740px', margin: '0 auto' }}> {product.description}</p>
                                <p className="text-gray-900 text-lg font-bold mb-4">Price: ${product.price}</p>
                                <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-10 py-3 rounded-2xl"
                                        title="Buy"
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} size="xl" />
                                    </button>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
            
        </div>
        
    );
}
