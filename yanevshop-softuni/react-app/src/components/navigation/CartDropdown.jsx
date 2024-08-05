import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartDropdown = () => {
    const context = useCart();
    const navigate = useNavigate();
    const { cart, removeFromCart } = context;

    const handleOrderClick = () => {
        navigate('/order'); // Navigate to /order page
    };

    // Calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    
    // Calculate total items
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div style={{
            position: 'absolute',
            top: 'calc(100% + 22px)',
            right: '-90px',
            width: '300px', // Adjust width as needed
            backgroundColor: '#242629',
            border: '1px solid #F97316',
            borderRadius: '0.9rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'center',
                margin: '0 0 1rem 0',
                color: '#ebf1f7'
            }}>
                Cart Items
            </h3>
            {totalItems === 0 ? (
                <div style={{ fontSize: '0.875rem', color: '#ebf1f7', textAlign: 'center' }}>
                    Your cart is empty.
                </div>
            ) : (
                <>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ebf1f7' }}>
                        {cart.map(item => {
                            // Assuming images is an array of strings or JSON-encoded string
                            const images = Array.isArray(item.images) ? item.images : JSON.parse(item.images || '[]');
                            const imageUrl = images.length > 0 
                                ? `http://yanevshop.test/storage/images/${images[0]}` 
                                : 'http://yanevshop.test/storage/images/default.jpg'; // Fallback image

                            return (
                                <li key={item.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.5rem 0',
                                    borderBottom: '1px solid #333',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={imageUrl}
                                        alt={item.name}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            borderRadius: '0.5rem',
                                            marginRight: '0.75rem'
                                        }}
                                        onError={(e) => {
                                            console.error(`Failed to load image at ${imageUrl}`);
                                            e.target.src = 'http://yanevshop.test/storage/images/default.jpg'; // Fallback on error
                                        }}
                                    />
                                    <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{item.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span>x{item.quantity}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#fc0303',
                                                    fontSize: '1.5rem', // Increase font size for larger 'x'
                                                    cursor: 'pointer',
                                                    marginLeft: '0.5rem',
                                                    padding: 0,
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} size='xs' />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div style={{ margin: '1rem 0', color: '#ebf1f7', fontSize: '1rem', textAlign: 'center' }}>
                        <p>Total: {totalPrice}$</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleOrderClick}
                            className="bg-orange-500 transition-colors duration-300 text-white font-medium py-2 px-4 rounded-2xl hover:bg-black"
                        >
                            ORDER
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartDropdown;
