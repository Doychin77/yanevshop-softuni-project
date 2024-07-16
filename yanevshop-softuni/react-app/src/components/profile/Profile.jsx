import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig.js';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get('/user');
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching user profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-md mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">User Profile</h1>
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Name: {user.name}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Email: {user.email}</p>
                    {/* Add more user details as needed */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
