import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../src/redux/store";
import "./checkout.css";
import Navbar from "../src/components/front-end/Navbar";
import Footer from "../src/components/front-end/Footer";
import "../src/app/globals.css";
import axios from "axios";

const CheckoutContent = () => {

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false); // State to track if the component is mounted

   // Move useSelector outside the conditional logic
  const products = useSelector((state) => state.cartReducer);

  useEffect(() => {
    setIsMounted(true); // Ensure the component is only marked as mounted on the client
  }, []);
   
  const getTotal = () => {
    return products.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkoutData = {
      customerName: formData.name,
      orderDetails: products,
      totalPrice: getTotal(),
    };

    try {
      const response = await axios.post("http://localhost:5000/save-checkout", checkoutData);
    alert("Checkout completed successfully!");

    } catch (error) {
      console.error("Error saving checkout data:", error);
      alert("There was an issue saving your order. Please try again.");
    }
  };

  // Prevent rendering until the component is mounted
  if (!isMounted) return null;
  

  return (
    <div className="checkout-container">
      <Navbar setShowCart={() => {}} />

      <div className="checkout-box">
        <h1 className="checkout-header">Secure Checkout</h1>
        <p>Need Help? Call: <a href="tel:1-855-253-6686">1-855-253-6686</a></p>
        
        {/* Step Indicators */}
        <div className="step-indicators">
          <span className={step === 1 ? "active-step" : ""}>1. Items</span>
          <span className={step === 2 ? "active-step" : ""}>2. Payment</span>
          <span className={step === 3 ? "active-step" : ""}>3. Card</span>
          <span className={step === 4 ? "active-step" : ""}>4.Review</span>
        </div>

        {/* Order Summary Section */}
        {step === 1 && (
          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            {products.map((item) => (
              <div key={item.id} className="summary-item">
                <p>{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price * item.quantity}</p>
              </div>
            ))}
            <div className="summary-item total-price">
              <p>Total Price:</p>
              <p>${getTotal()}</p>
            </div>
            <button onClick={handleNextStep} className="submit-button">
              Next
            </button>
          </div>
        )}

        {/* Shipping Information Form */}
        {step === 2 && (
          <form onSubmit={handleNextStep}>
            <div>
              <h2 className="section-title">Shipping Information</h2>
              <div className="form-group">
                <div>
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
                </div>
                <div>
                  <label className="form-label">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-input" required />
                </div>
                <div>
                  <label className="form-label">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" required />
                </div>
                <div>
                  <label className="form-label">Zip Code</label>
                  <input type="number" name="zip" value={formData.zip} onChange={handleInputChange} className="form-input" required />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Next
            </button>
          </form>
        )}

        {/* Payment Information Section */}
        {step === 3 && (
          <form onSubmit={handleNextStep}>
            <h2 className="section-title">Payment Information</h2>
            <div className="form-group">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Card Number</label>
                <input
                  type="number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  maxLength="16"
                  required
                />
              </div>
              <div>
                <label className="form-label">Expiration Date</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input
                  type="number"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="form-input"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Complete Purchase
            </button>
          </form>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <h2 className="section-title">Review Your Order</h2>
            {products.map((item) => (
              <div key={item.id} className="summary-item">
                <p>{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price * item.quantity}</p>
              </div>
            ))}
            <div className="summary-item total-price">
              <p>Total:</p>
              <p>${getTotal()}</p>
            </div>
            <button onClick={handleSubmit} className="submit-button">
              Place Your Order
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

// Wrap CheckoutContent with the Redux Provider and export it
const Checkout = () => (
  <Provider store={store}>
    <CheckoutContent />
  </Provider>
);

export default Checkout;
