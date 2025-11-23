import { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";

const NoticeModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  const handleViewPackages = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto relative">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Perhatian</h2>
                <p className="text-sm text-slate-600">Baca sebelum order</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              aria-label="Tutup popup"
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            
            {/* Question */}
            <div className="text-center py-3">
              <p className="text-slate-900 font-semibold text-lg">
                Mau pakai untuk Emulator, Game, atau Roblox?
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              
              {/* Recommended Option */}
              <div className="border-2 border-blue-500 bg-blue-50 rounded-xl p-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Pilih Baremetal
                    </h3>
                    <p className="text-sm text-slate-600">
                      Support penuh untuk emulator (BlueStacks, NoxPlayer, LDPlayer) dan game
                    </p>
                  </div>
                </div>
              </div>

              {/* Not Recommended Option */}
              <div className="border-2 border-slate-200 bg-slate-50 rounded-xl p-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Jangan Pilih VPS/RDP
                    </h3>
                    <p className="text-sm text-slate-600">
                      Tidak support emulator dan game. Hanya untuk bot dan aplikasi biasa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-slate-700 text-center">
                <span className="font-semibold">⚠️</span> Salah pilih paket tidak bisa refund atau ganti
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleViewPackages}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Lihat Paket
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-3 px-4 rounded-xl transition-colors"
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
