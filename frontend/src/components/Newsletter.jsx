import React, { useState } from 'react';
import axios from 'axios'; // 

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();   

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("https://mitli.in/api/subscribe", { email });
      alert(response.data.message);
      setEmail("");
      setSubscribed(true);
    } catch (error) {
      alert(error.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="bg-[#6F4D38] py-12 px-6 transform transition-transform duration-300">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-lg text-gray-200 mb-8">
          Join our newsletter to receive the latest news, updates, and exclusive offers straight to your inbox.
        </p>

        {subscribed ? (
          <p className="text-green-300 font-semibold text-xl">🎉 Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-72 px-6 py-3 border border-transparent rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400 
                        bg-white bg-opacity-20 text-black"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-[#6F4D38] cursor-pointer  font-bold rounded-lg hover:bg-opacity-90 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
