import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, Clock, Globe, Sparkles } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// ============ BUTTON COMPONENT ============
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

// ============ HERO SECTION ============
const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-[92vh] bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-14 md:py-20 flex flex-col items-center justify-center text-center max-w-6xl">
        <div
          className={`inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-blue-600 dark:text-blue-400">
            Server Premium Harga Terjangkau
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 transition-all duration-500 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-gray-900 dark:text-white">VPS & RDP </span>
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Mulai 50rb
          </span>
          <span className="text-gray-900 dark:text-white">/Bulan</span>
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10 transition-all duration-500 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Server cepat, stabil, dan support 24/7. <br className="hidden sm:block" />
          <span className="font-semibold text-gray-900 dark:text-white">Full garansi, akses full admin.</span>
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-500 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button
            asChild
            size="lg"
            className="group text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <a href="#pricing">
              Lihat Paket Harga
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-xl font-bold border-2 border-gray-300 dark:border-gray-700 hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-200"
          >
            <a href="https://stats.uptimerobot.com/z9kCx5qEsD" target="_blank" rel="noopener noreferrer">
              Cek Status Server
            </a>
          </Button>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl transition-all duration-500 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/40 transition-all">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">99.8% Uptime</span>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/40 transition-all">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Support 24/7</span>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/40 transition-all">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Multi Region</span>
          </div>
        </div>

        <div
          className={`mt-12 sm:mt-16 transition-all duration-500 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Dipercaya oleh 50+ pelanggan</p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">4.9/5</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(50+ reviews)</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
