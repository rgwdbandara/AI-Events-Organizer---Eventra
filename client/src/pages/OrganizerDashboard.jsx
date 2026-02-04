import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH MY EVENTS ================= */
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get("/events/my-events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load organizer events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  /* ================= DELETE EVENT ================= */
  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove from UI
      setEvents((prev) =>
        prev.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1120] text-gray-400">
        Loading organizer dashboard...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">
            Organizer Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your events and registrations
          </p>
        </div>

        <Link
          to="/events/create"
          className="px-5 py-2 mt-4 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700"
        >
          + Create Event
        </Link>
      </div>

      {/* ================= EVENTS ================= */}
      {events.length === 0 ? (
        <div className="p-10 text-center text-gray-400 border border-white/10 rounded-xl">
          You haven’t created any events yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-[#111827] p-6 rounded-xl border border-white/10 hover:border-indigo-500 transition"
            >
              {/* TITLE */}
              <h2 className="text-xl font-semibold text-blue-400">
                {event.title}
              </h2>

              {/* META */}
              <div className="mt-2 space-y-1 text-sm text-gray-400">
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>
                <p>
                  🪑 Capacity:{" "}
                  <span className="text-white">
                    {event.capacity || "Unlimited"}
                  </span>
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-2 mt-5">
                <Link
                  to={`/organizer/events/${event._id}`}
                  className="flex-1 px-3 py-2 text-xs text-center bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  View Registrations
                </Link>

                <Link
                  to={`/events/${event._id}`}
                  className="px-3 py-2 text-xs bg-gray-600 rounded hover:bg-gray-700"
                >
                  View
                </Link>

                <Link
                  to={`/events/${event._id}/edit`}
                  className="px-3 py-2 text-xs bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-3 py-2 text-xs bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
