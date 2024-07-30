import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/Footer';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewsVisible, setReviewsVisible] = useState(false); // State to manage review visibility
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProductDetails();
        fetchReviews();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://yanevshop.test/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            setError('Error fetching product details');
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://yanevshop.test/api/products/${id}/reviews`);
            setReviews(response.data);
            console.log('Reviews data:', response.data);
        } catch (error) {
            setError('Error fetching reviews');
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            await axios.post(`http://yanevshop.test/api/products/${id}/reviews`, {
                text: reviewText,
                rating,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setReviewText('');
            setRating(1);
            setShowReviewForm(false);
            fetchReviews();
        } catch (error) {
            console.error('Submit review error:', error);
            if (error.response && error.response.status === 401) {
                setError('Unauthorized - Please login to submit a review');
            } else {
                setError('Error submitting review');
            }
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="flex justify-center">
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={`text-yellow-400 ${index < rating ? 'text-yellow-400' : 'text-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    const truncateReviewText = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };

    const handleToggleReviews = () => {
        setReviewsVisible(!reviewsVisible);
    };

    const handleToggleReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };

    const ReviewItem = ({ review }) => {
        const [showFull, setShowFull] = useState(false);

        const handleToggle = () => {
            setShowFull(!showFull);
        };

        const reviewText = showFull ? review.text : truncateReviewText(review.text, 40);

        return (
            <li key={review.id} className="border-b border-gray-200 pb-4">
                <p className="text-gray-700 mb-2">{review.user?.username}</p>
                <div className="flex justify-center mb-2">
                    {renderStars(review.rating)}
                </div>
                <p>{reviewText}</p>
                {review.text.length > 40 && (
                    <button
                        onClick={handleToggle}
                        className="text-blue-500 hover:underline mt-2"
                    >
                        {showFull ? 'Show Less' : 'See More'}
                    </button>
                )}
            </li>
        );
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen mx-auto px-4">
                    <div className="text-center bg-white rounded-3xl shadow-md p-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {product && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={`http://yanevshop.test/storage/images/${product.image}`}
                                    alt={product.name}
                                    style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                                    className="rounded-md mb-4"
                                />
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
                                <h1 className="text-1xl font-bold text-gray-800">Description:</h1>
                                <p className="text-gray-800 text-lg mb-4 py-4" style={{ maxWidth: '740px', margin: '0 auto' }}>
                                    {product.description}
                                </p>
                                <p className="text-gray-900 text-lg font-bold mb-4">Price: ${product.price}</p>

                                <div className="flex items-center space-x-2 mb-4">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-green-600 hover:bg-green-500 text-white font-medium px-5 py-2 rounded-2xl"
                                        title="Buy"
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} size="xl" />
                                    </button>
                                    <button
                                        onClick={handleToggleReviewForm}
                                        className="btn-primary px-4 py-2"
                                    >
                                        ADD REVIEW
                                    </button>

                                    <button onClick={handleToggleReviews} className="btn-primary px-4 py-2">
                                        REVIEWS
                                    </button>

                                </div>
                            </div>
                        )}
                        <div className="mt-8">

                            {showReviewForm && (
                                <form onSubmit={handleReviewSubmit} className="flex flex-col mb-6">
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        rows="4"
                                        className="border-2 rounded-2xl p-2 mb-4"
                                        placeholder="Write your review here..."
                                    />
                                    <select
                                        value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}
                                        className="border-2 rounded-2xl p-2 mb-4"
                                    >
                                        <option value={1}>1 Star</option>
                                        <option value={2}>2 Stars</option>
                                        <option value={3}>3 Stars</option>
                                        <option value={4}>4 Stars</option>
                                        <option value={5}>5 Stars</option>
                                    </select>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn-primary px-4 py-2"
                                        >
                                            Submit Review
                                        </button>
                                        <button
                                            onClick={handleToggleReviewForm}
                                            className="bg-red-600 rounded-2xl ml-2 text-white font-medium hover:bg-red-500 px-4 py-2"
                                        >
                                            Cancel Review
                                        </button>
                                    </div>
                                </form>
                            )}
                            {reviewsVisible && (
                                <div>
                                    {reviews.length === 0 ? (
                                        <p className="text-gray-500">No reviews yet.</p>
                                    ) : (
                                        <ul className="space-y-4">
                                            {reviews.map((review) => (
                                                <ReviewItem review={review} key={review.id} />
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
