import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";

const ClearCart = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch the action to clear the cart
    alert("Cart has been cleared!");
  };

  return (
    <div>
      <button onClick={handleClearCart} className="bg-red-500 text-white p-2">
        Clear Cart
      </button>
    </div>
  );
};

export default ClearCart;
