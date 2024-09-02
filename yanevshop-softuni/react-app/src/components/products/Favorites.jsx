import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import Spinner from '../spinner/Spinner'; // Ensure this path is correct
import { useCart } from '../../contexts/CartContext';
import SearchInput from '../SearchInput';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchFavorites = () => {
            setLoading(true);
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavorites(storedFavorites);
            setFilteredFavorites(storedFavorites);
            setLoading(false);
        };

        fetchFavorites();
    }, []);

    useEffect(() => {
        const filtered = favorites.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFavorites(filtered);
    }, [searchTerm, favorites]);

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop propagation to prevent redirecting when adding to cart
        addToCart(product);
    };

    const handleRemoveFromFavorites = (productId, e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop propagation to prevent redirecting when removing from favorites
        const updatedFavorites = favorites.filter(product => product.id !== productId);
        setFavorites(updatedFavorites);
        setFilteredFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
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
                            Favorites
                        </h1>
                    </header>

                    <SearchInput
                        searchTerm={searchTerm}
                        handleSearch={handleSearch}
                        isSearchFocused={false}
                        setIsSearchFocused={() => { }}
                    />

                    <main className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {filteredFavorites.length > 0 ? (
                            filteredFavorites.map((product) => {
                                let images = [];
                                try {
                                    images = JSON.parse(product.images || '[]') || [];
                                } catch (e) {
                                    console.error('Error parsing product images:', e);
                                    images = [];
                                }

                                return (
                                    <Link
                                        to={`/products/${product.id}`} // Assuming product details page is at this route
                                        key={product.id}
                                        className="bg-white rounded-3xl flex flex-col justify-center items-center p-4"
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
                                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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
                                                onClick={(e) => handleAddToCart(product, e)}
                                                className="bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-2 py-1 rounded-2xl ml-2"
                                                title="Buy"
                                            >
                                                <FontAwesomeIcon icon={faCartPlus} size="sm" />
                                            </button>
                                            <button
                                                onClick={(e) => handleRemoveFromFavorites(product.id, e)}
                                                className="bg-red-600 hover:bg-red-500 text-white font-semibold text-sm px-2 py-1 rounded-2xl ml-2"
                                                title="Remove from Favorites"
                                            >
                                                <FontAwesomeIcon icon={faHeartCircleXmark} size='lg'/>
                                            </button>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="text-center text-gray-100 text-3xl font-medium col-span-1 md:col-span-2 lg:col-span-5">
                                <p className="mb-4">
                                    Looks like your favorites are empty.
                                </p>
                                <p>
                                    Start browsing and add your top picks to this list!
                                </p>
                            </div>
                        )}
                    </main>
                    <div className="flex justify-center mt-20">
                        <Link
                            to="/"
                            className="btn-primary px-4 py-2"
                        >
                            HOME
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;
