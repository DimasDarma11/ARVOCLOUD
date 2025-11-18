import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground">
        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 <span className="text-foreground font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
          </p>
        </div>
    </footer>
  );
};

export default Footer;
