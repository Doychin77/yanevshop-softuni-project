// src/components/ProductGrid.js

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


/* eslint-disable react/prop-types */
const ProductGrid = ({ filteredProducts, handleAddToCart }) => {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                    let images = [];
                    try {
                        images = JSON.parse(product.images || '[]');
                    } catch (e) {
                        console.error('Error parsing product images:', e);
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
                                {images.length > 0 ? (
                                    images.map((image, index) => {
                                        const imageUrl = `http://yanevshop.test/storage/images/${image}`;
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
                                    })
                                ) : (
                                    <SwiperSlide>
                                        <img
                                            src="http://yanevshop.test/storage/images/default.jpg"
                                            alt="Default"
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                            className="rounded-md"
                                            onLoad={() => console.log('Default image loaded')}
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                            <h2 className="text-base font-semibold mb-2 text-center">{product.name}</h2>
                            <div className="flex">
                                <p className="text-red-600 font-semibold text-center">{product.price}$</p>
                                <button
                                    onClick={(event) => handleAddToCart(product, event)}
                                    className="bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-2 py-1 rounded-2xl ml-2"
                                    title="Buy"
                                >
                                    <FontAwesomeIcon icon={faCartPlus} size="sm" />
                                </button>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div className="text-center text-gray-100 text-3xl font-medium col-span-1 md:col-span-2 lg:col-span-5">
                    No products found
                </div>
            )}
        </main>
    );
};

export default ProductGrid;
