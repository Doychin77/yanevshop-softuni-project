import { useNavigate } from "react-router-dom";

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
              <h2 className="text-3xl text-gray-100 font-medium mb-6">
                Order Successful!
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Thank you for your purchase. Check your email for order details.
              </p>
              <button
                onClick={handleContinueShopping}
                className="btn-primary py-2 px-4"
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
