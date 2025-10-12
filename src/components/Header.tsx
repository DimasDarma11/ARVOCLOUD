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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer select-none group">
          <img
            src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
            alt="Arvocloud Logo"
            className="h-8 w-auto rounded-md transition-transform duration-500 group-hover:scale-110"
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

        {/* Login + Hamburger */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-md transition-all"
          >
            Login
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group"
          >
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-800 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 6, backgroundColor: "#2563EB" }
                  : { rotate: 0, y: -6, backgroundColor: "#111827" }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-800 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -6, backgroundColor: "#2563EB" }
                  : { rotate: 0, y: 6, backgroundColor: "#111827" }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-100/0 group-hover:bg-blue-100/40 transition-all duration-500"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 top-[64px] bg-white/70 backdrop-blur-2xl shadow-2xl 
                       border-t border-gray-100 flex flex-col items-center justify-center space-y-6
                       text-lg font-medium"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/rules"
                className="text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Aturan
              </Link>
            </motion.div>

            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Tutup Menu
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
