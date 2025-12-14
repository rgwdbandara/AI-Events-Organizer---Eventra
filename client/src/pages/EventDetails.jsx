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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p className="text-gray-400 p-6">Loading event...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-6">{error}</p>;
  }

  if (!event) {
    return <p className="text-gray-400 p-6">Event not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
          {event.title}
        </h1>

        <p className="text-gray-300 mb-4">{event.description}</p>

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
        </div>

        <div className="mt-6 flex gap-4">
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
