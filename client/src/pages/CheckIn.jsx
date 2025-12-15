import { useState } from "react";
import axios from "axios";

export default function CheckIn() {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5000/api/registrations/verify/${ticketId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult({
        success: true,
        message: res.data.message,
        ticket: res.data.ticket,
      });
    } catch (error) {
      setResult({
        success: false,
        message:
          error.response?.data?.message || "Verification failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Event Check-in
        </h1>

        <input
          type="text"
          placeholder="Paste Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded"
        />

        <button
          onClick={handleVerify}
          className="w-full p-3 bg-green-600 rounded hover:bg-green-700"
        >
          Verify & Check-in
        </button>

        {result && (
          <div
            className={`mt-4 p-3 rounded text-center ${
              result.success
                ? "bg-green-700"
                : "bg-red-700"
            }`}
          >
            <p>{result.message}</p>

            {result.success && (
              <p className="text-sm mt-2">
                Event: {result.ticket.event.title}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
