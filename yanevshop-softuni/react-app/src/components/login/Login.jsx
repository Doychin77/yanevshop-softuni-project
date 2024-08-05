import  { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import Footer from '../footer/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://yanevshop.test/api/login', {
                email,
                password
            });

            console.log('Login response:', response.data);
            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);

                login(response.data.user);

                navigate('/');
            } else {
                console.error('No token found in response');
                alert('Login failed: No token provided');
            }
        } catch (error) {
            console.error(error);
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-2xl border-2 border-orange-500 shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="input-field-primary block w-full p-2"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="input-field-primary block w-full p-2"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="/reset-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-orange-500">Forgot password?</a>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="w-1/2 mb-2 mt-2 text-white bg-orange-500 hover:bg-orange-400 rounded-2xl py-2 font-medium"
                                    >
                                        Sign in
                                    </button>
                                    <p className="text-sm mt-2 font-light text-gray-300">
                                        Don’t have an account yet? <a href="/register" className="font-medium hover:underline dark:text-orange-500">Sign up</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
