import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, Server } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl animate-pulse">
            <Server className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ARVOCLOUD
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-700 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}

          {/* Login Button */}
          <Link
            to="/login"
            className="ml-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            LOGIN
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700 transition-transform duration-300 rotate-180" /> 
                      : <Menu className="h-6 w-6 text-gray-700 transition-transform duration-300" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-2 pb-4 bg-white/90 backdrop-blur-md shadow-lg rounded-b-2xl border-t border-gray-200 transition-all duration-500">
          <div className="flex flex-col space-y-3 pt-4 px-6 font-medium">
            {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center"
            >
              LOGIN
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;



