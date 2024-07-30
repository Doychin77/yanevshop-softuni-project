import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

const SuccessfulOrder = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="home-background">
        <div className="max-w-screen-lg mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="border-2 border-orange-500 rounded-2xl p-10 text-center">
              <h2 className="text-4xl text-gray-100 font-bold mb-6">
                YanevShop
              </h2>
              <p className="text-2xl text-gray-100 font-medium mb-6">
                THANK YOU
              </p>
              <p className="text-lg text-gray-300 mb-8">
                YOUR ORDER IS SUCCESSFUL, CHECK YOUR EMAIL
              </p>
              <button
                onClick={handleContinueShopping}
                className="btn-primary py-2 px-4 mb-6"
              >
                Continue Shopping
              </button>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulOrder;
