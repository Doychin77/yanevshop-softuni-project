import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="home-background min-h-screen flex items-center justify-center text-center p-6">
            <div className="w-full max-w-md mx-auto">
                <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Page Not Found</h2>
                <p className="text-lg text-gray-300 mb-8">
                    The page you are looking for does not exist.
                </p>
                <Link to="/" className="px-4 py-2 btn-primary">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
