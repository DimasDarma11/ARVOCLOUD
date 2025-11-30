import React, { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

// ================= GRID BACKGROUND COMPONENT =================
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
        style={{ animation: "pulse-slow 8s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/3 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse"
        style={{ animation: "pulse-slow 10s ease-in-out infinite 1s" }}
      />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(128 128 128 / 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(128 128 128 / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const testimonials = [
    {
      name: "Budi Santoso",
      avatar: "BS",
      rating: 5,
      text: "Server VPS sangat cepat dan stabil! Tim support responsif 24/7. Sudah 1 tahun pakai tidak pernah kecewa.",
      accentColor: "blue",
    },
    {
      name: "Lek Kim",
      avatar: "LK",
      rating: 5,
      text: "RDP server stabil buat live streaming Youtube!",
      accentColor: "blue",
    },
    {
      name: "Ahmad Rizki",
      avatar: "AR",
      rating: 5,
      text: "Bare Metal server powerful untuk clone emulator",
      accentColor: "blue",
    },
    {
      name: "Diana Putri",
      avatar: "DP",
      rating: 5,
      text: "Server super stabil untuk toko online saya! Saat flash sale traffic tinggi pun tetap lancar.",
      accentColor: "blue",
    },
    {
      name: "Mythical",
      avatar: "M",
      rating: 5,
      text: "RDP USA lancar dan stabil untuk pemakaian bot 24jam plus bisa diperpanjang lagi tiap bulannya.",
      accentColor: "blue",
    },
    {
      name: "Rina Wulandari",
      avatar: "RW",
      rating: 5,
      text: "Baremetal Intel Core I3 joss buat main roblox.",
      accentColor: "blue",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.25; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <section
        id="services"
        ref={sectionRef}
        className="relative bg-gradient-to-br from-gray-50 via-blue-50/50 to-blue-100/30 dark:from-gray-950 dark:via-blue-950/20 dark:to-blue-900/10 py-24 overflow-hidden"
      >
        <GridBackground />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">Testimoni Pelanggan</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
              Apa Kata{" "}
              <span className="bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text text-transparent">
                Mereka?
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Puluhan pelanggan puas dengan layanan kami. Lihat pengalaman mereka!
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-6 rounded-3xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-2 border-gray-200/50 dark:border-gray-800/50 hover:border-blue-500/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${hoveredCard === i ? "-translate-y-2" : ""}`}
                style={{ 
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {/* Decorative Quote Icon */}
                <div className={`absolute top-6 right-6 transition-all duration-300 ${
                  hoveredCard === i ? "opacity-20 scale-110" : "opacity-10"
                }`}>
                  <Quote className="w-16 h-16 text-blue-500" />
                </div>

                <div className="relative">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 mb-5">
                    <div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-700 flex items-center justify-center shadow-lg transition-transform duration-300 ${
                        hoveredCard === i ? "scale-110 rotate-3" : ""
                      }`}
                    >
                      <span className="text-lg font-bold text-white">
                        {testimonial.avatar}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {testimonial.name}
                      </h3>
                      
                      {/* Stars */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <Star 
                            key={starIndex} 
                            className={`w-4 h-4 text-yellow-400 fill-yellow-400 transition-all duration-300`}
                            style={{
                              transitionDelay: hoveredCard === i ? `${starIndex * 50}ms` : "0ms"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="relative">
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="text-blue-600 dark:text-blue-400 text-2xl font-serif leading-none mr-1">"</span>
                      {testimonial.text}
                      <span className="text-blue-600 dark:text-blue-400 text-2xl font-serif leading-none ml-1">"</span>
                    </p>
                  </div>

                  {/* Verified Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-4 h-4 rounded-full bg-blue-700/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-700" />
                      </div>
                      <span className="font-medium">Verified Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={`text-center mt-16 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex flex-col items-center gap-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 rounded-2xl px-8 py-6 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-700 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900 shadow-md"
                    >
                      {t.avatar}
                    </div>
                  ))}
                </div>
                <div className="text-left ml-2">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    50+ Pelanggan Puas
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                Bergabung dengan pelanggan kami yang puas dan rasakan layanan terbaik!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
      </section>
    </>
  );
};

export default Services;
