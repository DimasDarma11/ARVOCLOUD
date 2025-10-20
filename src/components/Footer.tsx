import React from "react";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200 text-gray-600">
      <div className="container mx-auto px-6 py-12 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="https://i.ibb.co/Xrzm1whv/Arvocloud.jpg"
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
          {[
            { icon: <Instagram className="h-5 w-5" />, link: "https://instagram.com/dimazdarmaa" },
            { icon: <Facebook className="h-5 w-5" />, link: "https://facebook.com/jagoanneon44" },
            { icon: <Mail className="h-5 w-5" />, link: "mailto:arvocloudserver@gmail.com" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target={item.link.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 shadow-sm"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
          {["#services", "#contact", "#", "#"].map((href, idx) => (
            <a
              key={idx}
              href={href}
              className="hover:text-gray-900 transition-colors font-medium"
            >
              {["Layanan", "Hubungi Kami", "Status", "Privasi"][idx]}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2025 <span className="text-gray-800 font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
