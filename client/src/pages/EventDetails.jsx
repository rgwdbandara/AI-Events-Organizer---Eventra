import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export default function EventDetails() {
  const { id } = useParams(); // 🔑 event id from URL
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registeredCount, setRegisteredCount] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setEvent(res.data);

        const countRes = await axios.get(
          `http://localhost:5000/api/registrations/count/${id}`
        );
        setRegisteredCount(countRes.data.count);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const token = localStorage.getItem("token");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/registrations/${event._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegisteredCount((prev) => prev + 1);
      alert(res.data?.message || "Seat booked successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-400">Loading event...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!event) {
    return <p className="p-6 text-gray-400">Event not found</p>;
  }

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <div className="max-w-3xl p-6 mx-auto bg-gray-800 rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-blue-400">
          {event.title}
        </h1>

        <p className="mb-4 text-gray-300">{event.description}</p>

        <div className="space-y-2 text-gray-400">
          <p>📅 Date: {event.date}</p>
          <p>⏰ Time: {event.time}</p>
          <p>📍 Location: {event.location}</p>
          <p>🏷 Category: {event.category}</p>
          <p>
            👤 Organizer:{" "}
            <span className="text-gray-300">
              {event.organizer?.name}
            </span>
          </p>
          <p>✅ Registered: {registeredCount} people</p>
          <p className="mt-2 text-gray-400">
            Seats booked: {registeredCount} / {event.capacity}
          </p>

          {registeredCount >= event.capacity && (
            <p className="mt-2 font-semibold text-red-400">
              All seats are booked
            </p>
          )}
        </div>

        {token && (
          <button
            disabled={registeredCount >= event.capacity}
            onClick={handleRegister}
            className={`mt-6 px-4 py-2 rounded ${
              registeredCount >= event.capacity
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Book Seat
          </button>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Back
          </button>

          <Link
            to="/events"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
