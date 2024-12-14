import dynamic from 'next/dynamic'; // Make sure this is imported
import React, { useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from "@/redux/store";
import { addToCart } from "@/redux/features/cartSlice";
import Navbar from '../src/components/front-end/Navbar';
import Footer from '../src/components/front-end/Footer';
import Cart from '../src/components/front-end/Cart';
import "../src/app/globals.css";

const ProductPageComponent = () => {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: "1", name: "Wireless Headphone", category: "Headphones", price: 85, imageUrl: "/wirelessheadphones.jpg", reviews: 4, rating: 4.5 },
    { id: "2", name: "DeepCool Air Cooler", category: "CPU Heat Pipes", price: 90, imageUrl: "/aircooler.jpg", reviews: 3, rating: 4 },
    { id: "3", name: "Apple iPad Air", category: "Mobile Tablets", price: 400, imageUrl: "/apple ipad air.jpeg", reviews: 10, rating: 4 },
    { id: "4", name: "iPhone 14 Pro", category: "Mobile Phones", price: 800, imageUrl: "/iphone 14pro.jpeg", reviews: 20, rating: 5 },
  ];

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    dispatch(addToCart(productWithQuantity));
    setShowCart(true);
  };

  return (
    <div>
      <Navbar setShowCart={setShowCart} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>Explore Our Best Collection</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              <h2>{product.category}</h2>
              <h3>{product.name}</h3>
              <p>{product.rating} ⭐ ({product.reviews} Reviews)</p>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)} style={{ backgroundColor: '#FF69B4', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {showCart && <Cart setShowCart={setShowCart} />}
    </div>
  );
};

// Disable SSR for this component
const ProductPage = dynamic(() => Promise.resolve(ProductPageComponent), { ssr: false });

const WrappedProductPage = () => (
  <Provider store={store}>
    <ProductPage />
  </Provider>
);

export default WrappedProductPage;
