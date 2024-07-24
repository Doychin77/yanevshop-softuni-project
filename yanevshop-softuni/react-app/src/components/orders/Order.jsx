import React, { useState } from 'react';
import { useCart } from '../CartContext'; // Import the CartContext
import wl from '../../assets/wl.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart(); // Get cart items and methods from the CartContext
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    if (!cart) {
        return <div className="text-red-500">Error: Cart context is not available.</div>;
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo({
            ...deliveryInfo,
            [name]: value,
        });
    };

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        console.log(`Updating quantity for product ${productId} to ${newQuantity}`);
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://yanevshop.test/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deliveryInfo),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Order submitted', result);
    
            // Optionally handle success, e.g., show a confirmation message or redirect
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };
    

    // Calculate total price
    const calculateTotalPrice = () => {
        return (cart || []).reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
                <div className="flex flex-wrap max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 space-x-4">
                    {/* Cart Items */}
                    <div className="flex-1 min-w-[300px]">
                        <h2 className="text-2xl text-center font-bold mb-4">Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <div className="text-center font-bold text-gray-500">Your cart is empty.</div>
                        ) : (
                            <div>
                                <ul className="space-y-4">
                                    {cart.map(item => (
                                        <li key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl shadow-sm">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={`http://yanevshop.test/storage/images/${item.image}`}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                                    <p className="text-gray-600">${item.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e)}
                                                    className="w-14 py-1 text-center border border-gray-300 rounded-2xl"
                                                />
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-2xl"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-center mt-6 pt-4">
                                    <div className="text-lg ml-6 font-semibold">Total Price: ${calculateTotalPrice()}</div>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={clearCart}
                                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-2xl hover:bg-red-500"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Delivery Info Form */}
                    <div className="flex-1 min-w-[300px] mt-6 md:mt-0">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Delivery Information</h2>
                        <form onSubmit={handleSubmit} className="p-4 border rounded-2xl bg-white">
                            <div className="mb-4">
                                <label htmlFor="name" className="block ml-1 text-gray-800">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={deliveryInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block ml-1 text-gray-800">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={deliveryInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block ml-1 text-gray-800">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={deliveryInfo.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block ml-1 text-gray-800">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={deliveryInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="w-32 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-2xl"
                                >
                                    Purchase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
