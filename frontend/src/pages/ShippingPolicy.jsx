import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Shipping Policy</h1>
        <p className="text-gray-600 text-center mb-6">
          Thank you for shopping with us! We strive to ensure your order is processed and shipped as quickly as possible.
        </p>

        {/* Shipping Timeframe */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipping Timeframe</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>All orders delivered in 2-7 days.</li>
            <li>Standard shipping takes an estimated 7 working days for delivery once the order has been processed.</li>
          </ul>
        </div>

        {/* Shipping Costs */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipping Costs</h2>
          <p className="text-gray-600">Shipping costs are calculated at checkout based on your location and order size.</p>
        </div>

        {/* Order Tracking */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Tracking</h2>
          <p className="text-gray-600">Once your order has shipped, you will receive a confirmation email with a tracking number to monitor your shipment.</p>
        </div>

        {/* Delivery Issues */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Delivery Issues</h2>
          <p className="text-gray-600">If you experience any issues with your delivery, don't hesitate to get in touch with our customer service team:</p>
          <p className="text-gray-600 mt-2"><strong>Phone:</strong> 9717199937</p>
          <p className="text-gray-600"><strong>Email:</strong> <a href="mailto:info@mitli.in" className="text-blue-600 hover:underline">info@mitli.in</a></p>
        </div>

        <p className="text-center text-gray-600 font-semibold">We appreciate your patience and support. Happy shopping!</p>
      </div>
    </div>
  );
};

export default ShippingPolicy;