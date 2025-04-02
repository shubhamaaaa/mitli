import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const {getCartCount}=useContext(ShopContext)
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-8 py-3">
      {/* Logo Section */}
      <div>
        <Link to='/'>
        <img 
          className="w-28" 
          src={assets.MITLIFINALLOGO} 
          alt="Mitli Enterprises Logo" 
        />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 text-[#A07856] text-sm font-medium">
       <NavLink to='/'><p className="cursor-pointer hover:text-[#d99b65] transition">Home</p></NavLink>
       <NavLink to='/about'><p className="cursor-pointer hover:text-[#d99b65]  transition">About</p></NavLink>
       <NavLink to='/contact'><p className="cursor-pointer hover:text-[#d99b65]  transition">Contact</p></NavLink>
      </div>

      {/* Cart Icon with Badge */}
      <div className="relative cursor-pointer">
     <Link to='/cart'> <img
          src="https://img.icons8.com/?size=100&id=16501&format=png&color=000000"
          className="w-6 hover:opacity-80 transition"
          alt="Cart"
        />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
        {getCartCount()}
        </span></Link> 
      </div>
    </div>
  );
};

export default Navbar;
