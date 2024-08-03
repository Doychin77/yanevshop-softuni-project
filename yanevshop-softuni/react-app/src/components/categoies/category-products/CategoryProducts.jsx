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
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {products.map((product) => {
                            let images = [];
                            try {
                                images = JSON.parse(product.images);
                            } catch (e) {
                                console.error('Error parsing product images:', e);
                            }

                            return (
                                <div key={product.id} className="bg-white rounded-3xl shadow-md text-gray-800 flex flex-col justify-center items-center p-4">
                                    <Swiper
                                        spaceBetween={10} // Adjust spacing between slides
                                        slidesPerView={1} // Number of slides visible at a time
                                        navigation
                                        autoplay={{ delay: 3000 }} // Autoplay configuration
                                        modules={[Navigation, Autoplay]} // Include Autoplay module
                                        className="swiper-container mb-4"
                                        style={{ width: '100%', height: 'auto' }} // Ensure Swiper takes full width
                                    >
                                        {images.length > 0 ? (
                                            images.map((image, index) => {
                                                const imageUrl = `http://yanevshop.test/storage/images/${image}`;
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <img
                                                            src={imageUrl}
                                                            alt={product.name}
                                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // Full width
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
                                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // Full width
                                                    className="rounded-md"
                                                    onLoad={() => console.log('Default image loaded')}
                                                />
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
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
                                        {product.description.length > 30 ? product.description.substring(0, 30) + '...' : product.description}
                                    </p>
                                    <p className="text-gray-800 text-center mb-4">{product.price}$</p>
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-4 py-2 rounded-2xl"
                                            title="Buy"
                                        >
                                            <FontAwesomeIcon icon={faCartPlus} size="lg" />
                                        </button>
                                        
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="bg-[#242529] hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-2xl"
                                            title="View"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </Link>
                                        
                                    </div>
                                </div>
                            );
                        })}
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
