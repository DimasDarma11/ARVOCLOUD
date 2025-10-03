import React, { useState, useEffect } from "react";

export default function LoginPage() {
  const [timeLeft, setTimeLeft] = useState(60 * 60 * 24); // 24 jam countdown
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = () => {
    alert(`Terima kasih! Email ${email} akan mendapat notifikasi 🚀`);
    setEmail("");
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
      
      {/* Animasi Glow Background */}
      <div className="absolute w-80 h-80 bg-white/10 rounded-full top-20 left-10 animate-ping blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-white/5 rounded-full bottom-20 right-20 animate-bounce blur-3xl"></div>

      {/* Card Utama */}
      <div className="z-10 text-center bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-white/20 max-w-md">
        <h1 className="text-4xl font-extrabold drop-shadow-lg">🚧 Coming Soon 🚧</h1>
        <p className="mt-4 text-lg opacity-80">Login Page sedang dipersiapkan</p>

        {/* Countdown */}
        <div className="mt-6 text-2xl font-mono">
          {hours}h : {minutes}m : {seconds}s
        </div>

        {/* Form Notify */}
        <div className="mt-6 flex">
          <input
            type="email"
            value={email}
            placeholder="Masukkan email kamu"
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 rounded-l-md text-black"
          />
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-r-md hover:bg-yellow-500"
          >
            Notify Me
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-5 text-sm opacity-70">© 2025 ARVOCLOUD</p>
    </div>
  );
}
