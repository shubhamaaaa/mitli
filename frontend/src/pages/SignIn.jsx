import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SignIn = () => {
  const {token,setToken,navigate}= useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =  '/api/auth/login' ;
    const body =  { email, password, rememberMe };

    try {
      const response = await fetch(`https://mitli.in${url}`, {
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
        alert( 'Login successful');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('https://mitli.in/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    if (token) {
     navigate('/')
    }
   },[token])


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF0E1]  px-4">
      <div className="flex items-center max-w-4xl   w-full bg-white overflow-hidden">
        {/* Left Side - Image Section */}
        <div className="hidden md:block w-1/2  relative">
          <img
            src={assets.SignUp}
            alt="Sign In Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Sign-in Form */}
        <div className="w-full md:w-1/2 p-10">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              className="w-16 h-16"
              src={assets.MITLIFINALLOGO}
              alt="Company Logo"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mt-4">Welcome Back</h2>
          <p className="text-md text-gray-500 text-center mb-6">Sign in to continue your journey</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6F4D38] text-white font-semibold py-3 rounded-lg  transition-all shadow-md"
            >
              Sign In
            </button>
          </form>

          {/* Bottom Links */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <Link onClick={handleForgotPassword} className="hover:text-blue-600 transition">
              Forgot Password?
            </Link>

            <label className="flex items-center text-sm text-[#A9ABAE]">
          <input  checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" className="mr-2  text-[#A9ABAE] cursor-pointer" />
          Remember Me
        </label>
            
          </div>
          <p className="pt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#6F4D38] font-medium hover:underline">
                Sign Up
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
