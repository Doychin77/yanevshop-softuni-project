import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../footer/Footer';
import { useCart } from '../../../contexts/CartContext';
import Spinner from '../../spinner/Spinner'; // Ensure this path is correct
import SearchInput from '../../SearchInput';
import ProductGrid from '../../products/ProductGrid';

const CategoryProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get(`http://yanevshop.test/api/categories/${id}/products`);
                setProducts(response.data.products);
                setCategoryName(response.data.name);
                setFilteredProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching category products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [id]);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleAddToCart = (product, event) => {
        event.preventDefault();
        event.stopPropagation();
        addToCart(product);
    };

    const handleToggleFavorite = (product) => {
        let updatedFavorites;

        if (favorites.some(favProduct => favProduct.id === product.id)) {
            updatedFavorites = favorites.filter(favProduct => favProduct.id !== product.id);
        } else {
            updatedFavorites = [...favorites, product];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
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
                <div className="content-overlay relative z-10 max-w-screen mx-24 px-4 content-wrap">
                    <header className="py-6">
                        <h1 className="text-3xl font-bold text-gray-100 text-center mb-4">
                            {categoryName}
                        </h1>
                    </header>

                    <SearchInput
                        searchTerm={searchTerm}
                        handleSearch={handleSearch}
                        isSearchFocused={isSearchFocused}
                        setIsSearchFocused={setIsSearchFocused}
                    />

                    <ProductGrid
                        filteredProducts={filteredProducts}
                        handleAddToCart={handleAddToCart}
                        handleToggleFavorite={handleToggleFavorite}
                    />

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
