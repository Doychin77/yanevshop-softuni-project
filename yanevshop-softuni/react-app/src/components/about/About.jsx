import React from 'react';
import wl from '../../assets/wl.jpg';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div
                className="relative flex-grow bg-cover bg-center"
                style={{ backgroundImage: `url(${wl})` }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative max-w-screen-lg mx-auto p-6 md:p-12 text-gray-100">
                    <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg">
                        <h1 className="text-4xl font-bold mb-6 text-gray-900">About YanevShop</h1>
                        <p className="text-lg mb-6 text-gray-800">
                            Welcome to YanevShop, your one-stop destination for the best PC components and accessories. We are dedicated to providing you with top-quality products at competitive prices, ensuring your computer setup runs smoothly and efficiently.
                        </p>
                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Mission</h2>
                            <p className="leading-relaxed mb-4 text-gray-700">
                                Our mission is to be the leading online retailer of PC parts, offering a wide range of products from the industry's top brands. We strive to deliver exceptional customer service, ensuring you have the best shopping experience possible.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Why Choose Us?</h2>
                            <ul className="list-disc pl-5 text-gray-700">
                                <li className="mb-2">Wide selection of high-quality PC components</li>
                                <li className="mb-2">Competitive prices and special offers</li>
                                <li className="mb-2">Fast and reliable shipping</li>
                                <li className="mb-2">Excellent customer support</li>
                                <li className="mb-2">Secure online shopping experience</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Contact Us</h2>
                            <p className="mb-4 text-gray-700">
                                If you have any questions or need assistance, please feel free to <a href="/contacts" className="text-blue-600 hover:underline">contact us</a>. Our friendly customer support team is here to help you.
                            </p>
                        </div>
                        <p className="text-gray-700">
                            Thank you for choosing YanevShop. We look forward to serving you!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
