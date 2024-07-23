import React from 'react';
import { NavLink } from 'react-router-dom';

const CartDropdown = ({ cart, totalItems }) => {
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
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <NavLink
                            to="/order"
                            style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#1d4ed8', // Background color of the button
                                color: '#ffffff', // Text color of the button
                                borderRadius: '0.8rem', // Rounded corners
                                textDecoration: 'none',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                            activeStyle={{
                                backgroundColor: '#2563eb' // Darker color for active state
                            }}
                        >
                            Order
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartDropdown;
