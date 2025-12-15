import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExploreCarousel from "../components/ExploreCarousel";


const API_URL = "http://localhost:5000/api/events";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f2ee] px-6 py-12">
      <div className="grid items-center max-w-6xl gap-10 mx-auto md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="rounded-[40px] overflow-hidden shadow-lg">
          <img
            src={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1515165562835-c3b8c62c51b1"
            }
            alt={event.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          <div>
            <p className="text-sm tracking-widest text-gray-500 uppercase">
              {event.category}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              {event.title}
            </h1>
          </div>

          <p className="leading-relaxed text-gray-700">
            {event.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>📅 <span className="font-medium">{event.date}</span></p>
            <p>⏰ <span className="font-medium">{event.time}</span></p>
            <p>📍 <span className="font-medium">{event.location}</span></p>
            <p>🪑 <span className="font-medium">
              Capacity: {event.capacity || "Unlimited"}
            </span></p>
          </div>

          <button className="px-8 py-3 text-white transition bg-black rounded-full hover:bg-gray-800">
            Book Now
          </button>
        </div>
      </div>

      {/* 🔁 Explore More Events */}
      <ExploreCarousel currentEventId={event._id} />
    </div>
  );
}
