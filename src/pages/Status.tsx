import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatusPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices([
      {
        name: "srv-01 DC Jakarta",
        status: "online",
        uptime: 99.8,
        latency: 12,
      },
      {
        name: "srv-02 DC Utah USA",
        status: "online",
        uptime: 99.9,
        latency: 45,
      },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "degraded":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden py-16 px-6">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">
          Status Layanan ARVOCLOUD
        </h1>

        <div className="space-y-6">
          {services.map((service) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`w-4 h-4 rounded-full ${getStatusColor(
                    service.status
                  )} animate-pulse`}
                ></span>
                <span className="text-lg font-semibold text-gray-800">
                  {service.name}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Uptime</span>
                  <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ width: `${service.uptime}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-700 text-sm mt-1">{service.uptime}%</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Latency</span>
                  <span className="text-gray-700 font-medium">{service.latency} ms</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatusPage;
