import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import wallpaper2 from '../../assets/wallpaper2.jpg';

const Products = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <div className="home-background min-h-screen" style={{ backgroundImage: `url(${wallpaper2})`, backgroundSize: 'cover' }}>
            <div className="max-w-screen mx-auto px-4">
                <header className="py-6">
                    <h1 className="text-3xl font-bold text-gray-100 text-center">YanevShop</h1>
                    <p className="text-lg text-gray-300 text-center">Discover our featured products and latest offers!</p>
                    <div className="flex justify-center mt-4">
                        <Link to="/add-product" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">
                            Add New Product
                        </Link>
                    </div>
                </header>
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-gray-800 rounded-lg shadow-md text-gray-100 flex flex-col justify-center items-center p-4">
                            <img src={`http://yanevshop.test/storage/images/${product.image}`} alt={product.name} className="w-200px h-auto mb-4 rounded-md" />
                            <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
                            <p className="text-gray-300 text-center mb-4">{product.description}</p>
                            <p className="text-gray-300 text-center mb-4">{product.price}$</p>
                            <div className="flex justify-center">
                                <Link
                                    to={`/products/${product.id}/edit`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mr-2"
                                >
                                    Edit
                                </Link>
                                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg">
                                    View Product
                                </button>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default Products;
