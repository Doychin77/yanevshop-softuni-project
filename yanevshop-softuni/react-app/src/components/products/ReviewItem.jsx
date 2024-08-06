import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../contexts/useUser';


/* eslint-disable react/prop-types */
const ReviewItem = ({ review, onEdit, onDelete }) => {
    const [showFull, setShowFull] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(review.text || '');
    const [editRating, setEditRating] = useState(review.rating);

    const { user } = useUser();

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

    const truncatedText = (text, maxCharsPerLine) => {
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

    return (
        <li key={review.id} className="border-b border-gray-200 pb-4 relative">
            <p className="text-gray-700 mb-2">{review.user?.username || 'Anonymous'}</p>
            <div className="flex justify-center mb-2">
                {renderStars(review.rating)}
            </div>
            <div className="review-text">
                <p>{showFull ? review.text : truncatedText(review.text, 60)}</p>
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
                        onClick={() => onDelete(review.id)}
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
                        onEdit(review.id, editText, editRating);
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

export default ReviewItem;
