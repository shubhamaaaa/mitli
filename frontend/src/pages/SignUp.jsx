import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SignUp = () => {
  const {token,setToken,navigate}=  useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =  '/api/auth/register';
    const body = { email, mobile, password };

    try {
      const response = await fetch(`http://localhost:3000${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setToken(data.token)
        localStorage.setItem('token', data.token);
        alert('Registration successful');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    if (token) {
     navigate('/signin')
    }
   },[token])

  return (
    <div className="min-h-screen  flex items-center justify-center bg-[#FEF0E1] px-4">
      <div className="flex items-center my-2  max-w-4xl w-full bg-white  overflow-hidden">
        {/* Left Side - Image Section */}
        <div className="hidden md:block w-1/2 bg-[#8f6943] relative">
          <img
            src={assets.Login}
            alt="Sign Up Illustration"
            className="w-full h-full object-cover "
          />
        </div>

        {/* Right Side - Sign-up Form */}
        <div className="w-full md:w-1/2 p-10">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              className="w-16 h-16"
              src="https://mitli.in/uploads/logo/Mitli%20Enterprises%20Private%20Limited%20Logo_8608.png"
              alt="Company Logo"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mt-4">Create an Account</h2>
          <p className="text-md text-gray-500 text-center mb-6">Sign up to get started</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Mobile</label>
              <input
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 placeholder-gray-500'
                type='tel'
                placeholder='Mobile Number'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
      
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6F4D38] text-white font-semibold py-3 rounded-lg  transition-all shadow-md"
            >
              Sign Up
            </button>
          </form>

          {/* Bottom Links */}
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="text-[#6F4D38] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
