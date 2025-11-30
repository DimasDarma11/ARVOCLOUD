import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, ShieldCheck, Sparkles, Info, ArrowRight } from "lucide-react";

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface PlanSpec {
  [key: string]: string;
}

interface Plan {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  price: { bulanan: number; tahunan: number };
  desc: string;
  specs: PlanSpec;
  highlight?: string;
}

type Category = "idn" | "usa" | "sg" | "baremetal" | "proxy";

// ================= PRICING CARD COMPONENT =================
const PricingCard = React.memo(({ 
  plan, 
  billingCycle, 
  onOpenModal 
}: { 
  plan: Plan; 
  billingCycle: "bulanan" | "tahunan";
  onOpenModal: (plan: Plan) => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isPremium = plan.icon === Star;
  const isElite = plan.icon === Crown;
  const IconComponent = plan.icon;
  
  const handleClick = useCallback(() => {
    onOpenModal(plan);
  }, [plan, onOpenModal]);
  
  const topSpecs = useMemo(() => {
    const entries = Object.entries(plan.specs);
    return entries.slice(0, 5);
  }, [plan.specs]);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-3xl p-6 border-2 backdrop-blur-sm transition-all duration-300",
        isPremium || isElite
          ? "bg-white/90 dark:bg-gray-900/90 border-blue-500 shadow-xl shadow-blue-500/10"
          : "bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-800/50 shadow-lg",
        isHovered ? "transform -translate-y-2 shadow-2xl" : ""
      )}
    >
      {isPremium && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-white" />
          Terpopuler
        </div>
      )}
      
      {isElite && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-700 to-blue-600 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5 fill-white" />
          Premium
        </div>
      )}
      
      <div className="text-center mb-5 mt-2">
        <div className={cn(
          "w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform",
          isPremium || isElite ? "bg-gradient-to-br from-blue-500 to-blue-600" : "bg-blue-50 dark:bg-blue-950/50",
          isHovered ? "scale-110" : ""
        )}>
          <IconComponent className={cn(
            "w-7 h-7 transition-colors",
            isPremium || isElite ? "text-white" : "text-blue-600 dark:text-blue-400"
          )} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {plan.name}
        </h3>
      </div>
      
      <div className="text-center mb-6 py-4 border-y border-gray-100 dark:border-gray-800">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            {plan.price[billingCycle]?.toLocaleString("id-ID") || "-"}
          </span>
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
              {billingCycle === "bulanan" ? "/bulan" : "/tahun"}
            </span>
          </div>
        </div>
        {billingCycle === "tahunan" && plan.price.tahunan && (
          <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-2">
            Hemat Rp{((plan.price.bulanan * 12) - plan.price.tahunan).toLocaleString("id-ID")}
          </p>
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        {topSpecs.map(([k, v]) => (
          <div key={k} className="flex items-start gap-3 text-sm">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-white">{v}</span>
            </span>
          </div>
        ))}
        
        {Object.keys(plan.specs).length > 5 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mt-4 transition-colors"
          >
            <Info className="w-4 h-4" />
            {showDetails ? "Sembunyikan detail" : "Lihat detail lengkap"}
          </button>
        )}
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
            {Object.entries(plan.specs).slice(5).map(([k, v]) => (
              <div key={k} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>
                  <span className="capitalize font-medium text-gray-700 dark:text-gray-300">{k}:</span> {v}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={handleClick}
        className={cn(
          "group w-full py-4 rounded-xl font-bold transition-all text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2",
          isPremium || isElite
            ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        )}
      >
        Pesan Sekarang
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}, (prev, next) => {
  return prev.plan === next.plan && prev.billingCycle === next.billingCycle;
});

// ================= MAIN PRICING COMPONENT =================
const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"bulanan" | "tahunan">("bulanan");
  const [selectedCategory, setSelectedCategory] = useState<Category>("idn");

  const whatsappNumber = "6283197183724";

  const categories = useMemo(() => [
    { id: "idn" as Category, name: "Indonesia", icon: Server },
    { id: "usa" as Category, name: "USA", icon: Server },
    { id: "sg" as Category, name: "Singapore", icon: Server },
    { id: "baremetal" as Category, name: "Bare Metal", icon: Cpu },
    { id: "proxy" as Category, name: "Proxy", icon: ShieldCheck },
  ], []);

  const plans = useMemo(() => ({
    idn: [
      { name: "1 vCPU 1GB", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "15 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "1 IPv4" } },
      { name: "1 vCPU 2GB", icon: Zap, price: { bulanan: 75000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "1 IPv4" } },
      { name: "2 vCPU 4GB", icon: Zap, price: { bulanan: 95000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
      { name: "4 vCPU 8GB", icon: Star, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "40 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
      { name: "6 vCPU 16GB", icon: Star, price: { bulanan: 260000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "60GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
      { name: "8 vCPU 16GB", icon: Crown, price: { bulanan: 265000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "80 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
    ],
    usa: [
      { name: "2 vCPU 1GB", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "AMD EPYC 7551", storage: "50 GB SSD NVMe", network: "Port Speed 500 Mbps", IP: "1 IPv4" } },
      { name: "2 vCPU 3.5GB", icon: Zap, price: { bulanan: 100000, tahunan: null }, specs: { cpu: "AMD Ryzen 7 5700G", storage: "60 GB SSD NVMe", network: "Port Speed 500 Mbps", IP: "IP NAT" } },
      { name: "2 vCPU 4GB", icon: Zap, price: { bulanan: 95000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
      { name: "4 vCPU 6GB", icon: Zap, price: { bulanan: 135000, tahunan: null }, specs: { cpu: "Intel Xeon E5 Gold 6530", storage: "75 GB SSD NVMe", network: "Port Speed 10 Gbps", IP: "IP NAT" } },
      { name: "4 vCPU 7GB", icon: Star, price: { bulanan: 185000, tahunan: null }, specs: { cpu: "AMD Ryzen 7 5700G", storage: "120 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "1 IPv4" } },
      { name: "4 vCPU 8GB", icon: Crown, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "40 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
      { name: "6 vCPU 16GB", icon: Crown, price: { bulanan: 260000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "60 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
      { name: "8 vCPU 16GB", icon: Crown, price: { bulanan: 230000, tahunan: null }, specs: { cpu: "Intel / AMD EPYC Processor", storage: "160 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "1 IPv4" } },
      { name: "8 vCPU 16GB", icon: Crown, price: { bulanan: 275000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "80 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
    ],
    sg: [
      { name: "4 vCPU 6GB", icon: Zap, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "AMD EPYC", storage: "100 GB SSD NVMe", network: "Port Speed 10 Gbps", IP: "1 IPv4" } },
    ],
    baremetal: [
      { name: "Bare Metal ID 1", icon: Zap, price: { bulanan: 350000, tahunan: 3850000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "8 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 2", icon: Star, price: { bulanan: 400000, tahunan: 4400000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "16 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 3", icon: Crown, price: { bulanan: 450000, tahunan: 4950000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "24 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 4", icon: Crown, price: { bulanan: 550000, tahunan: 6050000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "32 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 5", icon: Star, price: { bulanan: 750000, tahunan: 8250000 }, specs: { cpu: "Intel Core i7 Gen 4", ram: "32 GB RAM", storage: "512 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal USA", icon: Star, price: { bulanan: 1500000, tahunan: 16500000 }, specs: { cpu: "AMD Ryzen 7 5700G", ram: "64 GB RAM", storage: "1 TB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
    ],
    proxy: [
      { name: "Proxy Rotating IP", icon: Zap, price: { bulanan: 45000, tahunan: 540000 }, specs: { Bandwidth: "1GB", Rotasi: "1-120 Menit" } },
      { name: "Proxy Residential Static", icon: ShieldCheck, price: { bulanan: 140000, tahunan: 1680000 }, specs: { Bandwidth: "Unlimited", Negara: "27+ Country" } },
    ],
  }), []);

  const currentPlans = useMemo(() => plans[selectedCategory] || [], [plans, selectedCategory]);

  const handleOpenModal = useCallback((plan: Plan) => {
    let message = "";
    const categoryName = { 
      idn: "VPS/RDP Indonesia", 
      usa: "VPS/RDP USA", 
      sg: "VPS/RDP Singapore",
      baremetal: "Bare Metal", 
      proxy: "Proxy" 
    }[selectedCategory];
    
    const price = billingCycle === "bulanan" ? plan.price.bulanan : plan.price.tahunan;
    const priceText = billingCycle === "bulanan" ? "per bulan" : "per tahun";
    
    message = `Halo, saya ingin memesan *${categoryName}* dengan detail:\n\n`;
    message += `📦 *Paket: ${plan.name}*\n`;
    message += `💰 *Harga: Rp${price?.toLocaleString("id-ID")} ${priceText}*\n\n`;
    message += `*Spesifikasi:*\n`;
    
    Object.entries(plan.specs).forEach(([key, value]) => {
      message += `• ${key}: ${value}\n`;
    });
    
    message += `\nApakah paket ini tersedia?`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }, [selectedCategory, billingCycle, whatsappNumber]);

  return (
    <>
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
      `}</style>

      <section id="pricing" className="relative bg-gradient-to-br from-gray-50 via-gray-50/50 to-gray-100/30 dark:from-gray-950 dark:via-gray-950/20 dark:to-gray-900/10 py-24 overflow-hidden">
        
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">Paket Harga Terbaik</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4">
              Pilih Paket{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Terbaik
              </span>
              {" "}Anda
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Harga transparan, tanpa biaya tersembunyi. Semua paket sudah termasuk dukungan 24/7.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((c) => {
              const IconComp = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all font-semibold backdrop-blur-sm",
                    selectedCategory === c.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-blue-500/50 hover:shadow-md"
                  )}
                >
                  <IconComp className="w-5 h-5" />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16 gap-4">
            <span className={cn(
              "text-base font-semibold transition-colors",
              billingCycle === "bulanan" ? "text-gray-900 dark:text-white" : "text-gray-500"
            )}>
              Bulanan
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")}
              aria-label={`Ubah ke mode pembayaran ${billingCycle === "bulanan" ? "tahunan" : "bulanan"}`}
              className={cn(
                "relative w-16 h-8 rounded-full p-1 transition-all shadow-inner",
                billingCycle === "tahunan" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
              )}
            >
              <span className="sr-only">
                {billingCycle === "bulanan" ? "Pilih pembayaran tahunan" : "Pilih pembayaran bulanan"}
              </span>
              <div
                className={cn(
                  "w-6 h-6 rounded-full bg-white shadow-lg transition-transform",
                  billingCycle === "tahunan" ? "translate-x-8" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn(
              "text-base font-semibold transition-colors",
              billingCycle === "tahunan" ? "text-gray-900 dark:text-white" : "text-gray-500"
            )}>
              Tahunan
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-bold">
                Hemat 10%
              </span>
            </span>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPlans.map((plan, i) => (
              <PricingCard 
                key={`${plan.name}-${i}`} 
                plan={plan} 
                billingCycle={billingCycle}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
