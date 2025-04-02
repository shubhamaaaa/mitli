import razorpay from "razorpay";
import orderModel from "../models/orderModel.js";
import User from "../models/User.js";

// Global Variables
const CURRENCY = "INR";
const deliveryCharge = 10;

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);

// Initialize Razorpay
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place Order - COD Method
const placeOrder = async (req, res) => {
  try {
    console.log("Received Order Data:", req.body);

    const {
      userId,
      items,
      amount,
      address,
      couponCode,
      discount = 0,
      referralCode,
    } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items provided in the order" });
    }

    const discountedAmount = Math.max(amount - discount, 0); // Ensure amount is not negative

    const orderData = {
      userId,
      address,
      items,
      amount: discountedAmount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
      referralCode,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart after successful order
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log("Order Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Place Order - Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address, couponCode, discount } = req.body;

    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "No items provided in the order",
      });
    }

    const discountedAmount = Math.max(amount - (discount || 0), 0);

    const orderData = {
      userId,
      address,
      items,
      amount: discountedAmount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      couponCode,
      discount: discount || 0,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Create Razorpay order
    const options = {
      amount: discountedAmount * 100, // Convert to paise
      currency: CURRENCY,
      receipt: newOrder._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Razorpay order creation failed",
        });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders (Admin)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get User Orders (Frontend)
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status (Admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status, } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const updateStatusReferral = async (req, res) => {
  try {
    const { referralCode, status } = req.body;
    if(status == "Delivered"){
      // Update all orders where referralCode matches
       // Find the user with this referralCode
      const user = await User.findOne({ referralCode });
      let referralcount = Number(user.totalreferral) + 1;
      
      if (user) {
        // Increment totalreferral count
        await User.findByIdAndUpdate(user._id, { totalreferral: referralcount } );
      }

      res.json({
        success: true,
        message: "Referral Orders Updated",
      });

    }else{
      res.json({
        success: true,
        message: "Referral Orders Updated",
      
      });
    }
    

   

  } catch (error) {
    console.error("Error updating referral orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


  const updateusercount=async (req,res)=>{
    try {
      const {referralCode } = req.body;
      const user = await User.find({ referralCode });
      console.log(user)
      res.json({ success: true, message: "Status Updated" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }

export {
  verifyRazorpay,
  updateStatusReferral,
  updateusercount,
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};