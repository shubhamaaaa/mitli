import CoupanModel from "../models/CoupanModel.js";



export const applyCoupon = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    console.log("Received coupon code:", code);
    console.log("Received totalAmount:", totalAmount);

    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid total amount received",
      });
    }

    // Find the coupon
    const coupon = await CoupanModel.findOne({ code, isActive: true });

    if (!coupon) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid coupon code" });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon has expired" });
    }

    if (totalAmount < coupon.minPurchaseAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase amount is ₹${coupon.minPurchaseAmount}`,
      });
    }

    let discount = coupon.discount; // Fixed amount discount
    if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
      discount = coupon.maxDiscountAmount;
    }

    // Calculate new total after discount
    const newTotalAmount = Math.max(totalAmount - discount, 0);

    console.log("Calculated discount:", discount);
    console.log("New total amount:", newTotalAmount);

    return res.status(200).json({
      success: true,
      discount: discount,
      newTotalAmount,
    });
  } catch (error) {
    console.error("Error in applyCoupon:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};