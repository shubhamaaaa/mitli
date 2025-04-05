import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      {/* Show this image only on screens larger than 600px (sm and above) */}
      <div className="hidden sm:block">
        <img src={assets.Aboutus} alt="About Us Banner" />
      </div>

      {/* Show this image only on screens smaller than 600px */}
      <div className="block sm:hidden">
        <img src={assets.aboutuss} alt="About Us Mobile Banner" />
      </div>

      <div className="bg-gradient-to-b from-blue-50 to-white text-gray-800 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-[#6F4D38] ">About Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Your Health Partner – Naturally Empowering Your Well-being
            </p>
            <div className="mt-6 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </header>

          {/* Content Sections */}
          <div className="space-y-10">
            {/* Welcome Section */}
            <section className="bg-white shadow-xl rounded-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-3xl font-bold text-[#6F4D38] mb-4">
                Welcome to Mitli Enterprises Private Limited
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At <strong>Mitli Enterprises Private Limited</strong>, we are dedicated to enhancing your well-being through the power of nature.
                Our mission is to provide <strong>high-quality, natural products</strong> that support <strong>sexual health, vitality, and overall wellness</strong>.
              </p>
            </section>

            {/* Our Story */}
            <section className="bg-white shadow-xl rounded-lg p-8 border-l-4 border-green-600">
              <h2 className="text-3xl font-bold text-[#6F4D38] mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                We developed <strong>Shorya Prash</strong> to bring <strong>energy and strength</strong> into your life. 
                Founded by a team of health enthusiasts, our goal is to fill the gap for effective, <strong>natural solutions</strong> in the market.
              </p>
            </section>

            {/* Our Philosophy */}
            <section className="bg-white shadow-xl rounded-lg p-8 border-l-4 border-yellow-500">
              <h2 className="text-3xl font-bold text-[#6F4D38] mb-4">
                Our Philosophy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We prioritize <strong>quality and authenticity</strong>. Our ingredients are sourced from <strong>trusted suppliers</strong>, 
                ensuring that every jar of <strong>Shorya Prash</strong> is packed with the goodness of nature. 
                Our commitment to <strong>sustainability and ethical practices</strong> is at the core of everything we do.
              </p>
            </section>

            {/* Why Choose Us? */}
            <section className="bg-white shadow-xl rounded-lg p-8 border-l-4 border-purple-600">
              <h2 className="text-3xl font-bold text-[#6F4D38] mb-4">Why Choose Us?</h2>
              <ul className="list-disc text-gray-700 ml-6 space-y-3">
                <li>
                  <strong>100% Natural Ingredients:</strong> No chemicals, just pure herbal goodness.
                </li>
                <li>
                  <strong>Research-Backed Formulation:</strong> Our products are developed based on traditional principles and modern research.
                </li>
                <li>
                  <strong>Customer-Centric Approach:</strong> We provide exceptional service and support.
                </li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="bg-white shadow-xl rounded-lg p-8 border-l-4 border-red-500">
              <h2 className="text-3xl font-bold text-[#6F4D38] mb-4">Get in Touch</h2>
              <p className="text-gray-700">
                📩 <strong>Email:</strong>{" "}
                <a href="mailto:mitli.enterprises01@gmail.com" className="text-blue-600 hover:underline font-semibold">
                  mitli.enterprises01@gmail.com
                </a>
              </p>
              <p className="text-gray-700 mt-3">
                🔗 <strong>Connect with Us:</strong>{" "}
                <a href="#" className="text-blue-600 hover:underline font-semibold">
                  Social Media Links
                </a>
              </p>
            </section>
          </div>

          {/* Footer */}
          <footer className="text-center mt-12 text-gray-600 text-lg">
            <p>Thank you for choosing <strong>Mitli Enterprises Private Limited</strong>!</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default About;
