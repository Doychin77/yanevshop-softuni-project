import Footer from "../footer/Footer";


export default function Contacts() {
    return (
        <div className="page-container">
            <div className="home-background">
                <div className="max-w-screen-xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-14">Contact Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="form-container pt-20 text-center">
                            <h2 className="text-2xl font-medium text-gray-900 dark:text-orange-500 mb-4">Our Contact Information</h2>
                            <p className="text-gray-700 dark:text-orange-500 mb-2"><span className="font-bold">Address:</span> Ivan Petrov 54, Stara Zagora, Bulgaria</p>
                            <p className="text-gray-700 dark:text-orange-500 mb-2"><span className="font-bold">Phone:</span> 089 996 996</p>
                            <p className="text-gray-700 dark:text-orange-500 mb-2"><span className="font-bold">Email:</span> yanevshop@gmail.com</p>
                            <p className="text-gray-700 dark:text-orange-500"><span className="font-bold">Hours:</span> Mon - Fri: 9AM - 5PM</p>
                        </div>
                        <div className="form-container p-6">
                            <h2 className="text-2xl text-center font-medium text-gray-900 dark:text-orange-500 mb-4">Contact Form</h2>
                            <form className="grid grid-cols-1 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full input-field-primary" 
                                />
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    className="w-full input-field-primary" 
                                />
                                <textarea 
                                    placeholder="Your Message" 
                                    rows="4" 
                                    className="w-full input-field-primary"
                                ></textarea>
                                <button type="submit" className="btn-primary block mx-auto px-20 py-2">
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            
            
        </div>
    );
}
