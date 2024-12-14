import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from "@/redux/store";
import { addToCart } from "@/redux/features/cartSlice";
import dynamic from 'next/dynamic';
import "../src/app/globals.css";

// Dynamically import components
const Navbar = dynamic(() => import('../src/components/front-end/Navbar'), { ssr: false });
const Footer = dynamic(() => import('../src/components/front-end/Footer'), { ssr: false });
const Cart = dynamic(() => import('../src/components/front-end/Cart'), { ssr: false });

const SmartphonePageComponent = () => {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [hydrated, setHydrated] = useState(false); // Handle hydration

  useEffect(() => {
    setHydrated(true); // Ensure client-side hydration
  }, []);

  const smartphones = [
    {
      id: "5",
      name: "iPhone 15 Pro",
      category: "Mobile Phones",
      price: 1000,
      imageUrl: "/iphone15pro.jpg",
      reviews: 15,
      rating: 4,
    },
    {
      id: "6",
      name: "Samsung Galaxy S22",
      category: "Mobile Phones",
      price: 850,
      imageUrl: "/samsung galaxy s22.jpg",
      reviews: 20,
      rating: 4,
    },
    {
      id: "7",
      name: "Google Pixel 6",
      category: "Mobile Phones",
      price: 700,
      imageUrl: "/google pixel 6.jpg",
      reviews: 10,
      rating: 3,
    },
    {
      id: "8",
      name: "Oneplus 12r",
      category: "Mobile Phones",
      price: 700,
      imageUrl: "/oneplus 12r.jpg",
      reviews: 10,
      rating: 5,
    },
  ];

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    dispatch(addToCart(productWithQuantity));
    setShowCart(true);
  };

  if (!hydrated) return null; // Prevent rendering until hydration

  return (
    <div>
      <Navbar setShowCart={setShowCart} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Explore Our Smartphone Collection
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {smartphones.map((phone) => (
            <div key={phone.id} style={{
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <img src={phone.imageUrl} alt={phone.name} style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '15px'
              }} />
              <h2 style={{ fontSize: '14px', color: '#555' }}>{phone.category}</h2>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '10px 0' }}>{phone.name}</h3>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px 0'
              }}>
                <span style={{ color: '#FFD700' }}>{"⭐".repeat(Math.round(phone.rating))}</span>
                <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>
                  ({phone.reviews} Reviews)
                </span>
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E90FF' }}>${phone.price}</p>
              <button onClick={() => handleAddToCart(phone)} style={{
                backgroundColor: '#FF69B4',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
                fontWeight: 'bold',
                marginTop: '10px',
                width: '100%',
                transition: 'background-color 0.3s ease',
              }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FF85C2'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF69B4'}
              >
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

const SmartphonePage = () => (
  <Provider store={store}>
    <SmartphonePageComponent />
  </Provider>
);

export default SmartphonePage;
