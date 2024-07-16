import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get(`http://yanevshop.test/api/categories/${id}/products`);
                setProducts(response.data.products);
                setCategoryName(response.data.name);
            } catch (error) {
                console.error('Error fetching category products:', error);
            }
        };

        fetchCategoryProducts();
    }, [id]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
                    {categoryName}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-gray-800 rounded-lg shadow-md text-gray-100 flex flex-col justify-center items-center p-4">
                            <img src={`http://yanevshop.test/storage/images/${product.image}`} alt={product.name} style={{ width: '270px', height: '320px', objectFit: 'cover'}} className="w-200px h-auto mb-4 rounded-md" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-100">{product.name}</h2>
                            <p className="text-gray-300 mb-4">{product.description}</p>
                            <p className="text-gray-200 font-bold mb-4">{product.price}$</p>
                            <div className="flex justify-center">
                                <Link to={`/products/${product.id}`} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg ml-2">
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <Link to="/categories" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
                        Back to Categories
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryProducts;
