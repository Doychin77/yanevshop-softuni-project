import React from 'react';
import { useCart } from '../CartContext';
import wl from '../../assets/wl.jpg';

const Cart = () => {
    const context = useCart();

    if (!context) {
        return <div className="text-red-500">Error: Cart context is not available.</div>;
    }

    const { cart, removeFromCart, clearCart, updateQuantity, placeOrder } = context;

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
                <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-md">
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
                                                className="w-16 text-center border border-gray-300 rounded-lg"
                                            />
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded-2xl hover:bg-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between mt-6 border-t border-gray-300 pt-4">
                                <div className="text-lg font-semibold">Total Price:</div>
                                <div className="text-lg font-semibold">${calculateTotalPrice()}</div>
                            </div>
                            <div className="flex justify-around mt-6">
                                <button
                                    onClick={clearCart}
                                    className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-500"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={placeOrder}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-500"
                                >
                                    Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
