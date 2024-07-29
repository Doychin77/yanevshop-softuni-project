// Spinner.jsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Ensure you have this dependency installed

const Spinner = ({ backgroundImage, loaderColor = "#f97316", size = 150 }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div
                className="flex-grow flex items-center justify-center"
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <ClipLoader color={loaderColor} size={size} />
            </div>
        </div>
    );
};

export default Spinner;
