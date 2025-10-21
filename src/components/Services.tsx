import React from "react";
import { Server, Monitor, Cpu, Settings } from "lucide-react";

const Services: React.FC = () => {
  const services = [
    {
      icon: Server,
      title: "Server VPS",
      desc: "Server virtual cepat dan stabil dengan akses penuh root — cocok untuk bisnis dan developer.",
    },
    {
      icon: Monitor,
      title: "Server RDP",
      desc: "Akses desktop Windows jarak jauh dengan performa tinggi dan koneksi stabil untuk kerja profesional.",
    },
    {
      icon: Cpu,
      title: "Bare Metal",
      desc: "Server fisik dedicated untuk performa maksimal dan kendali penuh atas hardware.",
    },
    {
      icon: Settings,
      title: "Custom Spesifikasi",
      desc: "Kustomisasi konfigurasi server sesuai kebutuhan proyek Anda, fleksibel dan efisien.",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden bg-background"
    >
      {/* Ambient decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-32 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Layanan Kami
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-20">
          Infrastruktur yang stabil, efisien, dan bisa diandalkan.
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="group relative p-6 md:p-8 rounded-3xl bg-card border border-border 
              hover:border-primary/50 transition-all duration-200"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl 
              bg-accent/50 group-hover:scale-105 transition-transform duration-200">
                <Icon className="h-8 w-8 text-accent-foreground" />
              </div>

              <h3 className="text-lg font-semibold text-card-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
