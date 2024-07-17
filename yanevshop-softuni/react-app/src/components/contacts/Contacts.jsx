

export default function Contacts() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Contact Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md pt-20  text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Contact Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-2"><span className="font-bold">Address:</span> 123 Main St, City, Country</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2"><span className="font-bold">Phone:</span> +1 234 567 890</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2"><span className="font-bold">Email:</span> info@example.com</p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">Hours:</span> Mon - Fri: 9AM - 5PM</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6">
                        <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Form</h2>
                        <form className="grid grid-cols-1 gap-4">
                            <input type="text" placeholder="Your Name" className="w-full border-gray-300 rounded-2xl shadow-sm p-2 focus:ring focus:ring-blue-800 focus:border-blue-800" />
                            <input type="email" placeholder="Your Email" className="w-full border-gray-300 rounded-2xl shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                            <textarea placeholder="Your Message" rows="4" className="w-full border-gray-300 rounded-2xl shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-2xl">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

