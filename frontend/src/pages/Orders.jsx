import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from 'react-toastify';
import axios from "axios";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login to view your orders");
        return;
      }

      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        toast.error("Invalid session. Please login again.");
        return;
      }

      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      const userId = decodedPayload.id;

      if (!userId) {
        toast.error("User identification failed. Please login again.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        'https://mitli.in/api/order/userorders',
        { userId }, // Send userId in the request body
        config
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id // Include order ID for reference
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Order loading error:", error);
      const errorMsg = error.response?.data?.message || 
                      "Failed to load orders. Please try again later.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-16 lg:px-32 pt-8 pb-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#6F4D38]">
          Your Orders
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Track and manage your recent purchases
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6F4D38]"></div>
          <p className="mt-2 text-gray-600">Loading your orders...</p>
        </div>
      )}

      {/* Orders List */}
      {!loading && (
        <>
          {orderData.length > 0 ? (
            <div className="space-y-6 max-w-5xl mx-auto">
              {orderData.map((item, index) => (
                <div
                  key={`${item.orderId}-${item._id}-${index}`}
                  className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-6 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Product Details */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    <div className="relative">
                      <img
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-gray-200 object-cover"
                        src={item.image?.[0] || "/images/placeholder-product.jpg"}
                        alt={item.name || "Product"}
                        onError={(e) => {
                          e.target.src = "/images/placeholder-product.jpg";
                        }}
                      />
                      {item.quantity > 1 && (
                        <span className="absolute -top-2 -right-2 bg-[#6F4D38] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-xl font-semibold text-[#6F4D38]">
                        {item.name}
                      </p>
                      <p className="text-lg font-medium text-gray-800 mt-1">
                        {currency} {item.discountedprice?.toLocaleString() || item.price?.toLocaleString()}
                      </p>
                      {item.discountedprice < item.price && (
                        <p className="text-sm text-gray-500 line-through">
                          {currency} {item.price?.toLocaleString()}
                        </p>
                      )}
                      <div className="mt-3 space-y-1 text-gray-600 text-sm">
                        <p>
                          <span className="font-medium">Ordered on:</span> {formatDate(item.date)}
                        </p>
                        <p>
                          <span className="font-medium">Payment:</span> {item.paymentMethod} ({item.payment?.status || 'N/A'})
                        </p>
                        <p>
                          <span className="font-medium">Order ID:</span> {item.orderId?.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Status & Actions */}
                  <div className="flex flex-col items-end gap-4 sm:w-48">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <button 
                        className="w-full px-4 py-2 text-sm font-medium bg-[#6F4D38] text-white rounded-lg hover:bg-[#5a3d2c] transition-colors"
                        onClick={loadOrderData}
                      >
                        Track Order
                      </button>
                      <button 
                        className="w-full px-4 py-2 text-sm font-medium bg-white text-[#6F4D38] border border-[#6F4D38] rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-gray-500">You haven't placed any orders yet.</p>
              <div className="mt-6">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6F4D38] hover:bg-[#5a3d2c]"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
