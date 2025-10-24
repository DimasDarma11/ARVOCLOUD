import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Activity, ShieldCheck } from "lucide-react";
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

// ============ STATS BAR COMPONENT ============
interface StatsBarProps {
  label: string;
  value: number;
  color?: string;
}

const StatsBar: React.FC<StatsBarProps> = ({ label, value, color = "bg-primary" }) => (
  <div>
    <div className="flex justify-between text-sm text-muted-foreground mb-1">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value.toFixed(0)}%</span>
    </div>
    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
      <div
        className={`h-2 rounded-full transition-all duration-700 ease-out ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

// ============ HERO SECTION ============
const Hero: React.FC = () => {
  const [stats, setStats] = useState({ cpu: 25, mem: 50, net: 15 });
  const status = "online";

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        cpu: Math.min(100, Math.max(5, prev.cpu + Math.random() * 10 - 5)),
        mem: Math.min(100, Math.max(10, prev.mem + Math.random() * 8 - 4)),
        net: Math.min(100, Math.max(5, prev.net + Math.random() * 6 - 3)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NoticeModal />
      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden"
      >
        {/* Ambient decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center bg-accent/50 px-4 py-2 rounded-full text-sm font-medium text-accent-foreground">
              <Activity className="w-4 h-4 mr-2" />
              Infrastruktur Cloud Handal
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground">
              Solusi <span className="text-primary">VPS & RDP Premium</span> untuk bisnis anda.
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Performa tinggi, uptime 99.8%, dan support 24/7. Infrastruktur modern untuk bisnis, developer, dan kreator.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                asChild
                size="lg"
                className="text-lg h-14 px-8 rounded-xl group"
              >
                <a href="#pricing">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative bg-card border border-border rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    status === "online" ? "bg-emerald-500 animate-pulse" : "bg-destructive"
                  }`}
                />
                <span className="font-medium text-card-foreground">
                  {status === "online" ? "Server Aktif" : "Server Offline"}
                </span>
              </div>
              <ShieldCheck
                className={`w-5 h-5 ${
                  status === "online" ? "text-emerald-500" : "text-destructive"
                }`}
              />
            </div>

            <div className="space-y-5">
              <StatsBar label="CPU Load" value={stats.cpu} color="bg-emerald-500" />
              <StatsBar label="Memory Usage" value={stats.mem} color="bg-blue-500" />
              <StatsBar label="Network" value={stats.net} color="bg-indigo-500" />
            </div>

            <div className="grid grid-cols-3 text-center mt-8 border-t border-border pt-6">
              <div>
                <div className="text-2xl font-bold text-primary">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
