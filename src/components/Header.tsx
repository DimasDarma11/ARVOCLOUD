import { useState, useEffect } from "react";
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

const Header = ({ onAboutClick, onContactClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Rules", route: "/rules" },
  ];

  const handleMenuClick = (item: MenuItem) => {
    setIsMenuOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    } else if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <img
              src="https://i.ibb.co/VYh29p8y/Arvocloud1.webp"
              alt="ArvoCloud"
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item)}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/loginpage"
              className="px-4 md:px-6 py-2 md:py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 shadow-sm"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item)}
                  className="text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
