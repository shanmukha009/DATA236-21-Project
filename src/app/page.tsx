"use client";

import Banner from "@/components/front-end/Banner";
import Cart from "@/components/front-end/Cart";
import Feature from "@/components/front-end/Feature";
import Footer from "@/components/front-end/Footer";
import Hero from "@/components/front-end/Hero";
import Navbar from "@/components/front-end/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

interface RecommendedProduct {
  prod_id: string;
  name: string;
  rating: number;
  imageUrl: string;
}

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("user");

  useEffect(() => {
    if (isLoggedIn) {
      const fetchRecommendations = async () => {
        try {
          const userId = localStorage.getItem("user");
          const response = await axios.get(
            `http://127.0.0.1:5000/recommend?user_id=${userId}`
          );
          if (response.data && response.data.recommendations) {
            setRecommendedProducts(
              response.data.recommendations.map((product: any) => ({
                ...product,
                imageUrl: mapImageToProduct(product.name),
              }))
            );
          }
        } catch (error) {
          setError("Failed to load recommendations. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecommendations();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Map product names to image filenames
  const mapImageToProduct = (productName: string): string => {
    const imageMapping: { [key: string]: string } = {
      "Wireless Headphone": "wirelessheadphones.jpg",
      "iPhone 14 Pro": "iphone 14pro.jpeg",
      "Google Pixel 6": "\public\google pixel 6.jpg",
      "OnePlus 12r": "oneplus 12r.jpg",
      "Samsung Galaxy S22": "samsung galaxy s22.jpg",
      "iPhone 15 Pro": "iphone15pro.jpg",
    };
    return imageMapping[productName] || "placeholder.jpg"; // Correct fallback to placeholder image
  };

  return (
    <main>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <Hero />
      <Feature />

      {isLoggedIn && !isLoading && recommendedProducts.length > 0 && (
        <div className="recommended-products-container">
          <h3 className="recommended-header">Recommended Products for You</h3>
          <div className="recommended-grid">
            {recommendedProducts.map((product) => (
              <div key={product.prod_id} className="product-card">
                {/* Product Image */}
                <img
                  src={`/${product.imageUrl}`} // Ensure correct mapping
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.jpg"; // Use placeholder for broken links
                  }}
                />
                {/* Product Information */}
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <p className="product-rating">{product.rating} ⭐</p>
                  <p className="product-id">Product ID: {product.prod_id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {isLoading && !error && (
        <div className="loading-state">
          <p>Loading your recommendations...</p>
        </div>
      )}
      <Banner />
      <Footer />
    </main>
  );
}
