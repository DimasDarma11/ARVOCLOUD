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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const menuItems = ["Services", "Pricing", "About", "Contact"];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
        isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none cursor-pointer">
          <img
            src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
            alt="Arvocloud Logo"
            className="h-8 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <Link
            to="/rules"
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Aturan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden md:inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Login
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center relative"
          >
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-900 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 6, backgroundColor: "#2563EB" }
                  : { rotate: 0, y: -6, backgroundColor: "#111827" }
              }
              transition={{ duration: 0.4 }}
            />
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-900 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -6, backgroundColor: "#2563EB" }
                  : { rotate: 0, y: 6, backgroundColor: "#111827" }
              }
              transition={{ duration: 0.4 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full h-full z-[70] bg-white/80 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 text-lg font-semibold text-gray-900"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-blue-600 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {item}
              </motion.a>
            ))}

            <Link
              to="/rules"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600 transition-all"
            >
              Aturan
            </Link>

            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
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
