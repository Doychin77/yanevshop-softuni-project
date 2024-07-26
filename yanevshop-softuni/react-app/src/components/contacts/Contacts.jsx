import React from 'react';
import wl from '../../assets/wl.jpg';

export default function Contacts() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="home-background flex-grow" style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', padding: '50px' }}>
                <div className="max-w-screen-xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-14">Contact Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#242629] border-2 border-orange-500 rounded-3xl shadow-md pt-20 text-center">
                            <h2 className="text-2xl font-medium text-gray-900 dark:text-orange-500 mb-4">Our Contact Information</h2>
                            <p className="text-gray-700 dark:text-orange-500 mb-2"><span className="font-bold">Address:</span> 123 Main St, City, Country</p>
                            <p className="text-gray-700 dark:text-orange-500 mb-2"><span className="font-bold">Phone:</span> +1 234 567 890</p>
                            <p className="text-gray-700 dark:text-orange-500 mb-2"><span className="font-bold">Email:</span> info@example.com</p>
                            <p className="text-gray-700 dark:text-orange-500"><span className="font-bold">Hours:</span> Mon - Fri: 9AM - 5PM</p>
                        </div>
                        <div className="bg-[#242629] border-2 border-orange-500 rounded-3xl shadow-md p-6">
                            <h2 className="text-2xl text-center font-medium text-gray-900 dark:text-orange-500 mb-4">Contact Form</h2>
                            <form className="grid grid-cols-1 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full bg-gray-700 hover:bg-gray-600 border-2 border-transparent rounded-2xl dark:text-gray-100 shadow-sm p-2 focus:outline-none focus:border-orange-500" 
                                    onFocus={(e) => e.target.style.border = '2px solid orange'}
                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                />
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    className="w-full bg-gray-700 hover:bg-gray-600 border-2 border-transparent rounded-2xl dark:text-gray-100 shadow-sm p-2 focus:outline-none focus:border-orange-500" 
                                    onFocus={(e) => e.target.style.border = '2px solid orange'}
                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                />
                                <textarea 
                                    placeholder="Your Message" 
                                    rows="4" 
                                    className="w-full bg-gray-700 hover:bg-gray-600 border-2 border-transparent rounded-2xl dark:text-gray-100 shadow-sm p-2 focus:outline-none focus:border-orange-500"
                                    onFocus={(e) => e.target.style.border = '2px solid orange'}
                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                ></textarea>
                                <button type="submit" className="btn-primary block mx-auto px-20 py-2">
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
