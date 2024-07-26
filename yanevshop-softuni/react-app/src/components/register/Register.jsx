import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/toaststyles.css';
import wl from '../../assets/wl.jpg';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const notify = () => toast("Registration Successful!", {
        className: "toast-message-registration",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!termsAccepted) {
            alert("You must accept the terms and conditions");
            return;
        }

        try {
            const response = await axios.post('http://yanevshop.test/api/register', {
                username,
                email,
                password,
                password_confirmation: confirmPassword
            });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error.message);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full rounded-2xl border-2 border-orange-500 shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" className="block ml-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="input-field-primary block w-full p-2"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="input-field-primary block w-full p-2"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
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
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        className="input-field-primary block w-full p-2" 
                                        required 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a href="#" className="font-medium text-primary-600 hover:underline dark:text-orange-500">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit"
                                        onClick={notify}
                                        className="w-1/2 mb-2 text-white bg-orange-500 hover:bg-orange-400 rounded-2xl py-2 font-medium">Create an account</button>
                                    <p className="text-sm mt-2 text-center font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href="/login" className="font-medium hover:underline dark:text-orange-500">Login here</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
