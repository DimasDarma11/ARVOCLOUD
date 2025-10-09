import React from "react";
import { Cloud, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <img
                  src="https://ibb.co.com/hJKpbqPt"
                  alt="ARVOCLOUD Logo"
                  className="h-10 w-auto rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-shadow duration-300"
                />
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Solusi infrastruktur cloud cepat, aman, dan andal untuk bisnis modern,
              pengembang profesional, serta kebutuhan server masa kini.
            </p>

            <div className="flex space-x-4 mt-5">
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
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-white font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white">VPS Hosting</a></li>
              <li><a href="#services" className="hover:text-white">RDP Server</a></li>
              <li><a href="#services" className="hover:text-white">Bare Metal</a></li>
              <li><a href="#services" className="hover:text-white">Solusi Kustom</a></li>
            </ul>
          </div>

          {/* Dukungan */}
          <div>
            <h3 className="text-white font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="hover:text-white">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white">Status Sistem</a></li>
              <li><a href="#contact" className="hover:text-white">Pusat Bantuan</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>arvocloudserver@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>+62 831-9718-3724</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>Global Data Center</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-center md:text-left">
            © 2025 <span className="text-white font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
          </p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-white">Privasi</a>
            <a href="#" className="hover:text-white">Syarat</a>
            <a href="#" className="hover:text-white">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
