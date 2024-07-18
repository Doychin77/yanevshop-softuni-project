import { useEffect, useState } from 'react';
import axios from 'axios';

// Make sure to import your background image
import wl from '../../assets/wl.jpg';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
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
        <div className="flex flex-col min-h-screen">
            <div
                className="flex-grow flex items-center justify-center"
                style={{
                    backgroundImage: `url(${wl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '50px',
                }}
            >
                <div className="dark:bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl text-gray-100 font-bold mb-6 text-center">Profile</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-100">
                            Username:
                        </label>
                        <p className="mt-1 text-lg text-gray-100">{user.username}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-100">
                            Email:
                        </label>
                        <p className="mt-1 text-lg text-gray-100">{user.email}</p>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => alert('Edit button clicked')}
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold rounded-2xl text-m px-14 py-2 text-center"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;