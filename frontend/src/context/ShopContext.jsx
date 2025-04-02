import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = async (itemId) => {

    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };




    if (!itemId) {
      console.error("Error: itemId is undefined in addToCart");
      return; // Exit if itemId is invalid
    }

    let cartData = structuredClone(cartItems || {}); // Ensure cartItems is an object

    // Properly update cartData
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    setIsCartOpen(true);
    setCartItems(cartData);

    console.log("Updated Cart:", cartData); // Debugging log

    if (token) {
      try {
        await axios.post(
          "http://localhost:3000/api/cart/add",
          { itemId },
          config
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error(error.message);
      }
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      totalCount += cartItems[itemId];
    }

    return totalCount;
  };

  const updateCartItemQuantity = async (itemId, quantity) => {

    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      delete cartData[itemId]; // Remove item if quantity is zero
    } else {
      cartData[itemId] = quantity; // Update quantity
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          "http://localhost:3000/api/cart/update",
          { itemId, quantity },
         config
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };
    delete cartData[itemId];
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    // Loop through each item in the cart
    for (const productId in cartItems) {
      // Find the product details
      const product = products.find((p) => p._id === productId);

      // If the product exists and has a valid discounted price
      if (product && product.discountedprice) {
        // Get the quantity of the product in the cart
        const quantity = cartItems[productId];

        // Ensure the quantity is a valid number
        if (typeof quantity === "number" && quantity > 0) {
          // Add to the total amount
          totalAmount += product.discountedprice * quantity;
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/list"
      );
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const getUserCart = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        toast.error("Unauthorized! Please log in first.");
        return;
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(
        "http://localhost:3000/api/cart/get",
        {},
        config
      );
  
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error(error.response?.data?.message || "Failed to load cart.");
    }
  };
  

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    token,
    setToken,
    navigate,
    products,
    delivery_fee,
    cartItems,
    currency,
    isCartOpen,
    closeCart,
    setCartItems,
    addToCart,
    getCartCount,
    updateCartItemQuantity,
    removeFromCart,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;