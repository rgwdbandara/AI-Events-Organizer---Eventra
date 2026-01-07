import QRCode from "react-qr-code";

export default function TicketModal({ ticket, onClose }) {
  const event = ticket.event;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-md p-6 bg-[#111827] rounded-xl text-white">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute text-xl text-gray-400 top-3 right-4 hover:text-white"
        >
          ×
        </button>

        {/* HEADER */}
        <h2 className="mb-1 text-xl font-bold text-center">
          Your Ticket
        </h2>

        <p className="text-sm text-center text-gray-400">
          {event.title}
        </p>

        {/* QR */}
        <div className="flex justify-center p-4 mt-5 bg-white rounded-lg">
          <QRCode
            value={ticket._id}
            size={200}
          />
        </div>

        {/* TICKET ID */}
        <p className="mt-4 text-xs text-center text-gray-400">
          Ticket ID
        </p>
        <p className="font-mono text-sm text-center">
          EVT-{ticket._id.slice(-10).toUpperCase()}
        </p>

        {/* DETAILS */}
        <div className="p-4 mt-4 space-y-2 text-sm text-gray-300 bg-[#0b1120] rounded-lg">
          <p>📅 {event.date}</p>
          <p>⏰ {event.time}</p>
          <p>📍 {event.location}</p>
        </div>
      </div>
    </div>
  );
}
