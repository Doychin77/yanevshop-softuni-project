import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../footer/Footer';
import { useCart } from '../../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../spinner/Spinner'; // Ensure this path is correct
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';

const CategoryProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get(`http://yanevshop.test/api/categories/${id}/products`);
                setProducts(response.data.products);
                setCategoryName(response.data.name);
            } catch (error) {
                console.error('Error fetching category products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [id]);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-xl mx-auto px-4 py-8">
                    <header className="py-6">
                        <h1 className="text-3xl font-bold text-gray-100 text-center mb-4">
                            {categoryName}
                        </h1>
                    </header>
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 ">
                        {products.length > 0 ? (
                            products.map((product) => {
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
                                                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                                                className="rounded-md"
                                                                onLoad={() => console.log(`Image loaded: ${imageUrl}`)}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = 'http://yanevshop.test/storage/images/default.jpg';
                                                                    console.error(`Image failed to load: ${imageUrl}`);
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
