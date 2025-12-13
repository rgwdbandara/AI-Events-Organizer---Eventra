import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError("Failed to load event"));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch (err) {
      setError("You are not authorized to delete this event");
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen p-6 text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  // Check owner
  const isOwner =
    localStorage.getItem("token") &&
    event.organizer &&
    event.organizer._id;

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-4 text-4xl font-bold">{event.title}</h1>
      <p className="mb-4 text-gray-300">{event.description}</p>

      <div className="mb-6 space-y-1 text-gray-400">
        <p>📅 {event.date}</p>
        <p>⏰ {event.time}</p>
        <p>📍 {event.location}</p>
        <p>🏷 {event.category}</p>
      </div>

      {error && <p className="mb-4 text-red-400">{error}</p>}

      {isOwner && (
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Delete Event
        </button>
      )}
    </div>
  );
}
