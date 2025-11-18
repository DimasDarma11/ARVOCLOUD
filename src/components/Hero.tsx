import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Activity, ShieldCheck, Zap, Globe, MessageCircle } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import NoticeModal from "./NoticeModal";
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
    <>
      <NoticeModal />
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
        {/* Background subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Badge + User Counter (boleh pakai angka real atau “ribuan”) */}
          <div className="mb-8">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <span className="px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg animate-pulse text-lg">
                HARGA TERMURAH & STABIL
              </span>
              <span className="text-gray-700">
                Sudah melayani <span className="text-green-600 font-bold text-2xl">2.800+</span> pelanggan
              </span>
            </div>
          </div>

          {/* Headline Besar & Jujur */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            VPS & RDP Premium<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Mulai Rp50.000/Bulan
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Full Admin • SSD NVMe • Support cepat via WhatsApp • 
            <span className="font-bold text-green-600">Garansi full selama masa aktif</span>
          </p>

          {/* CTA WhatsApp Gede (ini yang bikin order banjir) */}
          <div className="flex justify-center mb-12">
            <a
              href="https://wa.me/6283197183724" 
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-4 px-12 py-7 text-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl hover:from-green-600 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              CHAT WHATSAPP SEKARANG
            </a>
          </div>

          {/* Trust Signals Jujur */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-lg">
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl text-green-600">✓</div>
              <span className="font-semibold">Garansi full selama masa aktif</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl text-green-600">✓</div>
              <span className="font-semibold">Support cepat & ramah 24 jam</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl text-green-600">✓</div>
              <span className="font-semibold">Proses order & setup < 30 menit</span>
            </div>
          </div>
            
          {/* Trust Signals + UptimeRobot Embed */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-lg mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl text-green-600">✓</div>
              <span className="font-semibold">Garansi full selama masa aktif</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl text-green-600">✓</div>
              <span className="font-semibold">Support cepat & ramah 24 jam</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl text-green-600">✓</div>
              <span className="font-semibold">Proses order & setup < 30 menit</span>
            </div>
          </div>

          {/* UptimeRobot Status Live */}
          <div className="text-center mb-12">
            <p className="text-xl font-bold mb-4 text-gray-700">Status Server Live</p>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <iframe 
                src="https://stats.uptimerobot.com/z9kCx5qEsD" 
                width="100%" 
                height="300" 
                frameBorder="0" 
                className="rounded-xl"
                title="UptimeRobot Status ARVOSERVER"
              />
              <p className="text-sm text-gray-500 mt-2">
                Monitor real-time: Uptime 98% | Response cepat
              </p>
              <a 
                href="https://stats.uptimerobot.com/z9kCx5qEsD" 
                target="_blank" 
                rel="noopener"
                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lihat Detail Status →
              </a>
            </div>
          </div>
        </section>
    </>
  );
};

export default Hero;
