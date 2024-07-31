import { useState, useEffect } from 'react';
import { useCart } from '../CartContext'; 
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/Footer';

const Order = () => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart(); // Get cart items and methods from the CartContext
    const navigate = useNavigate();
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/cart'); 
        }
    }, [cart, navigate]);


    if (!cart) {
        return <div className="text-red-500">Error: Cart context is not available.</div>;
    }

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo({
            ...deliveryInfo,
            [name]: value,
        });
    };

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...deliveryInfo,
            products: cart
        };

        try {
            const token = localStorage.getItem('token');
            const orderResponse = await fetch('http://yanevshop.test/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (orderResponse.ok) {
                const emailResponse = await fetch('http://yanevshop.test/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (emailResponse.ok) {
                    clearCart(); 
                    navigate('/successful-order'); 
                } else {
                    alert('Order saved but failed to send email.');
                }
            } else {
                alert('Failed to submit order.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the order.');
        }
    };

    
    const calculateTotalPrice = () => {
        return (cart || []).reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-lg mx-auto px-4 py-8">
                    <div className="form-container p-6 flex flex-wrap space-x-4">
                        {/* Cart Items */}
                        <div className="flex-1 min-w-[300px]">
                            <h2 className="text-2xl text-gray-100 font-bold text-center mb-6">Shopping Cart</h2>
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
                                                        <p className="text-gray-300">${item.price}</p>
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
                                    <div className="flex justify-between mt-6 border-t border-orange-500 pt-4 text-gray-100">
                                        <div className="text-lg font-semibold">Total Price:</div>
                                        <div className="text-lg font-semibold">${calculateTotalPrice()}</div>
                                    </div>
                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={clearCart}
                                            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-2xl transition-colors"
                                        >
                                            CLEAR CART
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Delivery Info Form */}
                        <div className="flex-1 min-w-[300px] mt-6 md:mt-0">
                            <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">
                                Delivery Information
                            </h2>
                            <form onSubmit={handleSubmit} className="form-container p-6">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-md font-medium text-gray-100">
                                        <p className="text-center text-orange-500">Name</p>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={deliveryInfo.name}
                                        onChange={handleInputChange}
                                        className="input-field-primary w-full mt-2 p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-md font-medium text-gray-100">
                                        <p className="text-center text-orange-500">Email</p>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={deliveryInfo.email}
                                        onChange={handleInputChange}
                                        className="input-field-primary w-full mt-2 p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-md font-medium text-gray-100">
                                        <p className="text-center text-orange-500">Address</p>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={deliveryInfo.address}
                                        onChange={handleInputChange}
                                        className="input-field-primary w-full mt-2 p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-md font-medium text-gray-100">
                                        <p className="text-center text-orange-500">Phone</p>
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={deliveryInfo.phone}
                                        onChange={handleInputChange}
                                        className="input-field-primary w-full mt-2 p-2"
                                        required
                                    />
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button
                                        type="submit"
                                        className="btn-primary px-4 py-2"
                                    >
                                        PURCHASE
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
};

export default Order;
