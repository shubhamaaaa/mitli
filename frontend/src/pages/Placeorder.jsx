import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [referralCode, setReferralCode] = useState(""); // Referral code from localStorage (if any)
  const [referralDiscount, setReferralDiscount] = useState(0); // Initially 0, will be set to 50 if referral code exists
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);

  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  // Calculate cart total (subtotal + delivery fee)
  const cartTotal = getCartAmount() + gst;

  // Billing address form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // On mount, check if a referral code exists in localStorage
  useEffect(() => {
    const storedReferralCode = localStorage.getItem("referralCode");
    if (storedReferralCode) {
      setReferralCode(storedReferralCode);
      setReferralDiscount(1800); // Apply ₹50 referral discount automatically
    }
  }, []);

  

  // Recalculate final total whenever cartTotal, coupon discount, or referral discount changes
  useEffect(() => {
    const newTotal = cartTotal - discount - referralDiscount;
    setTotalAfterDiscount(newTotal);

    const newtotalamount = getCartAmount();
    const newGst = Math.round(newtotalamount * 0.12);
    setGst(newGst);
    console.log(gst);
  

  }, [cartTotal, discount, referralDiscount]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const applyCoupon = async () => {
    try {
      const totalAmount = cartTotal;
      const { data } = await axios.post(
        "https://mitli.in/api/coupon/apply",
        { code: couponCode, totalAmount },
        { headers: { token } }
      );

      if (data.success) {
        setDiscount(data.discount);
        toast.success(
          `Coupon applied successfully! You saved ₹${data.discount}`
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply coupon");
    }
  };

  const applyReferral = async () => {
    if (!referralCode) {
      toast.error("Please enter a referral code to get a discount.");
      return;
    }
    setReferralDiscount(1800);
    toast.success(`Referral code applied! You saved ₹1800`);
  };

  const initPay = (order, userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Not authorized. Please log in again.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const paymentData = {
            ...response,
            userId,
          };

          const { data } = await axios.post(
            "https://mitli.in/api/order/verifyRazorpay",
            paymentData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            navigate("/orders");
            setCartItems({});
            toast.success("Payment successful and verified!");
          } else {
            toast.error(data.message || "Payment verification failed.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification failed.");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const placeOrder = async (orderData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token format.");
      }

      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      const userId = decodedPayload.id;

      if (!userId) {
        throw new Error("User ID not found in token.");
      }
      const requestData = {
        ...orderData,
        userId,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Sending Order Data:", requestData);

      const response = await axios.post(
        "https://mitli.in/api/order/place",
        requestData,
        config
      );

      return response.data;
    } catch (error) {
      console.error(
        "Order Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      if (Object.keys(cartItems).length === 0) {
        toast.error("Your cart is empty!");
        return;
      }

      for (const productId of Object.keys(cartItems)) {
        if (cartItems[productId] > 0) {
          const itemInfo = products.find(
            (product) => product._id === productId
          );
          if (itemInfo) {
            orderItems.push({ ...itemInfo, quantity: cartItems[productId] });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("No valid items found in cart!");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Not authorized. Please log in again.");
        return;
      }

      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        toast.error("Invalid token. Please log in again.");
        return;
      }

      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      const userId = decodedPayload.id;

      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const finalReferralDiscount = referralCode ? referralDiscount : 0;

      let orderData = {
        address: formData,
        items: orderItems,
        amount: cartTotal - discount - finalReferralDiscount,
        couponCode,
        discount,
        referralCode,
        referralDiscount: finalReferralDiscount,
        userId,
      };

      switch (method) {
        case "cod": {
          const response = await placeOrder(orderData);
          if (response.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order placed successfully!");
          } else {
            toast.error(response.message);
          }
          break;
        }

        case "razorpay": {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const responseRazorpay = await axios.post(
            "https://mitli.in/api/order/razorpay",
            orderData,
            config
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order, userId);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col pb-10 sm:flex-row justify-between gap-8 pt-4 sm:pt-8 min-h-[80vh] border-t px-4 sm:px-20 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="flex flex-col gap-6 w-full sm:h-[600px] sm:max-w-[600px] sm:mt-16 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Billing Address</h2>
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
          type="email"
          placeholder="Email Address"
        />
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="text"
            placeholder="Pin Code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="number"
            placeholder="Mobile"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
          type="text"
          placeholder="Address"
        />
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="text"
            placeholder="Country"
          />
          <input
            className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
            type="number"
            placeholder="Alt Mobile"
          />
           <input
              className="border px-4 py-2 hidden rounded-lg w-full"
              type="text"
              placeholder="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
        </div>
      </div>

      <div className="mt-8 w-full sm:max-w-[450px]">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Payment and Shipping</h2>
          <div className="flex flex-col gap-4">
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                method === "razorpay"
                  ? "border-black shadow-md bg-gradient-to-r from-gray-50 to-gray-100"
                  : "border-gray-200 hover:border-black hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                  method === "razorpay"
                    ? "bg-black border-black"
                    : "border-gray-300"
                }`}
              >
                {method === "razorpay" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <img className="h-6" src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div
             // onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                method === "cod"
                  ? "border-black shadow-md bg-gradient-to-r from-gray-50 to-gray-100"
                  : "border-gray-200 hover:border-black hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                  method === "cod" ? "bg-black border-black" : "border-gray-300"
                }`}
              >
                {method === "cod" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <p className="text-gray-700 text-sm font-medium">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Finalize your sustainable shopping journey with ease. Our secure
            checkout ensures your eco-friendly purchases are just a click away.
            Join us in promoting a greener future – complete your order and
            contribute to positive change today!
          </p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Apply Coupon</h3>
            <div className="flex gap-2">
              <input
                className="border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition-all hover:border-gray-300 placeholder-gray-400"
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="mt-2 text-green-600">
                Discount Applied: ₹{discount}
              </p>
            )}
          </div>
        </div>
        {/* Referral Code Section */}
        <div className="mt-4 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Referral Code</h3>
          <div className="flex gap-2">
            <input
              className="border px-4 py-2 rounded-lg w-full"
              type="text"
              placeholder="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
            <button
              type="button"
              onClick={applyReferral}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
          {referralDiscount > 0 && (
            <p className="mt-2 text-blue-600">
              Referral Discount Applied: ₹{referralDiscount}
            </p>
          )}
        </div>
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 text-gray-600 text-sm">
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p className="font-medium text-gray-800">₹{getCartAmount()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>GST</p>
              <p className="font-medium text-gray-800">₹{gst}</p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <p>Coupon Discount</p>
                <p className="font-medium text-green-600">-₹{discount}</p>
              </div>
            )}
            {referralDiscount > 0 && (
              <div className="flex justify-between items-center text-blue-600 font-medium">
                <p>Referral Discount</p>
                <p>-₹{referralDiscount}</p>
              </div>
            )}
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between items-center font-semibold text-lg text-gray-800">
              <p>Total</p>
              <p>
                ₹
                {totalAfterDiscount !== null
                  ? totalAfterDiscount
                  : cartTotal - discount - referralDiscount}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white px-16 py-3 text-sm rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 mt-6"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
