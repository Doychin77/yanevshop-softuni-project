import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import Spinner from '../spinner/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
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
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
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
        } finally {
            setLoading(false);
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

    const handleAddToCart = (product, event) => {
        event.preventDefault();
        event.stopPropagation();
        addToCart(product);
        console.log(product);
    };

    if (loading) {
        return (
            <Spinner />
        );
    }

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            {categories.map((category) => (
                                <div key={category.id} className="form-container p-4 flex flex-col items-center">
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

                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 ">
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
                </div>
                <Footer />
            </div>
        </div>
    );
}
