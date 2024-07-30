import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const response = await fetch('http://yanevshop.test/api/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include token in request headers
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched orders:', data); // Log the response to check structure
                    
                    // Directly set the data if it's an array
                    if (Array.isArray(data)) {
                        setOrders(data); // Set orders directly
                    } else {
                        console.error('Expected an array but got:', data);
                        setError('Unexpected response format');
                    }
                } else if (response.status === 401) {
                    // Redirect to login if unauthorized
                    navigate('/login');
                } else {
                    throw new Error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error.message);
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleDelete = async (orderId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const response = await fetch(`http://yanevshop.test/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in request headers
                },
            });
    
            if (response.ok) {
                setOrders(orders.filter(order => order.id !== orderId)); // Remove deleted order from state
            } else {
                throw new Error('Failed to delete the order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            setError(error.message);
        }
    };

    if (error) {
        return <div className="text-red-500">Failed to fetch orders: {error}</div>;
    }

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-2xl mx-auto px-4 py-8">
                    <h2 className="text-2xl text-orange-500 font-bold text-center mb-6">ORDER HISTORY</h2>
                    {orders.length === 0 ? (
                        <div className="text-center font-bold text-gray-500">No orders found.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {orders.map(order => (
                                <div key={order.id} className="relative form-container text-center  p-4">
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                                    >
                                        <span className="text-lg font-bold">&times;</span>
                                    </button>
                                    <h3 className="text-lg font-semibold text-gray-100">Order #{order.id}</h3>
                                    <p className="text-gray-300">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                                    <div className="mt-4">
                                        <h4 className="text-md font-semibold text-gray-100">Products:</h4>
                                        <ul className="space-y-2">
                                            {order.products.map(product => (
                                                <li key={product.id} className="text-gray-300">
                                                    {product.name} - ${product.price} x {product.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="text-md font-semibold text-gray-100">Delivery Info:</h4>
                                        <p className="text-gray-300">Name: {order.name}</p>
                                        <p className="text-gray-300">Address: {order.address}</p>
                                        <p className="text-gray-300">Phone: {order.phone}</p>
                                        <p className="text-gray-300">Email: {order.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default OrderHistory;
