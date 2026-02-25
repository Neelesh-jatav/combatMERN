// src/layout/BottomBar.jsx

import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import logo_combat from "../assets/logo_combat.png"; // Replace with jet-style logo if needed

const BottomBar = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-1 pb-6 px-8 text-sm text-gray-600">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-6 md:gap-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo_combat} alt="Combat Logo" className="h-12 object-contain" />
        </div>

        {/* Main Links */}
        <div className="flex flex-wrap justify-center space-x-6 font-semibold text-gray-900">
          {[
           "Inspiration",
            "About",
            "Support",
          ].map((item) => (
            <a key={item} href="#" className="hover:text-blue-600">{item}</a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 text-gray-700">
          <FaTwitter className="hover:text-blue-500 cursor-pointer" />
          </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-100 pt-4 text-xs text-gray-500 gap-4">
        <div>© 2025 Combat. All rights reserved.</div>
        <div className="flex space-x-4">
          {["Terms", "Privacy", "Cookies"].map((item) => (
            <a key={item} href="#" className="hover:text-blue-600">{item}</a>
          ))}
        </div>
        <div className="flex space-x-4">
          {["Places", "Resources"].map((item) => (
            <a key={item} href="#" className="hover:text-blue-600">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;
