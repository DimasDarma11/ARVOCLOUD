import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Ban, Server, Info } from "lucide-react";

const Rules = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
    }),
  };

  const rules = [
    {
      icon: <Ban className="h-6 w-6 text-rose-500 mt-1" />,
      title: "Dilarang untuk Aktivitas Ilegal",
      text: "Termasuk penipuan, carding, phishing, penyebaran malware, dan aktivitas yang melanggar hukum internasional.",
    },
    {
      icon: <Server className="h-6 w-6 text-blue-500 mt-1" />,
      title: "Larangan DDoS, Spam, dan Abuse",
      text: "Segala bentuk serangan DDoS, spam, bot abuse, atau port scanning akan segera ditindak dengan suspend permanen tanpa refund.",
    },
    {
      icon: <Info className="h-6 w-6 text-amber-500 mt-1" />,
      title: "Tanggung Jawab Pengguna",
      text: "Setiap pengguna wajib menjaga keamanan dan privasi server masing-masing. ARVOCLOUD tidak bertanggung jawab atas kehilangan data akibat kelalaian pengguna.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-500 mt-1" />,
      title: "Kebijakan Suspend / Terminate",
      text: "Kami berhak menonaktifkan layanan tanpa pemberitahuan jika ditemukan aktivitas berisiko tinggi atau pelanggaran terhadap aturan pemakaian.",
    },
  ];

  return (
    <section className="min-h-screen bg-white py-24 px-6">
      <motion.div
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900 p-4 rounded-2xl shadow-lg"
            >
              <ShieldCheck className="h-10 w-10 text-cyan-400" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Aturan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Pemakaian
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Dengan menggunakan layanan <strong>ARVOCLOUD</strong>, Anda setuju
            untuk mematuhi seluruh ketentuan berikut demi menjaga keamanan dan
            kenyamanan bersama.
          </p>
        </motion.div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 space-y-8 shadow-sm">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-start space-x-4 hover:bg-white hover:shadow-md transition-all duration-300 rounded-xl p-4"
            >
              {rule.icon}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {rule.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{rule.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          <p>
            Dengan melanjutkan penggunaan layanan, Anda dianggap telah membaca
            dan menyetujui seluruh{" "}
            <strong className="text-gray-700">Aturan Pemakaian ARVOCLOUD</strong>.
          </p>
          <p className="mt-2">
            Terakhir diperbarui:{" "}
            <span className="font-medium text-gray-700">10 Oktober 2025</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Rules;
