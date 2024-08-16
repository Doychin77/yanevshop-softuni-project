// src/components/ProductGrid.jsx

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

/* eslint-disable react/prop-types */
const ProductGrid = ({ filteredProducts, handleAddToCart }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const isFavorite = (productId) => {
        return favorites.some(favProduct => favProduct.id === productId);
    };

    const handleToggleFavorite = (product) => {
        let updatedFavorites;

        if (isFavorite(product.id)) {
            updatedFavorites = favorites.filter(favProduct => favProduct.id !== product.id);
        } else {
            updatedFavorites = [...favorites, product];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                    let images = [];
                    try {
                        // Default to empty array if parsing fails
                        images = JSON.parse(product.images || '[]') || [];
                    } catch (e) {
                        console.error('Error parsing product images:', e);
                        images = []; // Ensure images is an array even if parsing fails
                    }
                

                    return (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="bg-white rounded-3xl flex flex-col justify-center items-center p-4"
                            style={{ textDecoration: 'none' }}
                        >
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 3000 }}
                                modules={[Navigation, Autoplay]}
                                className="swiper-container mb-4"
                                style={{ width: '100%', height: 'auto' }}
                            >
                                {(images.length > 0 ? images : ['default.jpg']).map((image, index) => {
                                    const imageUrl = image.includes('default.jpg')
                                        ? 'http://yanevshop.test/storage/images/default.jpg'
                                        : `http://yanevshop.test/storage/images/${image}`;

                                    return (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                style={{ width: '100%', height: '230px', objectFit: 'cover' }}
                                                className="rounded-md"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'http://yanevshop.test/storage/images/default.jpg';
                                                }}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <h2 className="text-base font-semibold mb-2 text-center">{product.name}</h2>
                            <div className="flex items-center">
                                <p className="text-red-600 font-semibold text-center">{product.price}$</p>
                                <button
                                    onClick={(event) => handleAddToCart(product, event)}
                                    className="ml-2 p-2 rounded-full text-green-600 hover:text-green-800 transition-colors duration-300"
                                    title="Buy"
                                >
                                    <FontAwesomeIcon icon={faCartPlus} size="lg" />
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleToggleFavorite(product);
                                    }}
                                    className={`ml-1 p-2 rounded-full ${isFavorite(product.id) ? 'text-red-600' : 'text-gray-500'} hover:text-red-600 transition-colors duration-300`}
                                    title={isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                >
                                    <FontAwesomeIcon icon={isFavorite(product.id) ? faHeart : faHeartBroken} size="xl" />
                                </button>

                            </div>
                        </Link>
                    );
                })
            ) : (
                <div className="text-center text-gray-100 text-3xl font-medium col-span-1 md:col-span-2 lg:col-span-6">
                    No products found
                </div>
            )}
        </main>
    );
};

export default ProductGrid;
