import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for making API calls
import "./recommended.css"; // Import CSS file for styling

const RecommendedPage = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const userId = localStorage.getItem("user"); // Get the logged-in user's ID from localStorage

  useEffect(() => {
    if (userId) {
      // Fetch recommendations using the API
      axios
        .get(`http://127.0.0.1:5000/recommend?user_id=${userId}`) // API call to Flask backend
        .then((response) => {
          setRecommendedProducts(response.data.recommendations); // Store the recommendations
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  }, [userId]);

  return (
    <div className="recommended-container">
      <h1 className="recommended-header">Recommended Products for You</h1>
      {recommendedProducts.length > 0 ? (
        <div className="recommended-grid">
          {recommendedProducts.map((product) => (
            <div key={product.prod_id} className="recommended-item">
              <img
                src={product.imageUrl || "\ Default image.png"} // Use a fallback image
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-rating">{product.rating} ⭐</p>
              <p className="product-reviews">{product.reviews} Reviews</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recommendations">No recommendations available.</p>
      )}
    </div>
  );
};

export default RecommendedPage;
