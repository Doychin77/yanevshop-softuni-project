import React from 'react';
import wl from '../../assets/wl.jpg';
import topImage from '../../assets/topImage.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faClock, faAddressBook } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative flex-grow bg-cover bg-center" style={{ backgroundImage: `url(${wl})` }}>
                {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
                <div className="relative max-w-screen-xl mx-auto p-6 md:p-12 text-gray-800">
                    <div className="flex flex-col md:flex-row items-stretch">
                        {/* Left side for the top image */}
                        <div className="md:w-1/2 flex items-center justify-center p-4">
                            <img src={topImage} alt="Top" className="w-full h-auto rounded-xl shadow-lg" />
                        </div>
                        {/* Right side for the "About Us" content */}
                        <div className="md:w-1/2 flex  items-center justify-center p-4">
                            <div className="bg-[#242629] border-2 border-orange-500 rounded-2xl p-8 shadow-xl w-full">
                                <h1 className="text-4xl text-center font-medium mb-6 text-orange-500">About Us</h1>
                                <p className="leading-relaxed text-center mb-6 text-gray-100">
                                    Welcome to YanevShop, your one-stop destination for the best PC components and accessories. We are dedicated to providing you with top-quality products at competitive prices, ensuring your computer setup runs smoothly and efficiently.
                                </p>
                                <div className="mb-8">
                                    <h2 className="text-3xl text-center font-medium mb-4 text-orange-500">Our Mission</h2>
                                    <p className="leading-relaxed text-center mb-4 text-gray-100">
                                        Our mission is to be the leading online retailer of PC parts, offering a wide range of products from the industry's top brands. We strive to deliver exceptional customer service, ensuring you have the best shopping experience possible.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Link
                                        to={`/contacts`}
                                        className="btn-primary px-5 py-2"
                                    >
                                        <span className="mr-2"><FontAwesomeIcon icon={faAddressBook} /></span>
                                        CONTACTS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sections separated from the main content */}
                    <div className="mt-12">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 rounded-2xl bg-orange-500 p-6 shadow-md">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-100"><FontAwesomeIcon icon={faPhone} /> CALL US</h2>
                                <ul className="text-gray-100 ml-2">
                                    <li className="mb-2">089 996 996</li>
                                    <li className="mb-2">089 777 996</li>
                                </ul>
                            </div>
                            <div className="flex-1 rounded-2xl bg-orange-500 p-6 shadow-md">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-100"><FontAwesomeIcon icon={faLocationDot} /> LOCATION</h2>
                                <p className="mb-4 text-gray-100">
                                    Ivan Petrov 54, Stara Zagora, Bulgaria
                                </p>
                            </div>
                            <div className="flex-1 rounded-2xl bg-orange-500 p-6 shadow-md">
                                <h2 className="text-3xl font-medium mb-4 text-gray-100"><FontAwesomeIcon icon={faClock} /> HOURS</h2>
                                <div className="ml-2 text-gray-100">
                                    <p>Monday - Friday</p>
                                    <p>08:00 - 22:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
