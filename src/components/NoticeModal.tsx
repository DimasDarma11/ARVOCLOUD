import React, { useState, useEffect, useCallback } from "react";
import { AlertCircle, X, CheckCircle, XCircle } from "lucide-react";

const NoticeModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleViewPackages = useCallback(() => {
    handleClose();
    // Smooth scroll ke pricing section
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }, [handleClose]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop - optimized for performance */}
      <div
        className="fixed inset-0 bg-black/70 z-[9998]"
        onClick={handleClose}
      />

      {/* Modal container - improved mobile responsiveness */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none overflow-x-hidden">
        <div 
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-lg pointer-events-auto relative overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-blue-700 via-blue-700 to-blue-700 p-4 sm:p-6 text-white border-b border-white/10">
            <button
              onClick={handleClose}
              className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-inner">
                <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Penting!</h2>
                <p className="text-white/90 text-xs sm:text-sm font-medium">
                   Harap Dibaca Sebelum Melakukan Order
                </p>
               </div>
            </div>
          </div>

          {/* Content - optimized for mobile */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Main Message */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-3 sm:p-4">
              <p className="text-gray-900 dark:text-white font-semibold text-center text-sm sm:text-base leading-relaxed">
                Mau pakai untuk <span className="text-orange-600 dark:text-orange-400">Emulator</span>, <span className="text-orange-600 dark:text-orange-400">Game</span>, atau <span className="text-orange-600 dark:text-orange-400">Roblox</span>?
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 gap-3">
              {/* DO - Baremetal */}
              <div className="border-2 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-700 dark:text-green-400 text-base sm:text-lg mb-1">
                      GUNAKAN BAREMETAL
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Khusus untuk emulator & game!</span><br/>
                      Full support: BlueStacks, NoxPlayer, LDPlayer, Roblox, dll.
                    </p>
                  </div>
                </div>
              </div>

              {/* DON'T - VPS & RDP */}
              <div className="border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-700 dark:text-red-400 text-base sm:text-lg mb-1">
                      JANGAN GUNAKAN VPS/RDP
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">TIDAK support emulator & game!</span><br/>
                      VPS & RDP hanya untuk web hosting, bot, aplikasi biasa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Note */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2 sm:p-3">
              <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
                <span className="font-semibold">⚠️ Catatan:</span> Jika salah pilih paket, tidak bisa refund atau ganti paket!
              </p>
            </div>

            {/* Action Buttons - removed scale effects for better INP */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleViewPackages}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                📦 Lihat Semua Paket
              </button>
              <button
                onClick={handleClose}
                className="flex-1 sm:flex-none bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl transition-all"
              >
                Saya Paham
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeModal;
