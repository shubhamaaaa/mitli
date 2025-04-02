import React from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Banner = () => {
  const { token, setToken}=useContext(ShopContext)
  const navigate=useNavigate()


  const logout = () => {
    navigate("/signin");
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="flex items-center justify-between bg-[#6F4D38] text-white px-10 py-2">
      {/* Contact Section */}
      <div className="flex items-center gap-3">
        <img
          className="w-6"
          src="https://img.icons8.com/?size=100&id=Fm3frqO6UcAG&format=png&color=FFFFFF"
          alt="Phone Icon"
        />
        <p className="text-sm font-medium">+91-9717199937</p>
      </div>

      {/* Express Shipping */}
      <p className="text-sm font-semibold tracking-wide">Express Shipping</p>

      {/* Auth Section */}
      <div className="flex items-center gap-5">
  {token ? (
    <button
      onClick={logout}
      className=" transition-all cursor-pointer font-serif px-4 py-1 rounded-md text-base font-semibold"
    >
      Logout
    </button>
  ) : (
    <>
      <NavLink to='/signin'>
        <div className="text-sm font-semibold cursor-pointer hover:text-gray-300 transition group relative">
          SIGN IN
          <hr className="w-full border-white mt-0.5 absolute left-0 hidden group-hover:block" />
        </div>
      </NavLink>

      <NavLink to='/signup'>
        <div className="text-sm font-semibold cursor-pointer hover:text-gray-300 transition group relative">
          SIGN UP
          <hr className="w-full border-white mt-0.5 absolute left-0 hidden group-hover:block" />
        </div>
      </NavLink>
    </>
  )}
</div>


    </div>
  );
};

export default Banner;
