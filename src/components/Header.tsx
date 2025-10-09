import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Server } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Services", "Pricing", "About", "Contact"];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer select-none group">
          <img
            src="https://i.ibb.co/Xrzm1whv/Arvocloud.jpg"
            alt="Arvocloud Logo"
            className="h-8 w-auto rounded-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-700 hover:text-blue-600 transition-colors group"
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <Link
            to="/rules"
            className="relative text-gray-700 hover:text-blue-600 transition-colors group"
          >
            Aturan
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            to="/login"
            className="ml-6 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-300"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-200 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col space-y-3 py-5 px-6 text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            to="/rules"
            className="text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Aturan
          </Link>
          <Link
            to="/login"
            className="mt-3 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium text-center shadow-sm hover:opacity-90 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
