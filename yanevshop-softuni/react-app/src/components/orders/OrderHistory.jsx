import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Spinner from '../spinner/Spinner';
import wl from '../../assets/wl.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate("/");
    };


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://yanevshop.test/api/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setOrders(data);
                    } else {
                        console.error('Expected an array but got:', data);
                        setError('Unexpected response format');
                    }
                } else if (response.status === 401) {
                    navigate('/login');
                } else {
                    throw new Error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleDelete = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://yanevshop.test/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setOrders(orders.filter(order => order.id !== orderId));
            } else {
                throw new Error('Failed to delete the order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            setError(error.message);
        } finally {
            setLoading(false); // Ensure loading is set to false here
        }
    };

    if (loading) {
        return (
            <Spinner
                backgroundImage={wl}
                loaderColor="#f97316"
                size={150}
            />
        );
    }

    if (error) {
        return <div className="text-red-500">Failed to fetch orders: {error}</div>;
    }

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-2xl mx-auto px-4 py-8">
                    <h2 className="text-2xl text-orange-500 font-bold text-center mb-6">ORDER HISTORY</h2>
                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <FontAwesomeIcon icon={faShoppingCart} size="3x" className="text-gray-400 mb-4" />
                            <p className="text-lg font-semibold text-gray-300 mb-2">No orders found.</p>
                            <p className="text-gray-300">Looks like you haven't placed any orders yet.</p>
                            <button
                                onClick={handleContinueShopping}
                                className="btn-primary py-2 px-4 mt-4 mb-6"
                            >
                                GO SHOPPING
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {orders.map(order => (
                                <div key={order.id} className="relative form-container text-center  p-4">
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black"
                                    >
                                        <FontAwesomeIcon icon={faCircleXmark} color='#f0190a' size='2xl'/>
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
