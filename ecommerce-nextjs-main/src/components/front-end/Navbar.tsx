import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { addToCart } from "@/redux/features/cartSlice"; // Assuming you've set up this action for adding to the cart
import Link from "next/link"; // Importing Link from next/link

const Navbar = ({ setShowCart }: { setShowCart: Dispatch<SetStateAction<boolean>> }) => {
  const cartCount = useAppSelector((state) => state.cartReducer.length); // Redux cart count
  const dispatch = useAppDispatch(); // For dispatching actions to Redux
  const [isHydrated, setIsHydrated] = useState(false); // Track client-side hydration
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Filtered products for dropdown

  // Check if the user is logged in
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("user");

  // Product data (Your product data will go here)
  const products = [
    { id: "1", name: "Wireless Headphone", category: "Headphones", price: 85, imageUrl: "/wirelessheadphones.jpg", reviews: 4, rating: 4.5 },
    { id: "2", name: "DeepCool Air Cooler", category: "CPU Heat Pipes", price: 90, imageUrl: "/aircooler.jpg", reviews: 3, rating: 4 },
    { id: "3", name: "Apple iPad Air", category: "Mobile Tablets", price: 400, imageUrl: "/apple ipad air.jpeg", reviews: 10, rating: 4 },
    { id: "4", name: "iPhone 14 Pro", category: "Mobile Phones", price: 800, imageUrl: "/iphone 14pro.jpeg", reviews: 20, rating: 5 },
    { id: "5", name: "iPhone 15 Pro", category: "Mobile Phones", price: 1000, imageUrl: "/iphone15pro.jpg", reviews: 15, rating: 4.5 },
    { id: "6", name: "Samsung Galaxy S22", category: "Mobile Phones", price: 850, imageUrl: "/samsung galaxy s22.jpg", reviews: 20, rating: 4.8 },
    { id: "7", name: "Google Pixel 6", category: "Mobile Phones", price: 700, imageUrl: "/google pixel 6.jpg", reviews: 10, rating: 4.2 },
    { id: "8", name: "Oneplus 12r", category: "Mobile Phones", price: 700, imageUrl: "/oneplus 12r.jpg", reviews: 10, rating: 4.2 },
  ];

  // Ensure hydration is complete before rendering cart count
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Clear filtered results when the search is cleared
    }
  };

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    const productWithQuantity = { ...product, quantity: 1 }; // Ensure quantity is set to 1
    dispatch(addToCart(productWithQuantity)); // Dispatch action to add product to the cart
    setShowCart(true); // Show cart sidebar after adding product
  };

  return (
    <div className="pt-4 bg-white top-0 sticky">
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-4xl font-bold cursor-pointer">Logo</div>

          {/* Search Bar */}
          <div className="relative lg:flex hidden w-full max-w-[500px]">
            <input
              className="border-2 border-accent px-4 py-2 w-full"
              type="text"
              placeholder="Search for Products"
              value={searchQuery}
              onChange={handleSearch} // Handle input change
            />
            <div className="bg-accent text-white text-[26px] grid place-items-center px-4">
              <BsSearch />
            </div>

            {/* Dropdown for filtered products */}
            {filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 flex items-center border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddToCart(product)} // Add to cart when clicked
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover mr-4"
                    />
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-gray-500 text-sm">{product.category}</p>
                      <p className="text-gray-700 font-semibold">${product.price}</p>
                      <p className="text-gray-700 font-semibold">{product.rating} ⭐</p>
                      <p className="text-gray-700 font-semibold">{product.reviews} Reviews</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Account and Cart */}
          <div className="flex gap-4 md:gap-8 items-center">
            {/* User Section */}
            <div className="md:flex hidden gap-3">
              {isLoggedIn ? (
                <>
                  <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center">
                    <AiOutlineUser />
                  </div>
                  <div>
                    <p className="text-gray-500">Hello, User</p>
                    <p className="font-medium">Your Account</p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user"); // Logout logic
                      window.location.href = "/login"; // Redirect to login
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>
              )}
            </div>

            {/* Cart Section */}
            <div
              className="text-gray-500 text-[32px] relative cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShoppingCart />
              <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                {isHydrated ? cartCount : "0"}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar Links */}
        <div className="border-b border-gray-200 pt-4">
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-black">
              Home
            </Link>
            {/* Add additional navigation links here */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
