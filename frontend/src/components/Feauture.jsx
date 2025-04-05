import React from "react";
import { motion } from "framer-motion";

const features = [
  { icon: "📜", title: "100% Natural Ingredients", desc: "Crafted with pure herbs, free from chemicals and additives.", color: "text-indigo-600" },
  { icon: "🔬", title: "Science & Tradition", desc: "A blend of Ayurveda and modern research-backed formulations.", color: "text-green-600" },
  { icon: "⭐", title: "Premium Quality", desc: "We source from trusted suppliers ensuring the highest quality standards.", color: "text-yellow-500" },
  { icon: "❤️", title: "Customer First", desc: "Dedicated to delivering exceptional support and satisfaction.", color: "text-purple-600" },
  { icon: "🌿", title: "Sustainable & Ethical", desc: "Our commitment to sustainability drives our ethical sourcing practices.", color: "text-red-500" },
  { icon: "⚡", title: "Boosts Vitality", desc: "Enhance energy, strength, and overall well-being naturally.", color: "text-blue-600" }
];

const Feature = () => {
  return (
    <section className="bg-white sm:shadow-xl shadow-none sm:rounded-lg rounded-none p-12 border-l-4 border-indigo-600">
      <motion.h2 
        className="text-4xl font-extrabold text-[#6F4D38] mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Key Features
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-lg  transition duration-300 transform hover:-translate-y-2 hover:bg-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div 
              className={`${feature.color} text-5xl`}
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {feature.icon}
            </motion.div>
            <div>
              <h3 className="text-2xl font-semibold text-[#6F4D38]">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
