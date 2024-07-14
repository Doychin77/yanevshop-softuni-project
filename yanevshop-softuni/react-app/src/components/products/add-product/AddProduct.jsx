import { useState } from 'react';
import Footer from '../footer/Footer';

export default function Products() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API request to save product)
        console.log('Form submitted:', { productName, productDescription, productPrice, productImage });
        // Reset form fields after submission
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImage(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Add New Product</h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <textarea
                            placeholder="Product Description"
                            rows="4"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                        <input
                            type="number"
                            placeholder="Product Price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product Image
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleImageChange}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}
