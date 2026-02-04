import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function OrganizerRegistrations() {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await api.get(
          `/registrations/event/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setRegistrations(res.data);
      } catch (err) {
        console.error("Failed to load registrations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [eventId]);

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Registered Users
      </h1>

      {registrations.length === 0 ? (
        <p className="text-gray-400">
          No registrations yet.
        </p>
      ) : (
        <div className="space-y-4">
          {registrations.map((r) => (
            <div
              key={r._id}
              className="p-4 bg-[#111827] rounded-lg border border-white/10"
            >
              <p className="font-semibold">
                👤 {r.user.name}
              </p>
              <p className="text-sm text-gray-400">
                📧 {r.user.email}
              </p>
              <p className="text-xs text-gray-500">
                Registered on {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
