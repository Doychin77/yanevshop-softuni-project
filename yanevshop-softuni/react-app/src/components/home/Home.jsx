import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        // Filter products based on searchTerm
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://yanevshop.test/api/products');
            const productsWithFirstImage = response.data.map(product => {
                const images = JSON.parse(product.images || '[]');
                return {
                    ...product,
                    image: images.length > 0 ? `http://yanevshop.test/storage/images/${images[0]}` : 'http://yanevshop.test/storage/images/default.jpg',
                };
            });
            setProducts(productsWithFirstImage);
        } catch (error) {
            console.error('Error fetching products:', error);
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="content-overlay relative z-10 max-w-screen mx-24 px-4 content-wrap">
                    <header className="py-6">
                        <h1 className="text-3xl font-bold text-gray-100 text-center">Welcome to Yanev Shop</h1>
                        <p className="text-lg text-gray-300 text-center">Discover our featured products and latest offers!</p>
                    </header>

                    {/* Search Input */}
                    <div className="text-center mb-6">
                        <input
                            type="text"
                            placeholder={isSearchFocused ? '' : 'Search products...'}
                            value={searchTerm}
                            onChange={handleSearch}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="home-search"
                        />
                    </div>

                    <section className="categories-section py-8 mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {categories.map((category) => (
                                <div key={category.id} className="bg-white dark:bg-gray-700 rounded-3xl shadow-md p-4 border-2 border-orange-500 flex flex-col items-center">
                                    <Link
                                        to={`/categories/${category.id}/products`}
                                        className="flex flex-col items-center text-center hover:text-blue-400 transition-colors duration-300"
                                    >
                                        <img
                                            src={`http://yanevshop.test/storage/images/${category.image}`}
                                            alt={category.name}
                                            className="w-20 h-20 object-cover rounded-full mb-2"
                                        />
                                        <span className="text-xl font-semibold text-gray-900 dark:text-white hover:text-orange-500 transition-colors duration-400">
                                            {category.name.length > 12 ? `${category.name.substring(0, 14)}...` : category.name}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => {
                                let images = [];
                                try {
                                    images = JSON.parse(product.images || '[]');
                                } catch (e) {
                                    console.error('Error parsing product images:', e);
                                }

                                return (
                                    <div key={product.id} className="bg-white rounded-3xl shadow-md text-gray-800 flex flex-col justify-center items-center p-4">
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
                            })
                        ) : (
                            <div className="text-center text-gray-100 text-3xl font-medium col-span-1 md:col-span-2 lg:col-span-5">
                                No products found
                            </div>
                        )}
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
}
