import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, Clock, Globe, Sparkles } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// ================= BUTTON COMPONENT =================
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all will-change-transform will-change-opacity disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

// ================= HERO SECTION =================

const Hero: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => setShow(true), []);

  const fade = (delay: number) =>
    cn(
      "transition-all duration-500 will-change-transform will-change-opacity",
      `delay-${delay}`,
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    );

  return (
    <section
      id="home"
      className="
        relative flex items-center justify-center 
        bg-gradient-to-b from-white via-blue-50/30 to-white 
        dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950 
        overflow-hidden 
        pt-20 pb-8          
        sm:pt-32 sm:pb-16  
      "
    >
      {/* Blurred Background Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-10 flex flex-col items-center text-center max-w-6xl">

        {/* Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-semibold mb-4 sm:mb-6",
            fade(0)
          )}
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-blue-600 dark:text-blue-400">Server Premium Harga Terjangkau</span>
        </div>

        {/* Heading */}
        <h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance leading-tight mb-4 sm:mb-6 text-gray-900 dark:text-white",
            fade(100)
          )}
        >
          VPS & RDP{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Mulai 50rb
          </span>
          /Bulan
        </h1>

        {/* Subheading */}
        <p
          className={cn(
            "text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10",
            fade(200)
          )}
        >
          Server cepat, stabil, dan support 24/7.{" "}
          <br className="hidden sm:block" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Full garansi, akses full admin.
          </span>
        </p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-16"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Lihat Paket Harga
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://stats.uptimerobot.com/z9kCx5qEsD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-medium rounded-xl border-2 border-gray-300 bg-white hover:bg-blue-500/10 hover:border-blue-500 transition-all"
          >
            Cek Status Server
          </a>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2 sm:mt-4 max-w-2xl"
        >
          {[
            { icon: Zap, text: "99.8% Uptime" },
            { icon: Clock, text: "Support 24/7" },
            { icon: Globe, text: "Multi Region" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-full px-5 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/40 transition-all"
            >
              <item.icon className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
        
        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 sm:mt-16"
        >
          <p className="text-sm text-gray-500 mb-3 sm:mb-4">
            Dipercaya oleh 50+ pelanggan
          </p>

          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-semibold text-gray-900">4.9/5</span>
            <span className="text-sm text-gray-500 ml-1">(50+ reviews)</span>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
