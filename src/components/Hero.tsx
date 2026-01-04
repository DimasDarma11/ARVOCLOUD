import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, Clock, Globe, Sparkles, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ================= FLOATING CARD =================
const navigate = useNavigate();
const FloatingCard = ({ delay = 0, children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-xl transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${isHovered ? '-translate-y-2 shadow-2xl' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// ================= HERO SECTION =================
const Hero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-shift 3s linear infinite;
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-50/50 to-gray-100/30 dark:from-gray-950 dark:via-gray-950/20 dark:to-gray-900/10"
      >

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="text-center mb-16">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 mb-8 transition-all duration-500 ${
                  show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              >
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    Layanan Aktif 24/7
                  </span>
                </div>
              </div>

              {/* Main Heading with Gradient */}
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight transition-all duration-600 ${
                  show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <span className="block text-gray-900 dark:text-white mb-2">
                  VPS & RDP
                </span>
                <span className="block bg-gradient-to-r from-blue-700 via-blue-700 to-blue-700 bg-clip-text text-transparent animate-gradient">
                  Mulai 50rb
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-gray-600 dark:text-gray-600 mt-2">
                  per Bulan
                </span>
              </h1>

              {/* Subheading */}
              <p
                className={`text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 transition-all duration-600 ${
                  show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                Lupakan server lemot yang bikin frustrasi. Dapatkan{" "}
                <span className="font-semibold text-blue-700">Performa maksimal</span> dengan{" "}
                <span className="font-semibold text-blue-700">Stabilitas 99.8%</span> dan{" "}
                <span className="font-semibold text-blue-700">Support 24/7</span>.
              </p>

              {/* CTA Buttons */}
              <div
                onClick={() => navigate("/pricing")}
                className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-600 ${
                  show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <button
                  className="group relative inline-flex items-center justify-center gap-2 h-16 px-10 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-blue-600 text-white overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all"
                >
                  <span className="relative z-10">Lihat Paket Harga</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="https://stats.uptimerobot.com/z9kCx5qEsD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 h-16 px-10 text-lg font-bold rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-gray-900 transition-all shadow-lg text-gray-900 dark:text-white"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Cek Status Server</span>
                  <TrendingUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              {[
                {
                  icon: Zap,
                  title: "99.8% Uptime",
                  desc: "Server always online",
                  gradient: "from-blue-700 to-blue-700",
                  delay: 0.4,
                },
                {
                  icon: Shield,
                  title: "Support 24/7",
                  desc: "Bantuan kapan saja",
                  gradient: "from-blue-700 to-blue-700",
                  delay: 0.5,
                },
                {
                  icon: Globe,
                  title: "Multi Region",
                  desc: "Server di berbagai lokasi",
                  gradient: "from-blue-700 to-blue-700",
                  delay: 0.6,
                },
              ].map((feature, i) => (
                <FloatingCard key={i} delay={feature.delay} className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </FloatingCard>
              ))}
            </div>

            {/* Social Proof */}
            <div
              className={`text-center transition-all duration-600 ${
                show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div className="inline-flex flex-col items-center gap-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 rounded-2xl px-8 py-6 shadow-xl">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dipercaya oleh 50+ pelanggan
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-lg transition-all duration-300`}
                        style={{
                          opacity: show ? 1 : 0,
                          transform: show ? 'scale(1)' : 'scale(0)',
                          transitionDelay: `${800 + i * 100}ms`
                        }}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">4.9</span>
                    <div className="text-left">
                      <div className="text-xs text-gray-500 dark:text-gray-400">dari 5.0</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">50+ reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
