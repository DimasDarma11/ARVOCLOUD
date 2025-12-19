import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShieldAlert, Ban, Server, Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RulesPage = () => {
  const navigate = useNavigate();

  const rules = [
    {
      icon: Ban,
      title: "Dilarang Menggunakan untuk Aktivitas Ilegal",
      text: "Termasuk namun tidak terbatas pada aktivitas seperti penipuan, carding, phishing, penyebaran malware, atau tindakan yang melanggar hukum negara mana pun.",
    },
    {
      icon: Server,
      title: "Larangan DDoS, Spam, dan Abuse",
      text: "Penggunaan server untuk serangan DDoS, pengiriman email massal (spam), bot abuse, atau scanning port tidak diperbolehkan dan akan langsung ditangguhkan tanpa refund.",
    },
    {
      icon: Info,
      title: "Tanggung Jawab Pengguna",
      text: "Pengguna bertanggung jawab penuh atas keamanan server masing-masing, termasuk data, aplikasi, dan akses login. ARVOCLOUD tidak bertanggung jawab atas kehilangan data akibat kelalaian pengguna.",
    },
    {
      icon: ShieldAlert,
      title: "Kebijakan Suspend / Terminate",
      text: "Kami berhak menonaktifkan layanan tanpa pemberitahuan terlebih dahulu jika terdeteksi adanya aktivitas berisiko tinggi atau pelanggaran berat terhadap aturan pemakaian ini.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      <Header />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-muted-foreground hover:text-primary transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-full bg-card shadow-md border border-border">
                <ShieldAlert className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Aturan Pemakaian
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dengan menggunakan layanan{" "}
              <strong className="text-foreground">ARVOCLOUD</strong>, Anda setuju
              mematuhi seluruh ketentuan berikut demi keamanan dan stabilitas
              layanan.
            </p>
          </div>

          {/* Rules */}
          <div className="bg-card rounded-3xl border border-border shadow-sm p-10 space-y-8">
            {rules.map((rule, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 border-b border-border pb-6 last:border-0 last:pb-0"
              >
                <rule.icon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-lg mb-2">{rule.title}</h3>
                  <p className="text-muted-foreground">{rule.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div className="text-center mt-16 text-sm text-muted-foreground">
            <p>
              Terakhir diperbarui:{" "}
              <span className="font-medium text-foreground">
                5 Oktober 2025
              </span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rules;
