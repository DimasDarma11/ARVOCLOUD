import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Ban, Server, Info } from "lucide-react";

const Rules = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6">
      <motion.div
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg"
            >
              <ShieldAlert className="h-10 w-10 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aturan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pemakaian
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dengan menggunakan layanan <strong>ARVOCLOUD</strong>, Anda
            setuju untuk mematuhi seluruh ketentuan berikut demi menjaga
            keamanan dan stabilitas layanan bersama.
          </p>
        </motion.div>

        {/* Rules List */}
        <div className="bg-white shadow-xl rounded-2xl p-10 space-y-8">
          {[
            {
              icon: <Ban className="h-6 w-6 text-red-500 mt-1" />,
              title: "Dilarang Menggunakan untuk Aktivitas Ilegal",
              text: "Termasuk namun tidak terbatas pada aktivitas seperti penipuan, carding, phishing, penyebaran malware, atau tindakan yang melanggar hukum negara mana pun.",
            },
            {
              icon: <Server className="h-6 w-6 text-blue-500 mt-1" />,
              title: "Larangan DDoS, Spam, dan Abuse",
              text: "Penggunaan server untuk serangan DDoS, pengiriman email massal (spam), bot abuse, atau scanning port tidak diperbolehkan dan akan langsung ditangguhkan tanpa refund.",
            },
            {
              icon: <Info className="h-6 w-6 text-purple-500 mt-1" />,
              title: "Tanggung Jawab Pengguna",
              text: "Pengguna bertanggung jawab penuh atas keamanan server masing-masing, termasuk data, aplikasi, dan akses login. ARVOCLOUD tidak bertanggung jawab atas kehilangan data akibat kelalaian pengguna.",
            },
            {
              icon: <ShieldAlert className="h-6 w-6 text-green-600 mt-1" />,
              title: "Kebijakan Suspend / Terminate",
              text: "Kami berhak menonaktifkan layanan tanpa pemberitahuan terlebih dahulu jika terdeteksi adanya aktivitas berisiko tinggi atau pelanggaran berat terhadap aturan pemakaian ini.",
            },
          ].map((rule, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-start space-x-4 hover:scale-[1.01] transition-transform duration-300"
            >
              {rule.icon}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {rule.title}
                </h3>
                <p className="text-gray-600">{rule.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          className="text-center mt-12 text-gray-600 text-sm"
        >
          <p>
            Dengan melanjutkan penggunaan layanan, Anda dianggap telah membaca
            dan menyetujui seluruh{" "}
            <strong>Aturan Pemakaian ARVOCLOUD</strong>.
          </p>
          <p className="mt-2">
            Terakhir diperbarui:{" "}
            <span className="font-medium text-gray-800">5 Oktober 2025</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Rules;
