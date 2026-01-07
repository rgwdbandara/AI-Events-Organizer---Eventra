import { useEffect, useState } from "react";
import api from "../api/api";
import TicketModal from "../components/TicketModal";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  /* ================= FETCH MY TICKETS ================= */
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/registrations/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTickets(res.data);
      } catch (error) {
        console.error("Failed to load tickets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1120] text-gray-400">
        Loading tickets...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-10">
      <h1 className="mb-6 text-3xl font-bold">My Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-gray-400">
          You haven’t registered for any events yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => {
            const event = ticket.event;

            // 🛡️ SAFETY CHECK
            if (!event) return null;

            return (
              <div
                key={ticket._id}
                className="overflow-hidden bg-[#111827] border border-white/10 rounded-xl"
              >
                {/* IMAGE */}
                <div className="h-40 bg-gray-700">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <span className="inline-block px-2 py-1 mb-2 text-xs text-purple-400 rounded bg-purple-400/10">
                    {event.category}
                  </span>

                  <h3 className="text-lg font-semibold">
                    {event.title}
                  </h3>

                  <div className="mt-2 space-y-1 text-sm text-gray-400">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                  </div>

                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="w-full py-2 mt-4 text-sm font-semibold text-black bg-white rounded hover:bg-gray-200"
                  >
                    Show Ticket
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= QR TICKET MODAL ================= */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
