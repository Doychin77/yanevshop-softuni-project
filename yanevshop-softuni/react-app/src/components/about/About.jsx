

export default function About() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-lg mx-auto p-6 text-gray-900 dark:text-white">
                <h1 className="text-3xl font-bold mb-4">About YanevShop</h1>
                <p className="text-lg mb-4">
                    Welcome to YanevShop, your one-stop destination for the best PC components and accessories. We are dedicated to providing you with top-quality products at competitive prices, ensuring your computer setup runs smoothly and efficiently.
                </p>
                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                <p className="mb-4">
                    Our mission is to be the leading online retailer of PC parts, offering a wide range of products from the industry's top brands. We strive to deliver exceptional customer service, ensuring you have the best shopping experience possible.
                </p>
                <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
                <ul className="list-disc pl-5 mb-4">
                    <li>Wide selection of high-quality PC components</li>
                    <li>Competitive prices and special offers</li>
                    <li>Fast and reliable shipping</li>
                    <li>Excellent customer support</li>
                    <li>Secure online shopping experience</li>
                </ul>
                <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                <p className="mb-4">
                    If you have any questions or need assistance, please feel free to <a href="/contact" className="text-blue-600 hover:underline">contact us</a>. Our friendly customer support team is here to help you.
                </p>
                <p className="mb-4">
                    Thank you for choosing YanevShop. We look forward to serving you!
                </p>
            </div>
        </div>
    );
}