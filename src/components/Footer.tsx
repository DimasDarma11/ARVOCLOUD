import React from "react";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-6 py-10 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://i.ibb.co.com/Xrzm1whv/Arvocloud.jpg"
            alt="ARVOCLOUD Logo"
            className="h-10 w-auto rounded-lg shadow-lg shadow-blue-500/20"
          />
        </div>

        {/* Short description */}
        <p className="text-sm max-w-md mx-auto mb-6">
          Solusi cloud cepat, aman, dan andal untuk bisnis modern dan kebutuhan server profesional.
        </p>

        {/* Social icons */}
        <div className="flex justify-center space-x-5 mb-6">
          <a
            href="https://instagram.com/dimazdarmaa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/jagoanneon44"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="mailto:arvocloudserver@gmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
          <a href="#services" className="hover:text-white">Layanan</a>
          <a href="#contact" className="hover:text-white">Hubungi Kami</a>
          <a href="#" className="hover:text-white">Status</a>
          <a href="#" className="hover:text-white">Privasi</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2025 <span className="text-white font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
