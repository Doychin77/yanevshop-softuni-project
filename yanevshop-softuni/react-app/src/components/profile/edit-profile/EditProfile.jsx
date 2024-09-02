import { useEffect, useState } from 'react';
import axios from 'axios';
import wl from '../../../assets/wl.jpg';
import Spinner from '../../spinner/Spinner';
import Footer from '../../footer/Footer';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState('');
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        old_password: '',
        new_password: '',
        confirm_password: '',
        image: null
    });

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
                setFormState({
                    username: response.data.username,
                    email: response.data.email,
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                    image: response.data.image
                });
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));

        const file = event.target.files[0];
        if (file) {
            document.getElementById('file-name').textContent = file.name;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormError('');

        // Client-side validation
        if (formState.new_password || formState.confirm_password) {
            if (formState.new_password !== formState.confirm_password) {
                setFormError('The new password and confirmation do not match!');
                setLoading(false);
                return;
            }

            if (formState.new_password.length < 8) {
                setFormError('The new password must be at least 8 characters!');
                setLoading(false);
                return;
            }
        }


        // Prepare form data for submission
        const formData = new FormData();
        formData.append('username', formState.username);
        formData.append('email', formState.email);
        if (formState.old_password) formData.append('old_password', formState.old_password);
        if (formState.new_password) formData.append('new_password', formState.new_password);
        if (formState.confirm_password) formData.append('confirm_password', formState.confirm_password);
        if (formState.image) formData.append('image', formState.image);

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
            setFormError('');
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
                <div className="form-container p-8 w-full max-w-md bg-[#242629] border-2 border-orange-500 rounded-2xl shadow-xl">

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
                                    className="w-32 h-32 object-cover rounded-full border-2 border-orange-500"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center text-white text-xl">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="label-profile" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formState.username}
                                onChange={handleChange}
                                className="input-field-primary"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label-profile" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                className="input-field-primary"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label-profile" htmlFor="old_password">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old_password"
                                name="old_password"
                                value={formState.old_password}
                                onChange={handleChange}
                                className="input-field-primary"

                            />
                        </div>
                        <div className="mb-4">
                            <label className="label-profile" htmlFor="new_password">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password"
                                name="new_password"
                                value={formState.new_password}
                                onChange={handleChange}
                                className="input-field-primary"

                            />
                        </div>
                        <div className="mb-4">
                            <label className="label-profile" htmlFor="confirm_password">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                value={formState.confirm_password}
                                onChange={handleChange}
                                className="input-field-primary"

                            />
                        </div>
                        <div className="mb-6">
                            <label className="label-profile" htmlFor="image">
                                Profile Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleChange}
                                className="hidden-input-file"
                            />

                            <div className="flex flex-col items-center">

                                <span id="file-name" className="file-name-display mt-2"></span>

                                <button
                                    type="button"
                                    onClick={() => document.getElementById('image').click()}
                                    className="custom-upload-button btn-primary"
                                >
                                    Upload Image
                                </button>

                            </div>


                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn-primary block mx-auto px-8 py-2"
                            >
                                UPDATE PROFILE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;
