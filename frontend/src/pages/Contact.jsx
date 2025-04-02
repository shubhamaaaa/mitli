import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    try {
      const response = await fetch("http://localhost:3000/api/contact/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setResult("");
        toast.success("Form Submitted Successfully");
        setFormData({ name: "", email: "", message: "" }); // Reset form state
      } else {
        toast.error(result.message || "Submission Failed");
        setResult("");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("An error occurred while submitting the form");
      setResult("");
    }
  };

  return (
    <div>
      <img src={assets.Contactsus} alt="" />
      <div className="bg-[#baa99f] min-h-screen flex items-center justify-center p-6">
        <div className="w-full bg-white  rounded-lg p-8">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-[#6F4D38] ">Contact Us</h1>
            <p className="mt-3 text-lg text-gray-600">
              Get in touch with us for any queries or support.
            </p>
            <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </header>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Send a Message</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#6F4D38] text-white font-bold py-3 rounded-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-2xl">📧</span>
                  <p className="text-gray-700">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@mitli.in" className="text-blue-600 hover:underline">
                       mitli.enterprises01@gmail.com
                    </a>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-2xl">📞</span>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> +91 98765 43210
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-2xl">📍</span>
                  <p className="text-gray-700">
                    <strong>Address:</strong> Mitli Enterprises Pvt. Ltd. 44, 2nd  Floor Regal Building, Connaught Place New Delhi -110001 India

 
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Location</h2>
            <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://www.google.com/maps/embed?..."
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <footer className="text-center mt-10 text-gray-600">
            <p>We look forward to hearing from you! 🌟</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
