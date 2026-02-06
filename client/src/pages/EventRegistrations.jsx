import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import QrScanModal from "../components/QrScanModal";

export default function EventRegistrations() {
  const { eventId } = useParams();

  const [registrations, setRegistrations] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("all");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regRes, eventRes] = await Promise.all([
          api.get(`/registrations/event/${eventId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          api.get(`/events/${eventId}`),
        ]);

        setRegistrations(regRes.data);
        setEvent(eventRes.data);
      } catch (err) {
        console.error("Failed to load registrations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const isEventEnded = (event) => {
    const eventDateTime = new Date(`${event.date}T${event.time}`);
    return new Date() > eventDateTime;
  };

  const handleScan = async (ticketId) => {
    try {
      await api.post(
        `/registrations/verify/${ticketId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRegistrations((prev) =>
        prev.map((r) =>
          r._id === ticketId ? { ...r, checkedIn: true } : r
        )
      );

      setShowScanner(false);
      alert("Check-in successful ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid ticket");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-gray-400 bg-[#0b1120] min-h-screen">
        Loading registrations...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-10 text-red-400 bg-[#0b1120] min-h-screen">
        Event not found
      </div>
    );
  }

  const total = registrations.length;
  const checkedIn = registrations.filter((r) => r.checkedIn).length;
  const pending = total - checkedIn;

  const filtered = registrations.filter((r) => {
    if (search === "checked") return r.checkedIn;
    if (search === "pending") return !r.checkedIn;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-10">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="mt-1 text-sm text-gray-400">
            📅 {event.date} • 📍 {event.location}
          </p>
        </div>

        <div>
          <button
            onClick={() => setShowScanner(true)}
            disabled={isEventEnded(event)}
            className={`px-4 py-2 rounded text-sm font-semibold ${
              isEventEnded(event)
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
            }`}
          >
            {isEventEnded(event) ? "Event Ended" : "📷 Scan QR Code to Check-in"}
          </button>
          {isEventEnded(event) && (
            <p className="mt-2 text-xs text-red-400">
              QR scanning is disabled after event end
            </p>
          )}
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-6 mb-10 md:grid-cols-4">
        <StatCard label="Capacity" value={`${total}/${event.capacity || "∞"}`} />
        <StatCard label="Checked In" value={checkedIn} />
        <StatCard label="Revenue" value="₹0" />
        <StatCard label="Time Left" value="0h" />
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex items-center gap-4 mb-6">
        <FilterButton
          active={search === "all"}
          onClick={() => setSearch("all")}
        >
          All ({total})
        </FilterButton>
        <FilterButton
          active={search === "checked"}
          onClick={() => setSearch("checked")}
        >
          Checked In ({checkedIn})
        </FilterButton>
        <FilterButton
          active={search === "pending"}
          onClick={() => setSearch("pending")}
        >
          Pending ({pending})
        </FilterButton>
      </div>

      {/* ================= LIST ================= */}
      {filtered.length === 0 ? (
        <p className="text-gray-400">No attendees found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <div
              key={r._id}
              className="flex items-center justify-between p-4 bg-[#111827] rounded-lg border border-white/10"
            >
              {/* USER INFO */}
              <div>
                <p className="font-semibold">👤 {r.user.name}</p>
                <p className="text-sm text-gray-400">📧 {r.user.email}</p>
                <p className="text-xs text-gray-500">
                  Registered on {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* STATUS BADGE */}
              {r.checkedIn ? (
                <span className="px-3 py-1 text-xs font-semibold text-green-400 rounded-full bg-green-400/10">
                  ✔ Checked-in
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-semibold text-yellow-400 rounded-full bg-yellow-400/10">
                  ⏳ Pending
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {showScanner && (
        <QrScanModal
          onClose={() => setShowScanner(false)}
          onScan={handleScan}
        />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ label, value }) {
  return (
    <div className="p-5 bg-[#111827] rounded-xl border border-white/10">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-lg border ${
        active
          ? "bg-indigo-600 border-indigo-600"
          : "border-white/10 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}
