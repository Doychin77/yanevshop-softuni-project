import { useEffect, useState } from 'react';
import axios from 'axios';
import wl from '../../../assets/wl.jpg';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

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
                setUsername(response.data.username);
                setEmail(response.data.email);
                setImage(response.data.image); // Set image URL from response
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormError('');  // Reset form errors

        // Client-side validation
        if (new_password !== confirm_password) {
            setFormError('The new password and confirmation do not match!');
            setLoading(false);
            return;
        }

        if (new_password.length < 8) {
            setFormError('The new password must be at least 8 characters!');
            setLoading(false);
            return;
        }

        // Prepare form data for submission
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('old_password', old_password);
        formData.append('new_password', new_password);
        formData.append('confirm_password', confirm_password);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(
                'http://yanevshop.test/api/user/update',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            setUser(response.data.user);
            alert('Profile updated successfully');
            setFormError('');  // Clear any previous errors
        } catch (err) {
            console.error('Error updating profile:', err.response ? err.response.data : err.message);
            
            const errorMessage = err.response?.data?.errors?.old_password?.[0] 
                || err.response?.data?.message 
                || 'Unknown error';

            setFormError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

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
                    <h1 className="text-2xl text-gray-100 font-bold mb-6 text-center">Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        {formError && (
                            <div className="mb-4 text-red-500 text-center">
                                {formError}
                            </div>
                        )}
                        <div className="flex justify-center mb-4">
                            {user.image ? (
                                <img
                                    src={`http://yanevshop.test/storage/${user.image}`}
                                    alt="Profile"
                                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-600"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center text-white text-xl">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-center text-sm font-medium text-gray-100" htmlFor="username">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 py-2 text-center block w-full rounded-2xl bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-center text-sm font-medium text-gray-100" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 py-2 text-center block w-full rounded-2xl bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-center text-sm font-medium text-gray-100" htmlFor="oldPassword">
                                Old Password:
                            </label>
                            <input
                                type="password"
                                id="old_password"
                                value={old_password}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="mt-1 py-2 text-center block w-full rounded-2xl bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-center text-sm font-medium text-gray-100" htmlFor="newPassword">
                                New Password:
                            </label>
                            <input
                                type="password"
                                id="new_password"
                                value={new_password}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 py-2 text-center block w-full rounded-2xl bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-center text-sm font-medium text-gray-100" htmlFor="confirmPassword">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                value={confirm_password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 py-2 text-center block w-full rounded-2xl bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-center text-sm font-medium text-gray-100" htmlFor="image">
                                Profile Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-gray-100 bg-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold rounded-2xl text-m px-14 py-2 text-center"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
