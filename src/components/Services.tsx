import React, { useState, useEffect, useRef } from "react";
import { Server, Monitor, Cpu, Settings } from "lucide-react";

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  const services = [
    {
      icon: Server,
      title: "Server VPS",
      desc: "Server virtual cepat dan stabil dengan akses penuh root — cocok untuk bisnis dan developer.",
      gradient: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      iconBg: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Monitor,
      title: "Server RDP",
      desc: "Akses desktop Windows jarak jauh dengan performa tinggi dan koneksi stabil untuk kerja profesional.",
      gradient: "from-blue-400/20 to-blue-500/5",
      borderColor: "border-blue-400/20 hover:border-blue-400/40",
      iconBg: "from-blue-400/20 to-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: Cpu,
      title: "Bare Metal",
      desc: "Server fisik dedicated untuk performa maksimal dan kendali penuh atas hardware.",
      gradient: "from-blue-600/20 to-blue-700/5",
      borderColor: "border-blue-600/20 hover:border-blue-600/40",
      iconBg: "from-blue-600/20 to-blue-700/10",
      iconColor: "text-blue-600",
    },
    {
      icon: Settings,
      title: "Custom Spesifikasi",
      desc: "Kustomisasi konfigurasi server sesuai kebutuhan proyek Anda, fleksibel dan efisien.",
      gradient: "from-blue-500/20 to-blue-400/5",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      iconBg: "from-blue-500/20 to-blue-400/10",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-background via-background to-blue-950/5"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-full">
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[450px] max-w-[90%] h-[450px] bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[450px] max-w-[90%] h-[450px] bg-gradient-to-br from-blue-400/10 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative container mx-auto px-6 text-center overflow-x-hidden">
        <div
          className={`transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-blue-400/10 backdrop-blur-sm border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium text-foreground mb-6">
            <Server className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500 font-semibold">Layanan Kami</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
            Solusi{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
              Infrastruktur Cloud
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
            Infrastruktur yang stabil, efisien, dan bisa diandalkan untuk berbagai kebutuhan bisnis Anda.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
          {services.map(
            ({ icon: Icon, title, desc, gradient, borderColor, iconBg, iconColor }, i) => (
              <div
                key={i}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border ${borderColor} hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                />

                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${iconBg} transition-all duration-200`}
                  >
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
