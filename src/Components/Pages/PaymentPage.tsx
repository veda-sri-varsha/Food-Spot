import { useLocation, Link } from "react-router-dom";
import PaymentCard from "../Cards/PaymentCard";
import "../styles/PaymentPage.css";
import { useState } from "react";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: string;
  deliveryTime: string;
  price: number;
}

interface LocationState {
  cartItems: { [id: string]: number };
  foodItems: FoodItem[];
}

const PaymentPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const { cartItems, foodItems } = state;

  const [paymentDone, setPaymentDone] = useState(false);

  const cartData = foodItems.filter((item) => cartItems[item.id]);

  const grandTotal = cartData.reduce((total, item) => {
    return total + item.price * cartItems[item.id];
  }, 0);

  const handlePayment = () => {
    setPaymentDone(true);
  };

  return (
    <div className="payment-page">
      <h1>Payment Way</h1>

      {!paymentDone && (
        <>
          {cartData.map((item) => (
            <PaymentCard
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={cartItems[item.id]}
              imageUrl={item.imageUrl}
            />
          ))}

          <div className="total-section">
            <h2>Grand Total: ₹{grandTotal}</h2>
            <button className="confirm-btn" onClick={handlePayment}>
              Confirm & Pay
            </button>
          </div>
        </>
      )}

      {paymentDone && (
        <div className="success-banner">
          <h2>🎉 Payment Successful!</h2>
          <p>Thank you for your order.</p>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
