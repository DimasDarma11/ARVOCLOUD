import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Services", desc: "Solusi cloud & sistem digital modern", href: "#services" },
    { name: "Pricing", desc: "Paket fleksibel untuk setiap kebutuhan", href: "#pricing" },
    { name: "About", desc: "Cerita dan misi kami di balik Arvocloud", href: "#about" },
    { name: "Contact", desc: "Hubungi tim kami untuk kolaborasi", href: "#contact" },
  ];

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
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.name}
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
          >
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-800 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 6, backgroundColor: "#1E3A8A" }
                  : { rotate: 0, y: -6, backgroundColor: "#111827" }
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-800 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -6, backgroundColor: "#1E3A8A" }
                  : { rotate: 0, y: 6, backgroundColor: "#111827" }
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl shadow-xl border-t border-gray-100"
          >
            <div className="flex flex-col py-5 px-6 space-y-4">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-start justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <div>
                    <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 group-hover:text-blue-600 transition-all mt-1"
                  />
                </motion.a>
              ))}
              <hr className="border-gray-200 my-2" />
              <Link
                to="/rules"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                Aturan Platform
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
