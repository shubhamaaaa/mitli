import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-5 py-3 md:px-10">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img className="w-24 md:w-28" src={assets.MITLIFINALLOGO} alt="Mitli Enterprises Logo" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={28} /> : <FiMenu  size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`fixed md:static top-0 z-50  left-0 w-full md:w-auto h-screen md:h-auto bg-white md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row gap-6 md:gap-8 p-8 md:p-0 transition-all ${
            menuOpen ? "block" : "hidden"
          } md:flex`}
        >
          <NavLink to="/" className="hover:text-[#d99b65] transition text-[#A07856] text-base font-medium" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-[#d99b65] transition text-[#A07856] text-base font-medium" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-[#d99b65] transition text-[#A07856] text-base font-medium" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </div>

        {/* Cart Icon with Badge */}
        <div className="relative cursor-pointer">
          <Link to="/cart">
            <img src="https://img.icons8.com/?size=100&id=16501&format=png&color=000000" className="w-6 hover:opacity-80 transition" alt="Cart" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
