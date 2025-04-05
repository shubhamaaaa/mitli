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
      const response = await fetch("https://mitli.in/api/contact/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setResult("");
        toast.success("Form Submitted Successfully");
        setFormData({ name: "", email: "", message: "" });
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
    <div className="flex flex-col items-center w-full min-h-screen bg-[#baa99f] ">
      <div className="hidden sm:block">
      <img src={assets.Contactsus} alt="" className="w-full  mb-6" />
      </div>

      <div className="block sm:hidden">
      <img src={assets.Contactus} alt="" className="w-full  mb-6" />
      </div>
      
      <div className="w-full max-w-5xl bg-white rounded-lg p-6 sm:p-8 ">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6F4D38]">Contact Us</h1>
          <p className="mt-3 text-md sm:text-lg text-gray-600">
            Get in touch with us for any queries or support.
          </p>
          <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full bg-[#6F4D38] text-white font-bold py-3 rounded-lg transition-all hover:bg-[#5A3B29]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Details</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:info@mitli.in" className="text-blue-600 hover:underline">mitli.enterprises01@gmail.com</a></p>
              <p><strong>Phone:</strong> +91 9717199937</p>
              <p><strong>Address:</strong> Mitli Enterprises Pvt. Ltd. 44, 2nd Floor Regal Building, Connaught Place New Delhi -110001 India</p>
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
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3967.4366317218037!2d77.21879070742466!3d28.627727137824497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20Mitli%20Enterprises%20Pvt.%20Ltd.%2044%2C%202nd%20Floor%20Regal%20Building%2C%20Connaught%20Place%20New%20Delhi%20-110001%20India!5e0!3m2!1sen!2sin!4v1743679216511!5m2!1sen!2sin" 
            ></iframe>
          </div>
        </div>

        <footer className="text-center mt-10 text-gray-600">
          <p>We look forward to hearing from you! 🌟</p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
