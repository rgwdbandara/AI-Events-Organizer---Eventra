import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";

export default function TicketModal({ open, onClose, ticket }) {
  // ✅ HARD GUARD (IMPORTANT)
  if (!open || !ticket || !ticket.event) return null;

  const event = ticket.event;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Card */}
        <motion.div
          className="relative w-full max-w-md p-6 bg-[#111827] text-white rounded-xl shadow-2xl border border-white/10"
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute text-xl text-gray-400 top-3 right-4 hover:text-white"
          >
            ×
          </button>

          {/* Header */}
          <h2 className="mb-2 text-xl font-bold text-center">
            🎟 Your Ticket
          </h2>

          <p className="mb-4 text-sm text-center text-gray-400">
            Show this ticket at the entrance
          </p>

          {/* Ticket Content */}
          <div className="p-4 mb-4 bg-[#0b1120] rounded-lg border border-white/10">
            <p className="font-semibold">
              {event.title}
            </p>
            <p className="text-sm text-gray-400">
              📅 {event.date}
            </p>
            <p className="text-sm text-gray-400">
              ⏰ {event.time}
            </p>
            <p className="text-sm text-gray-400">
              📍 {event.location}
            </p>
          </div>

          {/* QR */}
          <div className="flex justify-center p-4 mb-4 bg-white rounded-lg">
            <QRCode
              value={ticket._id}
              size={200}
            />
          </div>

          {/* TICKET ID */}
          <p className="mt-4 text-xs text-center text-gray-400">
            Ticket ID
          </p>
          <p className="font-mono text-sm text-center text-gray-300">
            EVT-{ticket._id.slice(-10).toUpperCase()}
          </p>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full py-2 text-sm font-semibold text-black bg-white rounded"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
