import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';
import wl from '../../assets/wl.jpg';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/profile');
                setUser(response.data); // Assuming response.data is { username, email }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render loading state while fetching user data
    }

    if (error) {
        return <div>Error: {error}</div>; // Render error message if fetching user data fails
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
                <div className="max-w-screen-xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-14">Profile</h1>
                    <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-md p-4 flex flex-col items-center">
                        
                        <span className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-400 transition-colors duration-400">
                            {user.username}
                        </span>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
            </div>
            <Footer className="footer" />
        </div>
    );
};

export default ProfilePage;
