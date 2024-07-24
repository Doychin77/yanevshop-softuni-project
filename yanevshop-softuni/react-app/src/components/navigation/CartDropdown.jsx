import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ({ cart, totalItems }) => {

    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate('/order'); // Navigate to /order page
    };
    return (
        <div style={{
            position: 'absolute',
            top: 'calc(100% + 22px)',
            right: '-90px', // Adjust this value to move the dropdown more to the right
            width: '240px',
            backgroundColor: '#05192e', // Background color of the dropdown
            border: '1px solid #e5e7eb',
            borderRadius: '0.9rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'center', // Center align the heading
                margin: '0 0 1rem 0',
                color: '#ebf1f7' // Heading color
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
                        {cart.map(item => (
                            <li key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0.5rem 0'
                            }}>
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center mt-1">
                        <button
                            onClick={handleOrderClick}
                            className="bg-blue-600 ml-3 text-white font-semibold py-2 px-4 rounded-2xl hover:bg-blue-500"
                        >
                            Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartDropdown;
