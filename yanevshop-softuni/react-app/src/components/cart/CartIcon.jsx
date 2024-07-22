import React from 'react';
import { useCart } from './CartContext';

const CartIcon = () => {
    const { cart } = useCart();

    return (
        <div className="relative">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 6h-2.18l-1.65-3.31A2 2 0 0 0 16.29 2H7.71a2 2 0 0 0-1.86 1.69L4.18 6H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.6l1.13 6.24a2 2 0 0 0 1.95 1.76h11.54a2 2 0 0 0 1.95-1.76L21.4 10H23a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-2 3h-1.12L16.7 9.54a2 2 0 0 0-1.88-1.23H9.18a2 2 0 0 0-1.88 1.23L5.12 9H4v2h15V9zm-5.19 8H8.19L7 12h8l-1.19 6zM9 4h6l1.19 2H8.81L9 4zm-4.9 6H4.09l1.13 6.24a2 2 0 0 0 1.95 1.76h11.54a2 2 0 0 0 1.95-1.76L20.9 10H16a2 2 0 0 0-1.95 1.76L13.9 19H5.81a2 2 0 0 0-1.95-1.76L2.1 10z" />
            </svg>
            {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">{cart.length}</span>
            )}
        </div>
    );
};

export default CartIcon;
