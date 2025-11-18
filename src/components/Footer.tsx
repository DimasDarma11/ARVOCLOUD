import React from "react";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground">
      <div className="container mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4">
              <img
                src="https://i.ibb.co/Xrzm1whv/Arvocloud.jpg"
                alt="ARVOCLOUD Logo"
                className="h-10 w-auto rounded-lg shadow-sm border border-border"
              />
            </div>
            <p className="text-sm max-w-md mx-auto md:mx-0 text-muted-foreground leading-relaxed">
              Solusi cloud cepat, aman, dan andal untuk bisnis modern serta kebutuhan server profesional Anda.
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Navigasi</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { label: "Layanan", href: "#services" },
                { label: "Hubungi Kami", href: "#contact" },
                { label: "Aturan", href: "#rules" },
                { label: "Tentang", href: "#about" },
              ].map(({ label, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="hover:text-foreground transition-colors font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="text-center md:text-right">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Ikuti Kami</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {[
                { icon: <Instagram className="h-5 w-5" />, link: "https://instagram.com/dimazdarmaa", label: "Instagram" },
                { icon: <Facebook className="h-5 w-5" />, link: "https://facebook.com/jagoanneon44", label: "Facebook" },
                { icon: <Mail className="h-5 w-5" />, link: "mailto:arvocloudserver@gmail.com", label: "Email" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="p-3 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 <span className="text-foreground font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
