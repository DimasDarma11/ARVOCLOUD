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
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}

          {/* Aturan Pemakaian */}
          <Link
            to="/rules"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Aturan
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="ml-6 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium shadow-sm hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-md border-t border-gray-200">
          <nav className="flex flex-col space-y-3 py-4 px-6 text-sm font-medium">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <Link
              to="/rules"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Aturan
            </Link>
            <Link
              to="/login"
              className="mt-3 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium text-center shadow-sm hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
