import { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import wl from '../../assets/wl.jpg';
import Spinner from '../spinner/Spinner';
import '../css/styles.css';
import Footer from '../footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUserPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { logout } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://yanevshop.test/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized: Invalid or expired token.');
                } else {
                    setError(err.message || 'Unknown error');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">No user data found</div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div
                className="flex-grow flex items-center justify-center"
                style={{
                    backgroundImage: `url(${wl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '50px',
                }}
            >
                <div className="form-container p-8 w-full max-w-md">
                    <div className="flex justify-center mt-6 mb-4">
                        {user.image ? (
                            <img
                                src={`http://yanevshop.test/storage/${user.image}`}
                                alt="Profile"
                                className="w-32 h-32 object-cover rounded-full border-2 border-orange-500"
                            />
                        ) : (
                            <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center text-white text-xl">
                                No Image
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-center text-sm font-medium text-gray-100">
                            Username
                        </label>
                        <p className="mt-1 text-lg text-center text-gray-100">{user.username}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-center font-medium text-gray-100">
                            Email
                        </label>
                        <p className="mt-1 text-lg text-center text-gray-100">{user.email}</p>
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="btn-primary text-m px-4 py-2"
                        >
                            <FontAwesomeIcon icon={faUserPen} size='xl' />
                        </button>
                        <button
                            onClick={() => navigate('/order-history')}
                            className="btn-primary text-m px-4 py-2"
                        >
                            <FontAwesomeIcon icon={faBagShopping} /> ORDER HISTORY
                        </button>
                        <button
                            onClick={logout}
                            className="btn-primary text-m px-4 py-2"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
