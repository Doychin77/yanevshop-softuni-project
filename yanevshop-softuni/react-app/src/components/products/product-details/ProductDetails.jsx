import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { useUser } from '../../../contexts/useUser'; // Import custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/Footer';
import Spinner from '../../spinner/Spinner';

/* eslint-disable react/prop-types */
export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewsVisible, setReviewsVisible] = useState(false);
    const [mainImage, setMainImage] = useState(''); // State for the main image
    const { addToCart } = useCart();
    const { user } = useUser(); // Get user context

    useEffect(() => {
        fetchProductDetails();
        fetchReviews();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://yanevshop.test/api/products/${id}`);
            const product = response.data;

            const images = product.images ? JSON.parse(product.images) : [];
            product.images = images;

            setProduct(product);
            if (images.length > 0) {
                setMainImage(`http://yanevshop.test/storage/images/${images[0]}`); // Set the first image as main
            }
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
        } catch (error) {
            setError('Error fetching reviews');
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        console.log(product);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const reviewPayload = { rating, text: reviewText.trim() };

            await axios.post(`http://yanevshop.test/api/products/${id}/reviews`, reviewPayload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setReviewText('');
            setRating(1);
            setShowReviewForm(false);
            fetchReviews();
        } catch (error) {
            console.error('Submit review error:', error);
            setError('Error submitting review');
        }
    };

    const handleEditReview = async (reviewId, updatedText, updatedRating) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://yanevshop.test/api/reviews/${reviewId}`, {
                text: updatedText,
                rating: Number(updatedRating)
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Edit review response:', response.data);
            fetchReviews(); // Refresh the reviews list
        } catch (error) {
            console.error('Edit review error:', error);
            setError('Error editing review');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://yanevshop.test/api/reviews/${reviewId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchReviews();
        } catch (error) {
            console.error('Delete review error:', error);
            setError('Error deleting review');
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="flex justify-center">
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={`text-yellow-200 ${index < rating ? 'text-yellow-500' : 'text-gray-100'}`}
                    />
                ))}
            </div>
        );
    };

    const truncateReviewText = (text, maxCharsPerLine) => {
        if (!text) return '';
    
        let result = '';
        let currentLineLength = 0;
    
        for (let i = 0; i < text.length; i++) {
            result += text[i];
            currentLineLength++;
    
            if (currentLineLength >= maxCharsPerLine && text[i] !== ' ') {
                result += '\n';
                currentLineLength = 0;
            }
        }
    
        return result;
    };
    

    const handleToggleReviews = () => {
        setReviewsVisible(!reviewsVisible);
    };

    const handleToggleReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };

    const handleThumbnailClick = (image) => {
        setMainImage(`http://yanevshop.test/storage/images/${image}`);
    };

    const ReviewItem = ({ review }) => {
        const [showFull, setShowFull] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [editText, setEditText] = useState(review.text || '');
        const [editRating, setEditRating] = useState(review.rating);
    
        // const handleToggle = () => {
        //     setShowFull(!showFull);
        // };
    
        const truncatedText = truncateReviewText(review.text, 60);
    
        return (
            <li key={review.id} className="border-b border-gray-200 pb-4 relative">
                <p className="text-gray-700 mb-2">{review.user?.username || 'Anonymous'}</p>
                <div className="flex justify-center mb-2">
                    {renderStars(review.rating)}
                </div>
                <div className="review-text">
                    <p>{showFull ? review.text : truncatedText}</p>
                    {/* {!showFull && review.text.length > 120 && (
                        <button
                            onClick={handleToggle}
                            className="text-blue-500 hover:underline mt-2"
                        >
                            See More
                        </button>
                    )}
                    {showFull && (
                        <button
                            onClick={handleToggle}
                            className="text-blue-500 hover:underline mt-2"
                        >
                            Show Less
                        </button>
                    )} */}
                </div>
                {user?.id === review.user_id && (
                    <div className="absolute top-0 right-0 mt-2 flex space-x-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-500 hover:text-blue-400"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-red-500 hover:text-red-400"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                )}
                {isEditing && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEditReview(review.id, editText, editRating);
                            setIsEditing(false);
                        }}
                        className="flex flex-col mb-4"
                    >
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows="4"
                            className="border-2 rounded-2xl p-2 mb-4"
                        />
                        <select
                            value={editRating}
                            onChange={(e) => setEditRating(Number(e.target.value))}
                            className="border-2 rounded-2xl p-2 mb-4"
                        >
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                        <div>
                            <button type="submit" className="btn-primary px-4 mr-2 py-2 mb-2">
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-red-600 rounded-2xl text-white font-medium hover:bg-red-500 px-4 py-2">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </li>
        );
    };
    
    

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen mx-auto px-4">
                    <div className="text-center bg-white rounded-3xl shadow-md p-8" style={{ maxWidth: '700px', margin: '0 auto', display: 'flex'}}>
                        {product && (
                            <>
                                <div className="flex-none">
                                    {/* Thumbnail list */}
                                    <div className="flex flex-col mt-8 space-y-4">
                                        {product.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={`http://yanevshop.test/storage/images/${image}`}
                                                alt={`Thumbnail ${index}`}
                                                className="cursor-pointer w-full h-20 object-cover rounded-md border border-gray-300"
                                                onClick={() => handleThumbnailClick(image)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-2">
                                    {/* Main image */}
                                    <img
                                        src={mainImage || "http://yanevshop.test/storage/images/default.jpg"}
                                        alt="Main"
                                        style={{ width: '450px', height: '450px', objectFit: 'cover' }}
                                        className="rounded-md mb-4"
                                    />
                                    <h1 className="text-2xl font-medium text-gray-800 mb-4">{product.name}</h1>
                                    <h1 className="text-1xl font-bold text-gray-800">Description</h1>
                                    <p className="text-gray-800 text-m mb-4 py-4" style={{ maxWidth: '450px', margin: '0 auto' }}>
                                        {product.description}
                                    </p>
                                    <p className="text-gray-900 text-lg font-medium mb-4">Price: {product.price}$</p>

                                    <div className="flex-2">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-green-600 hover:bg-green-500 text-white font-medium px-5 py-2 rounded-2xl"
                                            title="Buy"
                                        >
                                            <FontAwesomeIcon icon={faCartPlus} size="xl" />
                                        </button>
                                        <button
                                            onClick={handleToggleReviewForm}
                                            className="btn-primary ml-2 mr-2 px-4 py-2"
                                        >
                                            ADD REVIEW
                                        </button>
                                        <button onClick={handleToggleReviews} className="btn-primary px-4 py-2">
                                            REVIEWS
                                        </button>
                                    </div>
                                    {showReviewForm && (
                                        <form onSubmit={handleReviewSubmit} className="flex flex-col mb-6 mt-4">
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
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                                                ))}
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
                                        <div className="mt-4 overflow-auto">
                                            {reviews.length === 0 ? (
                                                <p className="text-gray-500">No reviews yet.</p>
                                            ) : (
                                                <ul className="space-y-4 items-center">
                                                    {reviews.map((review) => (
                                                        <ReviewItem review={review} key={review.id} />
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-8"></div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
