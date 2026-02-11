import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function DiscoverCarousel() {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);


  // 🔹 Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load discover events", err);
      }
    };

    fetchEvents();
  }, []);

  // 🔹 Auto rotate
  useEffect(() => {
    if (!events.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [events]);

  if (!events.length) return null;

  const event = events[current];

  // 🔥 High-quality trending fallback images
  const fallbackImages = {
    Technology:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    Business:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    Workshop:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    Education:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    Music:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
    Sports:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1600&q=80",
  };

  const backgroundImage =
    event.imageUrl ||
    fallbackImages[event.category] ||
    "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="mb-14">
      <div
        className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 🔥 Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

        {/* 🔹 Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-10">
          <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-semibold text-white bg-red-600 rounded-full w-fit">
            🔥 Trending Event
          </span>

          <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {event.title}
          </h2>

          <p className="max-w-2xl mt-4 text-gray-200 line-clamp-2">
            {event.description}
          </p>

          <p className="mt-3 text-sm text-gray-300">
            👤 Event by{" "}
            <span className="font-semibold">
              {event.organizer?.name || "Unknown"}
            </span>
          </p>

          <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-300">
            <span>📅 {event.date}</span>
            <span>📍 {event.location}</span>
            <span>🪑 {event.capacity} seats</span>
          </div>

          <Link
            to={`/events/${event._id}`}
            className="inline-block mt-6 w-fit"
          >
            <span className="px-5 py-2 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200">
              View Event →
            </span>
          </Link>
        </div>

        
      </div>

      
    </section>
  );
}
