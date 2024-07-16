import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';
import wallpaper2 from '../../assets/wallpaper2.jpg'; 
export default function Home() {
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
                    <h1 className="text-3xl font-bold text-gray-100 text-center">Welcome to My Shop</h1>
                    <p className="text-lg text-gray-300 text-center">Discover our featured products and latest offers!</p>
                </header>
                
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-gray-800 rounded-lg shadow-md text-gray-100 flex flex-col justify-center items-center p-4">
                            <img src={`http://yanevshop.test/storage/images/${product.image}`} alt={product.name} style={{ width: '270px', height: '320px', objectFit: 'cover'}} className="w-200px h-auto mb-4 rounded-md" />
                            <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
                            <p className="text-gray-300 text-center mb-4">{product.description}</p>
                            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg">
                                View Product
                            </button>
                        </div>
                    ))}
                </main>
                <Footer />
            </div>
        </div>
    );
}
