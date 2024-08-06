import ClipLoader from 'react-spinners/ClipLoader'; 
import wl from '../../assets/wl.jpg'; 

const Spinner = ({ loaderColor = "#f97316", size = 150 }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div
                className="flex-grow flex items-center justify-center"
                style={{ backgroundImage: `url(${wl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <ClipLoader color={loaderColor} size={size} />
            </div>
        </div>
    );
};

export default Spinner;
