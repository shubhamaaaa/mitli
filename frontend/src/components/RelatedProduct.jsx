import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products
        .filter((item) => item.category === category && item._id) 
        .slice(0, 5);
      setRelated(filteredProducts);
    }
  }, [products, category]);

  return (
    <div className="my-16">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#6F4D38] ">Related Products</h2>
        <p className="text-gray-500 mt-1">Explore similar products you might like.</p>
      </div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {related.length > 0 ? (
          related.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:shadow-xl"
            >
              <Link to={`/product/${item._id}`} className="block">
                {/* Product Image */}
                <div className="relative w-full h-60 overflow-hidden">
                  <img
                    src={item.image?.[0] || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-t-xl transform transition duration-300 hover:scale-105"
                  />
                  {item.offer > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.offer}% OFF
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col items-center justify-center space-y-2">
                  {/* Star Rating (Static for now) */}
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

                  <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-600">₹{item.discountedprice}</span>
                    <span className="text-sm text-gray-400 line-through">₹{item.actualprice}</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="mt-4 w-full bg-[#6F4D38] text-white py-2 rounded-md font-medium transition hover:bg-gray-800">
                    Add to Cart 🛒
                  </button>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-6">No related products found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default RelatedProducts;
