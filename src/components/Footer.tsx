import React from "react";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200 text-gray-600">
      <div className="container mx-auto px-6 py-12 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="https://i.ibb.co.com/Xrzm1whv/Arvocloud.jpg"
            alt="ARVOCLOUD Logo"
            className="h-10 w-auto rounded-lg shadow-sm border border-gray-200"
          />
        </div>

        {/* Short Description */}
        <p className="text-sm max-w-md mx-auto mb-8 text-gray-600">
          Solusi cloud cepat, aman, dan andal untuk bisnis modern serta kebutuhan server profesional Anda.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-5 mb-8">
          <a
            href="https://instagram.com/dimazdarmaa"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/jagoanneon44"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="mailto:arvocloudserver@gmail.com"
            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
          <a href="#services" className="hover:text-blue-600 transition-colors">
            Layanan
          </a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">
            Hubungi Kami
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Status
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Privasi
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2025{" "}
          <span className="text-gray-800 font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
