import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../api/api";

export default function QrScanModal({ onClose, onScan }) {
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleScanSuccess = async (ticketId) => {
    try {
      await api.post(
        `/registrations/verify/${ticketId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setScanSuccess(true);

      // auto close after animation
      setTimeout(() => {
        setScanSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid ticket");
    }
  };

  useEffect(() => {
    if (scanSuccess) return; // Don't start scanner if success

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        handleScanSuccess(decodedText);
        scanner.clear();
      },
      (error) => {
        // silent scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-[#111827] p-6 rounded-xl w-full max-w-sm relative">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Scan QR Code
        </h2>

        <div
          id="qr-reader"
          className="overflow-hidden rounded"
        />

        <button
          onClick={onClose}
          className="w-full py-2 mt-4 text-sm text-gray-300 border rounded border-white/10"
        >
          Close
        </button>

        {scanSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl">
            <div className="p-8 text-center bg-[#111827] rounded-xl animate-scale-in">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-green-600 bg-green-100 rounded-full">
                ✓
              </div>
              <h2 className="text-xl font-bold text-green-400">
                Check-in Successful
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Attendee verified
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
