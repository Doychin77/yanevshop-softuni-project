import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../footer/Footer';

export default function ResetPassword() {
    const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter Code and New Password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSendCode = async () => {
        try {
            await axios.post('http://yanevshop.test/api/forgot-password', { email });
            setSuccess('A reset code has been sent to your email.');
            setStep(2); 
            setError(''); 
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.message === 'Email not found.') {
                setError('No account found with this email address.');
            } else {
                setError('Failed to send reset code.');
            }
            setSuccess(''); 
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('http://yanevshop.test/api/reset-password', {
                email,
                code,
                password: newPassword,
                password_confirmation: confirmPassword
            });
            setSuccess('Password reset successfully!');
            navigate('/login');
            setError(''); 
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to reset password.');
            }
            setSuccess(''); 
        }
    };

    return (
        <div className="page-container">
            <div className="home-background">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-2xl border-2 border-orange-500 shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {step === 1 ? 'Forgot Password' : 'Reset Your Password'}
                            </h1>
                            {error && <p className="text-red-500">{error}</p>}
                            {success && <p className="text-green-500">{success}</p>}
                            {step === 1 ? (
                                <form className="space-y-4 md:space-y-6">
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
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={handleSendCode}
                                            className="btn-primary px-5 py-2"
                                        >
                                            Send Reset Code
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="code" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">Reset Code</label>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            className="input-field-primary block w-full p-2"
                                            required
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="input-field-primary block w-full p-2"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password_confirmation" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            className="input-field-primary block w-full p-2"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={handleResetPassword}
                                            className="btn-primary px-5 py-2"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
