import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // get logged user from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // fetch event
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

  // delete event
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event deleted successfully");
      navigate("/events");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  console.log("Logged user:", user);
console.log("Event organizer:", event.organizer);


  const isOwner =
  user &&
  (event.organizer?._id === user._id ||
   event.organizer === user._id);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white p-6">
      <div className="max-w-3xl p-6 mx-auto shadow-lg bg-white/10 backdrop-blur-lg rounded-xl">

        <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>

        <p className="mb-4 text-gray-300">{event.description}</p>

        <div className="space-y-2 text-sm">
          <p>📅 <span className="text-gray-300">{event.date}</span></p>
          <p>⏰ <span className="text-gray-300">{event.time}</span></p>
          <p>📍 <span className="text-gray-300">{event.location}</span></p>
          <p>
            🏷️ Category:{" "}
            <span className="text-blue-400">{event.category}</span>
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            to="/events"
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Back
          </Link>

          {isOwner && (
            <>
              <Link
                to={`/events/edit/${event._id}`}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
