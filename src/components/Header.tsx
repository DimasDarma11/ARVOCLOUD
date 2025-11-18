import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

interface MenuItem {
  name: string;
  href?: string;
  route?: string;
  action?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Rules", route: "/rules" },
  ];

  const handleMenuClick = (item: MenuItem) => {
    setIsMenuOpen(false);
    if (item.action) item.action();
    else if (item.href) document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    else if (item.route) navigate(item.route);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-200 ${ isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent" }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer select-none group">
          <img src="https://i.ibb.co/VYh29p8y/Arvocloud1.webp" alt="Arvocloud Logo" className="h-10 md:h-12 w-auto transition-transform duration-200 group-hover:scale-105" loading="eager" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => handleMenuClick(item)} 
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
            > 
              {item.name} 
            </button>
          ))}
        </nav>

        {/* Login + Hamburger */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/loginpage" 
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-card text-card-foreground border border-border hover:border-primary/50 transition-all duration-200" 
          > 
            Login 
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 hover:bg-accent/50 rounded-lg transition-colors duration-200" aria-label="Toggle menu"
          > 
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />} 
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex flex-col py-5 px-6 space-y-4">
            {menuItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleMenuClick(item)} 
                className="flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors duration-200"
              >
                <span className="text-foreground font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
