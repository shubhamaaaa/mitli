import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarCart = () => {
  const {
    cartItems = {},
    products = [],
    currency = "$",
    delivery_fee = 0,
    isCartOpen,
    closeCart,
    removeFromCart,
  } = useContext(ShopContext);

  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);

  // Function to get cart products
  const getCartProducts = () => {
    if (!cartItems || typeof cartItems !== "object") return [];
    return Object.keys(cartItems)
      .map((itemId) => {
        const product = products.find((p) => p._id === itemId);
        if (!product) return null;
        return {
          ...product,
          quantity: cartItems[itemId],
          price: product.discountedprice ?? 0,
        };
      })
      .filter(Boolean);
  };

  useEffect(() => {
    const updatedCartProducts = getCartProducts();
    setCartProducts(updatedCartProducts);

    // Calculate subtotal
    const newSubtotal = updatedCartProducts.reduce((total, product) => {
      return total + ((product.discountedprice ?? 0) * (product.quantity ?? 1));
    }, 0);
    setSubtotal(newSubtotal);

    // Calculate GST (12% of subtotal)
    const newGst = Math.round(newSubtotal * 0.12);
    setGst(newGst);
    
    // Calculate total (subtotal + GST + delivery fee)
    setTotal(newSubtotal + newGst + (delivery_fee ?? 0));
  }, [cartItems, products]); // Runs when cart changes
  
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={closeCart} className="text-gray-600 hover:text-gray-800">
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto h-[calc(100vh-200px)]">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <div key={product._id} className="flex justify-between items-center mb-4 pb-4 border-b">
              <div className="flex items-center">
                <img
                  src={product.image?.[0] || "/placeholder.jpg"}
                  alt={product.name || "Product"}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-500">{currency}{(product.discountedprice ?? 0).toFixed(2)}</p>
                  <p className="text-gray-500">Qty: {product.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(product._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="text-xl" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t">
        <div className="flex justify-between mb-4">
          <p className="text-lg font-semibold text-gray-800">Subtotal</p>
          <p className="text-lg text-gray-800">{currency}{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-lg font-semibold text-gray-800">GST</p>
          <p className="text-lg text-gray-800">{currency}{(gst ?? 0).toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-6">
          <p className="text-xl font-bold text-gray-800">Total</p>
          <p className="text-xl font-bold text-gray-800">{currency}{total.toFixed(2)}</p>
        </div>
        <div className="flex flex-col gap-3">
        <Link to='/placeorder'><button
            className="w-full py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button></Link>
         <Link to='/cart'><button
            className="w-full py-3 cursor-pointer bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            View Cart
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarCart;