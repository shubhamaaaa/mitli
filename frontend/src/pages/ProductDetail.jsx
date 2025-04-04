import React, { useState, useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProduct";
import SidebarCart from "../components/SidebarCart";
import { GiShare } from "react-icons/gi";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("ref");

  useEffect(() => {
    if (refCode) {
      localStorage.setItem("referralCode", refCode); // Save referral code
    }
  }, [refCode]);
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = () => {
      setLoading(true);
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setSelectedImage(product.image[0]); // Set default selected image
      }
      setLoading(false);
    };

    fetchProductData();
  }, [productId, products]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl text-blue-500">Loading...</div>
    );
  }

  if (!productData) {
    return (
      <div className="text-center py-10 text-xl text-red-500">
        Product Not Found
      </div>
    );
  }

  const fetchReferralLink = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Redirecting to login...");
      return null; // Handle redirection if needed
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/getuser?productId=${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        throw new Error("Failed to fetch referral link.");
      }

      const data = await response.json();
      return data.referralUrl;
    } catch (error) {
      console.error("Error fetching referral link:", error);
      return null;
    }
  };

  const handleShare = async (productName, productId) => {
    const referralUrl = await fetchReferralLink(productId); // Fetch referral link with productId

    if (!referralUrl) {
      alert("Please login to share and earn rewards.");
      return;
    }

    if (navigator.share) {
      navigator
        .share({
          title: productName,
          text: `Check out this product: ${productName}`,
          url: referralUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(referralUrl);
      alert("Referral link copied to clipboard!");
    }
  };

  const productUrl = window.location.href;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt={productData.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-3 mt-4">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-600 transition-all"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-4">
          <p className="text-lg text-gray-600 font-medium uppercase font-serif tracking-wide">
            MUSCLETECH HD ELITE
          </p>
          <h1 className="text-4xl font-bold text-[#6F4D38]">
            {productData.name}
          </h1>

          <div className="flex flex-row items-center gap-1.5">
            {Array(4)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-5"
                  src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000"
                  alt="star"
                />
              ))}
            <img
              className="w-5"
              src="https://img.icons8.com/?size=100&id=tKTHzO8F7kZi&format=png&color=000000"
              alt="half-star"
            />
          </div>

          {/* Pricing Section */}
          <div className="flex items-center gap-4">
            <p className="text-gray-500 line-through text-lg">
              ₹{productData.actualprice}
            </p>
            <p className="text-red-600 text-3xl font-bold">
              ₹{productData.discountedprice}
            </p>
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {productData.offer}% OFF
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(productData._id)}
              className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            
          </div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={() => handleShare(productData.name, productUrl)}
              className="text-lg text-gray-400 font-medium cursor-pointer font-serif hover:text-blue-600"
            >
              Share This Product
            </p>
            <button
              onClick={() => handleShare(productData.name, productData._id)}
              className="flex items-center cursor-pointer gap-2 text-gray-600
              hover:text-blue-600"
            >
              <GiShare className="text-xl" />
            </button>
            {/* <img className="w-5 h-5  " src="https://img.icons8.com/?size=100&id=83213&format=png&color=000000" alt="" /> */}
          </div>
        </div>
      </div>

      {/* Safe Payment & Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 p-6 bg-[#6F4D38] rounded-lg shadow-md">
        {[
          {
            icon: "https://mitli.in/assets_new/images/credit-card.png",
            title: "Safe Payment",
            desc: "Pay with the world's most trusted payment methods.",
          },
          {
            icon: "https://mitli.in/assets_new/images/shield.png",
            title: "Confidence",
            desc: "Your purchase and personal data are secure.",
          },
          {
            icon: "https://mitli.in/assets_new/images/worldwide.png",
            title: "Worldwide Delivery",
            desc: "FREE & fast shipping to over 200+ countries.",
          },
          {
            icon: "https://mitli.in/assets_new/images/phone-call.png",
            title: "Hotline Support",
            desc: "Call us anytime at +91-9717199937.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-12 h-12 object-contain"
            />
            <div>
              <p className="font-semibold text-[#6F4D38]">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
      <SidebarCart />
    </div>
  );
};

export default ProductDetail;