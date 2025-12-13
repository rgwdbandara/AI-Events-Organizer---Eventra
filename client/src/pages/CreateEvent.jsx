import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/events/create",
        { title, description, date, time, location, category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/");
    } catch (err) {
      setError("Failed to create event");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-gray-800 rounded-lg"
      >
        <h2 className="mb-6 text-3xl font-bold">Create Event</h2>

        {error && <p className="mb-3 text-red-400">{error}</p>}

        <input
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="time"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <input
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          className="w-full p-3 mb-6 bg-gray-700 rounded"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button className="w-full p-3 font-semibold bg-green-500 rounded hover:bg-green-600">
          Create Event
        </button>
      </form>
    </div>
  );
}
