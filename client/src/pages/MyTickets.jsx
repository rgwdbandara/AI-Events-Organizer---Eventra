import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";



const API_URL = "http://localhost:5000/api/registrations";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCancel = async (ticketId) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/registrations/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets((prev) => prev.filter((ticket) => ticket._id !== ticketId));
      alert("Ticket cancelled successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel ticket");
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/my-tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 bg-gray-900">
        Loading your tickets...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-6 text-4xl font-bold">My Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-gray-400">
          You haven’t registered for any events yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-5 bg-gray-800 rounded-lg shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold text-green-400">
                {ticket.event.title}
              </h2>

              <div className="mb-3 space-y-1 text-sm text-gray-300">
                <p>📅 {ticket.event.date}</p>
                <p>⏰ {ticket.event.time}</p>
                <p>📍 {ticket.event.location}</p>
              </div>

              {/* 🎟 QR CODE */}
              <div className="flex justify-center p-2 my-4 bg-white rounded">
                <QRCodeSVG
                  value={JSON.stringify({
                    ticketId: ticket._id,
                    eventId: ticket.event._id,
                  })}
                  size={150}
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to={`/events/${ticket.event._id}`}
                  className="text-sm text-blue-400 hover:underline"
                >
                  View Event
                </Link>

                <button
                  onClick={() => handleCancel(ticket._id)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Cancel Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}