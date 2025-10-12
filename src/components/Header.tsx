import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="flex items-center space-x-3 cursor-pointer select-none group">
          <img
            src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
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
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-all"
          >
            Login
          </Link>

          <button
            className="md:hidden flex flex-col justify-between w-6 h-4 group relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: isMenuOpen ? 0.6 : 1,
                  scale: isMenuOpen ? 0.95 : 1,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block h-[2px] w-full bg-gray-800 rounded-full"
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-lg shadow-md border-t border-gray-200"
          >
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
