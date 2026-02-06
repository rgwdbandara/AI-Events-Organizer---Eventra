import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/api";
import ExploreCarousel from "../components/ExploreCarousel";
import TicketModal from "../components/TicketModal";

const API_URL = "http://localhost:5000/api/events";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Failed to load event", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const res = await api.post(
        `/registrations/${event._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRegisteredTicket(res.data);
      setShowRegister(false);
      setShowSuccess(true);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1120] text-gray-400">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1120] text-red-500">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* IMAGE HEADER */}
      {event.imageUrl && (
        <div className="relative w-full h-[420px]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-black/30 to-transparent" />
          <div className="absolute bottom-10 left-10">
            <span className="px-3 py-1 bg-purple-600 rounded">
              {event.category}
            </span>
            <h1 className="mt-2 text-4xl font-bold">{event.title}</h1>
            <p className="text-gray-300">
              📅 {event.date} • ⏰ {event.time} • 📍 {event.location}
            </p>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="grid max-w-6xl grid-cols-1 gap-8 p-10 mx-auto lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="bg-[#111827] p-6 rounded-xl">
            <h2 className="mb-3 text-2xl font-bold">About This Event</h2>
            <p className="text-gray-300">{event.description}</p>
          </div>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl h-fit sticky top-10">
          <h3 className="mb-2 text-lg font-semibold">Price</h3>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-sm font-semibold text-green-400 rounded-full bg-green-400/10">
              Free Event
            </span>

            <span className="px-3 py-1 text-xs text-gray-400 border border-gray-600 rounded-full">
              Paid events coming soon
            </span>
          </div>

          <button
            onClick={() => setShowRegister(true)}
            className="w-full py-3 font-semibold text-black bg-white rounded-lg"
          >
            Register for Event
          </button>
        </div>
      </div>

      <ExploreCarousel />

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#111827] p-6 rounded-lg w-full max-w-md">
            <h2 className="mb-4 text-lg font-semibold">
              Register for {event.title}
            </h2>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRegister(false)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className="px-4 py-2 font-semibold text-black bg-white rounded"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#111827] p-6 rounded-lg w-full max-w-md text-center">
            <h2 className="mb-2 text-xl font-bold">You're All Set 🎉</h2>
            <p className="mb-4 text-gray-400">
              Your ticket has been successfully booked.
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/my-tickets");
              }}
              className="w-full py-2 font-semibold text-black bg-white rounded"
            >
              View My Ticket
            </button>
          </div>
        </div>
      )}

      <TicketModal
        open={!!registeredTicket}
        ticket={registeredTicket}
        onClose={() => setRegisteredTicket(null)}
      />
    </div>
  );
}
