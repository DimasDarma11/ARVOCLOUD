import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Activity, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

interface StatsBarProps {
  label: string;
  value: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-sm text-muted-foreground mb-1">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value.toFixed(0)}%</span>
    </div>
    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-2 rounded-full bg-primary transition-all duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

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
            Solusi{" "}
            <span className="text-primary">
              VPS & RDP Premium
            </span>{" "}
            untuk bisnis anda.
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

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg h-14 px-8 rounded-xl group"
            >
              <a
                href="https://wa.me/6283197183724?text=Halo,%20saya%20mau%20trial%20VPS/RDP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Trial
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
                  status === "online" ? "bg-emerald animate-pulse" : "bg-destructive"
                }`}
              />
              <span className="font-medium text-card-foreground">
                {status === "online" ? "Server Aktif" : "Server Offline"}
              </span>
            </div>
            <ShieldCheck
              className={`w-5 h-5 ${
                status === "online" ? "text-emerald" : "text-destructive"
              }`}
            />
          </div>

          <div className="space-y-5">
            <StatsBar label="CPU Load" value={stats.cpu} color="bg-emerald" />
            <StatsBar label="Memory Usage" value={stats.mem} color="bg-blue" />
            <StatsBar label="Network" value={stats.net} color="bg-indigo" />
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
  );
};

export default Hero;
