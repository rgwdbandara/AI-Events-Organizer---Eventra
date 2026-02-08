import { useEffect, useState } from "react";
import api from "../api/api";
import TicketModal from "../components/TicketModal";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/registrations/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to load tickets", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CANCEL TICKET ================= */
  const handleCancel = async (ticketId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this ticket?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/registrations/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTickets((prev) =>
        prev.filter((t) => t._id !== ticketId)
      );
    } catch (err) {
      alert("Failed to cancel ticket");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 bg-[#0b1120]">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 text-white bg-[#0b1120]">
      <h1 className="mb-6 text-3xl font-bold">My Tickets</h1>

      {tickets.length === 0 ? (
        <div className="mt-20 text-center text-gray-400">
          <p className="mb-4 text-lg">🎟 No tickets yet</p>
          <p>Explore events and book your seat!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets
            .filter((ticket) => ticket.event)
            .map((ticket) => {
              const event = ticket.event;
              const isCheckedIn = ticket.checkedIn;

              return (
                <div
                  key={ticket._id}
                  className="overflow-hidden bg-[#111827] border border-white/10 rounded-xl"
                >
                  {event?.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="object-cover w-full h-40"
                    />
                  )}

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                        {event?.title}
                      </h2>

                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          isCheckedIn
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {isCheckedIn ? "Checked In" : "Active"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400">
                      📅 {event?.date}
                    </p>
                    <p className="text-sm text-gray-400">
                      📍 {event?.location}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      👤 Event by{" "}
                      <span className="font-medium text-gray-300">
                        {event.organizer?.name || "Unknown"}
                      </span>
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Ticket ID: {ticket._id.slice(0, 8)}...
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="flex-1 py-2 font-semibold text-black bg-white rounded-lg hover:bg-gray-200"
                      >
                        Show Ticket
                      </button>

                      {!isCheckedIn && (
                        <button
                          onClick={() => handleCancel(ticket._id)}
                          className="px-3 py-2 text-sm text-red-400 border rounded-lg border-red-400/30 hover:bg-red-400/10"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* MODAL */}
      <TicketModal
        open={!!selectedTicket}
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
