import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white border-r shadow-lg flex flex-col justify-between">
      {/* Navigation Menu */}
      <nav className="flex flex-col mt-6 space-y-2">
        {[
          { to: "/add", icon: assets.add_icon, label: "Add Items" },
          { to: "/list", icon: assets.order_icon, label: "List Items" },
          { to: "/orders", icon: assets.order_icon, label: "Order Items" },
          { to: "/contacts", icon: assets.contact, label: "Contacts" },
          { to: "/subscriber", icon: assets.subscription, label: "Subscriptions" },
          { to: "/refreels", icon: assets.subscription, label: "ReferralCount" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:shadow"
              }`
            }
          >
            <img className="w-6 h-6" src={item.icon} alt={item.label} />
            <p className="hidden md:block text-[15px] font-medium">{item.label}</p>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}


    </div>
  );
};

export default Sidebar;
