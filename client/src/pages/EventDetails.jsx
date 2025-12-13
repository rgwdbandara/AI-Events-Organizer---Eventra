import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(console.error);
  }, [id]);

  if (!event) {
    return <p className="p-6 text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-4 text-4xl font-bold">{event.title}</h1>
      <p className="mb-4 text-gray-300">{event.description}</p>

      <div className="space-y-1 text-gray-400">
        <p>📅 {event.date}</p>
        <p>⏰ {event.time}</p>
        <p>📍 {event.location}</p>
        <p>🏷 {event.category}</p>
      </div>
    </div>
  );
}
