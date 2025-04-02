import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Product = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="flex flex-col items-center py-5 bg-gray-100">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-[#6F4D38] uppercase pb-2 mb-8">
        Our Products
      </h2>

      <div className="flex justify-center gap-5 items-start w-full">
        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 w-[100%]">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Side Image */}
       {/**  <div className="hidden md:block w-[30%]">
          <img
            src="https://mitli.in//uploads/site_data/aa.jpg"
            alt="Promo Banner"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>*/}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link to={`/product/${product._id}`} className="block">
      <div
        className="bg-white rounded-lg overflow-hidden transition duration-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Product Image */}
        <div className="relative w-full h-full">
          <img
            src={hover && product.image[1] ? product.image[1] : product.image[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="p-4  text-center">
          <h3 className="text-2xl font-bold text-[#6F4D38]">{product.name}</h3>
          <p className="text-gray-500 line-through">₹{product.actualprice}</p>
          <p className="text-red-500 text-xl font-bold">₹{product.discountedprice}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
