import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/Footer';

const Cart = () => {
    const context = useCart();
    const navigate = useNavigate();
    if (!context) {
        return <div className="text-red-500">Error: Cart context is not available.</div>;
    }

    const { cart, removeFromCart, clearCart, updateQuantity } = context;

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleOrderClick = () => {
        navigate('/order'); 
    };

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-sm mx-auto px-4 py-8">
                    <div className="form-container p-6">
                        <h1 className="text-lg font-medium text-gray-100 text-center mb-6">Shopping Cart</h1>
                        {cart.length === 0 ? (
                            <div className="text-center font-bold text-gray-500">Your cart is empty.</div>
                        ) : (
                            <div>
                                <ul className="space-y-6">
                                    {cart.map(item => (
                                        <li key={item.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-3xl shadow-md">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={`http://yanevshop.test/storage/images/${item.image}`}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-100">{item.name}</h3>
                                                    <p className="text-gray-300 text-sm">${item.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e)}
                                                    className="w-16 py-1 text-center bg-gray-800 border border-gray-600 rounded-2xl text-gray-100 shadow-sm"
                                                    style={{ border: '2px solid transparent' }}
                                                    onFocus={(e) => e.target.style.border = '2px solid orange'}
                                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                                />
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-2xl transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between mt-6 border-t border-gray-600 pt-4">
                                    <div className="text-lg font-semibold text-gray-100">Total Price:</div>
                                    <div className="text-lg font-semibold text-gray-100">${calculateTotalPrice()}</div>
                                </div>
                                <div className="flex justify-center mt-6 space-x-4">
                                    <button
                                        onClick={clearCart}
                                        className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-2xl transition-colors"
                                    >
                                        CLEAR CART
                                    </button>
                                    <button
                                        onClick={handleOrderClick}
                                        className="btn-primary py-2 px-4"
                                    >
                                        ORDER
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Cart;
