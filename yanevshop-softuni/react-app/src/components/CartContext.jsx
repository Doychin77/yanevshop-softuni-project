import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) => prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity }
                : item
        ));
    };

    const placeOrder = () => {
        console.log('Order placed with items:', cart);
        clearCart();
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, placeOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
