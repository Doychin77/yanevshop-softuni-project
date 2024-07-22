import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../../footer/Footer';
import wl from '../../../assets/wl.jpg';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
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
                                {/* Add more product details here as needed */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
