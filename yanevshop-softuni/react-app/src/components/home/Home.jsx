import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import wl from '../../assets/wl.jpg';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false); // Track focus state

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
            setProducts(response.data);
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
        <div className="flex flex-col min-h-screen">
            <div className="home-background">
                <div className="content-overlay relative z-10 max-w-screen ml-16 mr-16 px-4">
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
                                            {category.name.length > 12 ? `${category.name.substring(0, 14)}` : category.name}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-3xl shadow-md text-gray-800 flex flex-col justify-center items-center p-4">
                                <img
                                    src={`http://yanevshop.test/storage/images/${product.image}`}
                                    alt={product.name}
                                    style={{ width: '180px', height: '230px', objectFit: 'cover' }}
                                    className="w-200px h-auto mb-4 rounded-md"
                                />
                                <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
                                <p className="text-gray-800 text-lg mb-4">
                                    {product.description.length > 30 ? product.description.substring(0, 30) : product.description}
                                </p>
                                <p className="text-gray-800 text-center font-bold mb-4">{product.price}$</p>
                                <Link to={`/products/${product.id}`} className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-xl">
                                    View Product
                                </Link>
                            </div>
                        ))}
                    </main>
                </div>
                <Footer />
            </div>
            
        </div>
    );
}
