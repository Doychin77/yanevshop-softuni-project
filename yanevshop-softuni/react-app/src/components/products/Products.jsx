import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import { useCart } from '../../contexts/CartContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});
    const { addToCart } = useCart(); 

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://yanevshop.test/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://yanevshop.test/api/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            setErrors({ delete: 'Error deleting product' });
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        console.log(product);
    };

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen mb-10 mx-auto px-32">
                    <header className="py-6">
                        <h1 className="text-3xl font-bold text-gray-100 text-center">YanevShop</h1>
                        <p className="text-lg text-gray-300 text-center">Discover our featured products and latest offers!</p>
                        <div className="flex justify-center mt-4">
                            <Link to="/add-product" className="btn-primary px-4 py-2 mb-6 mt-6">
                                ADD PRODUCT
                            </Link>
                        </div>
                    </header>
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {products.map((product) => {
                            let images = [];
                            try {
                                images = JSON.parse(product.images);
                            } catch (e) {
                                console.error('Error parsing product images:', e);
                            }

                            return (
                                <div key={product.id} className="bg-white rounded-3xl shadow-md text-gray-800 flex flex-col justify-center items-center p-4"
                                                      style={{ maxHeight: '500px', overflowY: 'auto' }}>
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
                                                            style={{ width: '100%', maxHeight: '290px', objectFit: 'cover' }} // Full width
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
                                        {product.description.length > 27 ? product.description.substring(0, 27) + '...' : product.description}
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
                                            to={`/products/${product.id}/edit`}
                                            className="bg-[#242529] hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-2xl"
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="bg-[#242529] hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-2xl"
                                            title="View"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-2xl"
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </main>

                    {errors.delete && <div className="text-red-500 text-center mt-4">{errors.delete}</div>}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Products;
